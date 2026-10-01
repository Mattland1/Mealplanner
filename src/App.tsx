import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArchiveRestore, CalendarDays, Check, ChefHat, ChevronRight, Circle, ClipboardCheck,
  Download, ExternalLink, FileText, Image, Inbox, Lightbulb, Link2, LockKeyhole,
  LogOut, Minus, Paperclip, Pencil, Plus, Search, ShoppingBasket, Sparkles, Star, Trash2, Upload, WifiOff, X
} from 'lucide-react'
import { categories, timeCategoryFor, type AppState, type Category, type Healthiness, type InboxItem, type InboxKind, type Ingredient, type MealSlot, type Recipe, type RecipeCollection, type ShoppingListItem, type TimeCategory, type Unit } from './domain/model'
import { buildShoppingList, isPantryStaple } from './domain/shoppingList'
import { effectivePlanDayCount, resizePlanDays } from './domain/mealPlan'
import { createId } from './domain/id'
import { exportState, importState, loadState, saveState } from './data/repository'
import { synchronizeState } from './data/sync'
import { getAuthStatus, login, logout } from './data/auth'
import { deleteInboxItem, inboxFileUrl, loadInbox, submitInboxItem, type InboxSubmission } from './data/inbox'

type View = 'plan' | 'shop' | 'recipes' | 'inbox'
const units: Unit[] = ['g', 'kg', 'ml', 'l', 'piece', 'cup', 'tbsp', 'tsp', 'pack']
const healthinessLabels: Record<Healthiness, string> = { healthy: 'Good-dog healthy', balanced: 'Balanced bowl', indulgent: 'Extra treat' }
const timeCategoryLabels: Record<TimeCategory, string> = { fast: 'Quick fetch', medium: 'Nice walk', long: 'Long walk' }

function durationLabel(minutes: number): string {
  if (minutes < 60) return `${minutes} min`
  const hours = Math.floor(minutes / 60)
  const remainder = minutes % 60
  return remainder ? `${hours} hr ${remainder} min` : `${hours} hr`
}

function weekLabel(iso: string) {
  const start = new Date(`${iso}T12:00:00`)
  const end = new Date(start)
  end.setDate(end.getDate() + 6)
  const format = new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' })
  return `${format.format(start)} – ${format.format(end)}`
}

function quantityLabel(item: Pick<Ingredient, 'quantity' | 'unit'>) {
  return `${Math.round(item.quantity * 100) / 100} ${item.unit === 'piece' ? (item.quantity === 1 ? 'pc' : 'pcs') : item.unit}`
}

function App() {
  const [state, setState] = useState<AppState | null>(null)
  const [view, setView] = useState<View>('plan')
  const [query, setQuery] = useState('')
  const [online, setOnline] = useState(navigator.onLine)
  const [saved, setSaved] = useState(true)
  const [syncStatus, setSyncStatus] = useState<'local' | 'syncing' | 'synced'>('local')
  const [authMode, setAuthMode] = useState<'checking' | 'disabled' | 'authenticated' | 'required'>('checking')
  const [recipeOpen, setRecipeOpen] = useState(false)
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null)
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null)
  const [manualOpen, setManualOpen] = useState(false)
  const [resetOpen, setResetOpen] = useState(false)
  const [inboxOpen, setInboxOpen] = useState(false)
  const [inboxItems, setInboxItems] = useState<InboxItem[]>([])
  const [inboxLoading, setInboxLoading] = useState(false)
  const [inboxError, setInboxError] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  const importRef = useRef<HTMLInputElement>(null)
  const stateRef = useRef<AppState | null>(null)
  const remoteFingerprint = useRef<string | null>(null)

  useEffect(() => {
    loadState().then(setState)
    getAuthStatus()
      .then((status) => setAuthMode(!status.enabled ? 'disabled' : status.authenticated ? 'authenticated' : 'required'))
      .catch(() => setAuthMode('disabled'))
  }, [])
  useEffect(() => { stateRef.current = state }, [state])
  useEffect(() => {
    const update = () => setOnline(navigator.onLine)
    window.addEventListener('online', update); window.addEventListener('offline', update)
    return () => { window.removeEventListener('online', update); window.removeEventListener('offline', update) }
  }, [])
  useEffect(() => {
    if (!state) return
    setSaved(false)
    const fingerprint = JSON.stringify(state)
    const handle = window.setTimeout(async () => {
      await saveState(state)
      setSaved(true)
      if (!online || authMode === 'required' || authMode === 'checking') { setSyncStatus('local'); return }
      if (remoteFingerprint.current === fingerprint) {
        remoteFingerprint.current = null
        setSyncStatus('synced')
        return
      }
      setSyncStatus('syncing')
      try {
        const result = await synchronizeState(state)
        if (result.source === 'remote' && JSON.stringify(result.state) !== fingerprint && stateRef.current?.updatedAt === state.updatedAt) {
          remoteFingerprint.current = JSON.stringify(result.state)
          await saveState(result.state)
          setState(result.state)
        }
        setSyncStatus('synced')
      } catch {
        setSyncStatus('local')
      }
    }, 500)
    return () => window.clearTimeout(handle)
  }, [state, online, authMode])
  useEffect(() => {
    if (view !== 'inbox' || !online || authMode === 'required' || authMode === 'checking') return
    let active = true
    setInboxLoading(true)
    setInboxError('')
    loadInbox()
      .then((items) => { if (active) setInboxItems(items) })
      .catch((error) => { if (active) setInboxError(error instanceof Error ? error.message : 'Ginny could not sniff out the inbox.') })
      .finally(() => { if (active) setInboxLoading(false) })
    return () => { active = false }
  }, [view, online, authMode])

  function update(mutator: (current: AppState) => AppState) {
    setState((current) => current ? { ...mutator(current), updatedAt: new Date().toISOString() } : current)
  }

  function announce(message: string) {
    setToast(message)
    window.setTimeout(() => setToast(null), 2400)
  }

  if (!state || authMode === 'checking') return <div className="loading"><div className="brand-mark">G</div><p>Ginny is setting the table…</p></div>
  if (authMode === 'required') return <LoginScreen onSuccess={() => setAuthMode('authenticated')} />

  const selectedIds = new Set(state.plan.map((meal) => meal.recipeId))
  const selectedRecipe = selectedRecipeId ? state.recipes.find((recipe) => recipe.id === selectedRecipeId) ?? null : null
  const plannedRecipes = state.plan.flatMap((meal) => {
    const recipe = state.recipes.find((candidate) => candidate.id === meal.recipeId)
    return recipe ? [{ meal, recipe }] : []
  })
  function toggleRecipe(recipe: Recipe) {
    update((current) => selectedIds.has(recipe.id)
      ? { ...current, plan: current.plan.filter((meal) => meal.recipeId !== recipe.id) }
      : { ...current, plan: [...current.plan, { id: createId(), recipeId: recipe.id, servings: recipe.servings }] })
  }

  function changeServings(id: string, delta: number) {
    update((current) => ({ ...current, plan: current.plan.map((meal) =>
      meal.id === id ? { ...meal, servings: Math.max(1, meal.servings + delta) } : meal
    ) }))
  }

  function assignMeal(id: string, day?: number, slot?: MealSlot) {
    update((current) => ({ ...current, plan: current.plan.map((meal) =>
      meal.id === id ? { ...meal, day, slot: day && slot ? slot : undefined } : meal
    ) }))
  }

  function changePlanDays(delta: number) {
    update((current) => {
      const currentCount = effectivePlanDayCount(current.plan, current.planDayCount)
      return { ...current, ...resizePlanDays(current.plan, currentCount + delta) }
    })
  }

  function generate() {
    update((current) => ({ ...current, shoppingList: buildShoppingList(current.recipes, current.plan, current.shoppingList) }))
    setView('shop')
    announce('Fetch list ready — good work, Ginny!')
  }

  function resetWeek() {
    update((current) => ({ ...current, plan: [], shoppingList: [] }))
    setResetOpen(false)
    announce('Bowls cleared — ready for a fresh week')
  }

  async function restore(file: File | undefined) {
    if (!file) return
    try {
      const imported = await importState(file)
      setState({ ...imported, updatedAt: new Date().toISOString() })
      announce('Backup fetched and restored')
    } catch (error) {
      announce(error instanceof Error ? error.message : 'Ginny could not fetch that backup')
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="wordmark" onClick={() => setView('plan')} aria-label="Go to meal plan">
          <span className="brand-mark small">G</span><span>What’s for Gin-ner?</span>
        </button>
        <div className="status-row">
          {!online && <span className="offline"><WifiOff size={14}/> Off-leash (offline)</span>}
          <span className={`save-status ${saved ? 'saved' : ''}`}>{!saved ? 'Burying changes…' : syncStatus === 'synced' ? 'Fetched at home' : syncStatus === 'syncing' ? 'Fetching updates…' : 'Safely buried on this device'}</span>
          <button className="icon-button desktop-only" title="Fetch a backup" onClick={() => exportState(state)}><Download size={19}/></button>
        </div>
      </header>

      <main>
        {view === 'plan' && (
          <PlanView state={state} plannedRecipes={plannedRecipes} selectedIds={selectedIds} query={query}
            setQuery={setQuery} toggleRecipe={toggleRecipe} changeServings={changeServings} assignMeal={assignMeal}
            changePlanDays={changePlanDays}
            generate={generate} resetWeek={() => setResetOpen(true)} openNewRecipe={() => setRecipeOpen(true)} openRecipe={(recipe) => setSelectedRecipeId(recipe.id)} />
        )}
        {view === 'shop' && (
          <ShopView items={state.shoppingList}
            updateItems={(shoppingList) => update((current) => ({ ...current, shoppingList }))}
            addManual={() => setManualOpen(true)} regenerate={generate} resetWeek={() => setResetOpen(true)} />
        )}
        {view === 'recipes' && (
          <RecipesView recipes={state.recipes} openNewRecipe={() => setRecipeOpen(true)} edit={setEditingRecipe}
            remove={(id) => update((current) => ({ ...current,
              recipes: current.recipes.filter((recipe) => recipe.id !== id),
              plan: current.plan.filter((meal) => meal.recipeId !== id)
            }))} exportData={() => exportState(state)} importData={() => importRef.current?.click()}
            logout={authMode === 'authenticated' ? async () => { await logout(); setAuthMode('required') } : undefined} />
        )}
        {view === 'inbox' && (
          <InboxView items={inboxItems} loading={inboxLoading} error={inboxError} online={online}
            openNew={() => setInboxOpen(true)} remove={async (id) => {
              try {
                await deleteInboxItem(id)
                setInboxItems((current) => current.filter((item) => item.id !== id))
                announce('Treasure dropped from the inbox')
              } catch (error) {
                announce(error instanceof Error ? error.message : 'Ginny would not let go of that inbox item')
              }
            }} />
        )}
      </main>

      <nav className="bottom-nav" aria-label="Main navigation">
        <NavButton active={view === 'plan'} onClick={() => setView('plan')} icon={<CalendarDays/>} label="Gin-ner" />
        <NavButton active={view === 'shop'} onClick={() => setView('shop')} icon={<ShoppingBasket/>} label="Fetch" badge={state.shoppingList.filter((item) => !item.atHome).length || undefined} />
        <NavButton active={view === 'recipes'} onClick={() => setView('recipes')} icon={<ChefHat/>} label="Treats" />
        <NavButton active={view === 'inbox'} onClick={() => setView('inbox')} icon={<Inbox/>} label="Drop box" badge={inboxItems.length || undefined} />
      </nav>

      {recipeOpen && <RecipeDialog close={() => setRecipeOpen(false)} save={(recipe) => {
        update((current) => ({ ...current, recipes: [...current.recipes, recipe] }))
        setRecipeOpen(false); announce('New trick added to the recipe box')
      }} />}
      {editingRecipe && <RecipeDialog recipe={editingRecipe} close={() => setEditingRecipe(null)} save={(recipe) => {
        update((current) => ({ ...current, recipes: current.recipes.map((candidate) => candidate.id === recipe.id ? recipe : candidate) }))
        setEditingRecipe(null); announce('Recipe polished to paw-fection')
      }} />}
      {!editingRecipe && selectedRecipe && <RecipeDetailsDialog recipe={selectedRecipe} planned={selectedIds.has(selectedRecipe.id)} close={() => setSelectedRecipeId(null)} edit={() => {
        setEditingRecipe(selectedRecipe)
      }} togglePlan={() => toggleRecipe(selectedRecipe)} />}
      {manualOpen && <ManualItemDialog close={() => setManualOpen(false)} save={(item) => {
        update((current) => ({ ...current, shoppingList: [...current.shoppingList, item] }))
        setManualOpen(false)
      }} />}
      {resetOpen && <ResetWeekDialog close={() => setResetOpen(false)} reset={resetWeek}
        plannedMeals={state.plan.length} shoppingItems={state.shoppingList.length} />}
      {inboxOpen && <InboxDialog close={() => setInboxOpen(false)} save={async (submission) => {
        const item = await submitInboxItem(submission)
        setInboxItems((current) => [item, ...current])
        setInboxOpen(false)
        announce('Dropped safely in Ginny’s box')
      }} />}
      <input ref={importRef} hidden type="file" accept="application/json" onChange={(event) => restore(event.target.files?.[0])}/>
      {toast && <div className="toast" role="status"><Check size={18}/>{toast}</div>}
    </div>
  )
}

function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [working, setWorking] = useState(false)
  async function submit(event: React.FormEvent) {
    event.preventDefault()
    setWorking(true); setError('')
    try { await login(password); onSuccess() }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'Ginny could not open the doggy door.') }
    finally { setWorking(false) }
  }
  return <main className="login-page"><section className="login-card"><div className="brand-mark">G</div><p className="eyebrow">Welcome to the pack</p><h1>Unleash your<br/><em>weekly menu.</em></h1><p className="login-copy">Enter the household password and Ginny will fetch your recipes, plans, and shopping lists.</p><form onSubmit={submit}><label><span>Household password</span><div className="password-field"><LockKeyhole/><input autoFocus type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Secret woof"/></div></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="primary" disabled={!password || working}>{working ? 'Opening the doggy door…' : 'Let me in'}</button></form><small>Your fetch list stays on this device for off-leash shopping.</small></section></main>
}

function NavButton({ active, onClick, icon, label, badge }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string; badge?: number }) {
  return <button className={active ? 'active' : ''} onClick={onClick}><span className="nav-icon">{icon}{badge && <b>{badge}</b>}</span><span>{label}</span></button>
}

function PlanView({ state, plannedRecipes, selectedIds, query, setQuery, toggleRecipe, changeServings, assignMeal, changePlanDays, generate, resetWeek, openNewRecipe, openRecipe }: {
  state: AppState
  plannedRecipes: { meal: AppState['plan'][number]; recipe: Recipe }[]
  selectedIds: Set<string>
  query: string
  setQuery: (value: string) => void
  toggleRecipe: (recipe: Recipe) => void
  changeServings: (id: string, delta: number) => void
  assignMeal: (id: string, day?: number, slot?: MealSlot) => void
  changePlanDays: (delta: number) => void
  generate: () => void
  resetWeek: () => void
  openNewRecipe: () => void
  openRecipe: (recipe: Recipe) => void
}) {
  const [collection, setCollection] = useState<RecipeCollection>('old-faithful')
  const [healthiness, setHealthiness] = useState<Healthiness | 'all'>('all')
  const [timeCategory, setTimeCategory] = useState<TimeCategory | 'all'>('all')
  const [tag, setTag] = useState('all')
  const faithfulCount = state.recipes.filter((recipe) => (recipe.collection ?? 'old-faithful') === 'old-faithful').length
  const exploreCount = state.recipes.length - faithfulCount
  const collectionRecipes = state.recipes.filter((recipe) => (recipe.collection ?? 'old-faithful') === collection)
  const availableTags = [...new Set(collectionRecipes.flatMap((recipe) => recipe.tags ?? []))].sort()
  const filtersActive = healthiness !== 'all' || timeCategory !== 'all' || tag !== 'all'
  const planDayCount = effectivePlanDayCount(state.plan, state.planDayCount)
  const days = Array.from({ length: planDayCount }, (_, index) => index + 1)
  const extras = plannedRecipes.filter(({ meal }) => !meal.day || !meal.slot)
  const filtered = state.recipes.filter((recipe) =>
    (recipe.collection ?? 'old-faithful') === collection &&
    `${recipe.name} ${recipe.description} ${(recipe.tags ?? []).join(' ')}`.toLowerCase().includes(query.toLowerCase()) &&
    (healthiness === 'all' || (recipe.healthiness ?? 'balanced') === healthiness) &&
    (timeCategory === 'all' || recipe.timeCategory === timeCategory) &&
    (tag === 'all' || recipe.tags?.includes(tag))
  )
  return <>
    <section className="hero">
      <div><p className="eyebrow">Plan the paw-fect week</p><h1>What’s for<br/><em>Gin-ner?</em></h1></div>
      <div className="week-card"><CalendarDays/><div><small>Sniffing out dinners for</small><strong>{weekLabel(state.weekStart)}</strong></div></div>
    </section>

    {plannedRecipes.length > 0 && <section className="section planned-section">
      <div className="section-heading"><div><p className="eyebrow">A little structure, no strict schedule</p><h2>{plannedRecipes.length} {plannedRecipes.length === 1 ? 'meal' : 'meals'} in the bowl</h2><p className="section-note">Assign meals when it helps, or leave them in Extras and decide later.</p></div>
        <div className="heading-actions"><button className="secondary" disabled={planDayCount === 1} onClick={() => changePlanDays(-1)}><Minus size={17}/> Fewer days</button><button className="secondary" onClick={() => changePlanDays(1)}><Plus size={17}/> Add a day</button><button className="secondary danger" onClick={resetWeek}><Trash2 size={17}/> Clear the bowls</button><button className="primary" onClick={generate}>Fetch shopping list <ChevronRight size={18}/></button></div></div>
      <div className="meal-framework">
        <div className="plan-days">
          {days.map((day) => <article className="plan-day" key={day}>
            <header><span>Day {day}</span></header>
            {(['lunch', 'dinner'] as const).map((slot) => {
              const slotMeals = plannedRecipes.filter(({ meal }) => meal.day === day && meal.slot === slot)
              return <section className="meal-slot" key={slot}>
                <div className="slot-heading"><strong>{slot === 'lunch' ? 'Lunch' : 'Dinner'}</strong><small>{slotMeals.length ? `${slotMeals.length} planned` : 'Open'}</small></div>
                {slotMeals.length ? slotMeals.map(({ meal, recipe }) => <PlannedMealCard key={meal.id} meal={meal} recipe={recipe} days={days} assignMeal={assignMeal} changeServings={changeServings} remove={() => toggleRecipe(recipe)} />) : <p className="slot-empty">Nothing assigned — that’s fine.</p>}
              </section>
            })}
          </article>)}
        </div>
        <aside className="extras-pool">
          <div className="extras-heading"><div><p className="eyebrow">Keep it loose</p><h3>Extras &amp; decide later</h3></div><span>{extras.length}</span></div>
          <p>Meals here still count toward the shopping list. Give them a slot only when you want to.</p>
          <div className="extras-list">
            {extras.length ? extras.map(({ meal, recipe }) => <PlannedMealCard key={meal.id} meal={meal} recipe={recipe} days={days} assignMeal={assignMeal} changeServings={changeServings} remove={() => toggleRecipe(recipe)} />) : <div className="extras-empty">Everything has a place for now.</div>}
          </div>
        </aside>
      </div>
    </section>}

    <section className="section recipe-picker">
      <div className="section-heading"><div><p className="eyebrow">Ginny’s recipe stash</p><h2>Pick of the litter</h2></div><button className="text-button" onClick={openNewRecipe}><Plus size={18}/> Teach a new recipe</button></div>
      <div className="recipe-tabs" role="tablist" aria-label="Recipe collections">
        <button role="tab" aria-selected={collection === 'old-faithful'} className={collection === 'old-faithful' ? 'active' : ''} onClick={() => { setCollection('old-faithful'); setTag('all') }}><Star/> <span><strong>Old faithfuls</strong><small>Tested & tail-wagging</small></span><b>{faithfulCount}</b></button>
        <button role="tab" aria-selected={collection === 'explore'} className={collection === 'explore' ? 'active' : ''} onClick={() => { setCollection('explore'); setTag('all') }}><Sparkles/> <span><strong>New tricks</strong><small>Sniff out something new</small></span><b>{exploreCount}</b></button>
      </div>
      <div className="filter-toolbar">
        <label className="search"><Search/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Sniff out a recipe…"/></label>
        <div className="recipe-filters plan-filters">
          <label><span>Healthiness</span><select value={healthiness} onChange={(event) => setHealthiness(event.target.value as Healthiness | 'all')}><option value="all">Every appetite</option>{Object.entries(healthinessLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
          <label><span>Time</span><select value={timeCategory} onChange={(event) => setTimeCategory(event.target.value as TimeCategory | 'all')}><option value="all">Any walk length</option>{Object.entries(timeCategoryLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
          <label><span>Tag</span><select value={tag} onChange={(event) => setTag(event.target.value)}><option value="all">All tags</option>{availableTags.map((value) => <option key={value}>{value}</option>)}</select></label>
          {(filtersActive || query) && <button className="clear-filters" onClick={() => { setHealthiness('all'); setTimeCategory('all'); setTag('all'); setQuery('') }}><X/> Clear the scent</button>}
        </div>
      </div>
      <p className="filter-result" aria-live="polite">Ginny found {filtered.length} of {collectionRecipes.length} recipes</p>
      <div className="recipe-grid">
        {filtered.map((recipe) => <article className={`recipe-card ${selectedIds.has(recipe.id) ? 'selected' : ''}`} key={recipe.id}>
          <button className="recipe-open" onClick={() => openRecipe(recipe)} aria-label={`View ${recipe.name}`}>
            <RecipeVisual recipe={recipe} className="recipe-art"/>
            <span className="recipe-info"><strong>{recipe.name}</strong><span>{recipe.description}</span><small>{recipe.servings} servings · {recipe.ingredients.length} ingredients{recipe.totalTimeMinutes ? ` · ${durationLabel(recipe.totalTimeMinutes)}` : ''}{recipe.nutritionPerServing ? ` · ${recipe.nutritionPerServing.caloriesKcal} kcal` : ''}</small></span>
          </button>
          <button className="select-dot" onClick={() => toggleRecipe(recipe)} aria-label={`${selectedIds.has(recipe.id) ? 'Remove' : 'Add'} ${recipe.name} ${selectedIds.has(recipe.id) ? 'from' : 'to'} this week`}>{selectedIds.has(recipe.id) ? <Check/> : <Plus/>}</button>
        </article>)}
      </div>
      {!filtered.length && <div className="empty-inline">{query || filtersActive ? 'No recipes caught that scent.' : 'Nothing buried in this recipe stash yet.'}</div>}
    </section>
  </>
}

function PlannedMealCard({ meal, recipe, days, assignMeal, changeServings, remove }: {
  meal: AppState['plan'][number]
  recipe: Recipe
  days: number[]
  assignMeal: (id: string, day?: number, slot?: MealSlot) => void
  changeServings: (id: string, delta: number) => void
  remove: () => void
}) {
  const placement = meal.day && meal.slot ? `${meal.day}:${meal.slot}` : 'extra'
  return <article className="planned-card">
    <button className="remove-meal" onClick={remove} aria-label={`Remove ${recipe.name}`}><X size={17}/></button>
    <span className="meal-emoji">{recipe.emoji}</span>
    <div className="meal-copy"><strong>{recipe.name}</strong><span>{recipe.ingredients.length} ingredients</span></div>
    <label className="meal-placement"><span>Place</span><select aria-label={`Place ${recipe.name}`} value={placement} onChange={(event) => {
      if (event.target.value === 'extra') { assignMeal(meal.id); return }
      const [day, slot] = event.target.value.split(':')
      assignMeal(meal.id, Number(day), slot as MealSlot)
    }}><option value="extra">Extras · decide later</option>{days.flatMap((day) => [<option value={`${day}:lunch`} key={`${day}:lunch`}>Day {day} · Lunch</option>, <option value={`${day}:dinner`} key={`${day}:dinner`}>Day {day} · Dinner</option>])}</select></label>
    <div className="stepper"><button onClick={() => changeServings(meal.id, -1)} aria-label="Fewer servings"><Minus/></button><span><b>{meal.servings}</b><small> servings</small></span><button onClick={() => changeServings(meal.id, 1)} aria-label="More servings"><Plus/></button></div>
  </article>
}

function ShopView({ items, updateItems, addManual, regenerate, resetWeek }: {
  items: ShoppingListItem[]; updateItems: (items: ShoppingListItem[]) => void; addManual: () => void; regenerate: () => void; resetWeek: () => void
}) {
  const pantryItems = useMemo(() => items.filter((item) => !item.manual && isPantryStaple(item)), [items])
  const [shopTab, setShopTab] = useState<'home' | 'shop'>(() => pantryItems.length ? 'home' : 'shop')
  const shoppingItems = useMemo(() => items.filter((item) => !item.atHome), [items])
  const checked = shoppingItems.filter((item) => item.checked).length
  const grouped = useMemo(() => categories.map((category) => ({ category, items: shoppingItems.filter((item) => item.category === category) })).filter((group) => group.items.length), [shoppingItems])
  const progress = shoppingItems.length ? Math.round(checked / shoppingItems.length * 100) : 0
  const toggle = (id: string) => updateItems(items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item))
  const toggleAtHome = (id: string) => updateItems(items.map((item) => item.id === id ? { ...item, atHome: !item.atHome, checked: false } : item))
  const atHomeCount = pantryItems.filter((item) => item.atHome).length

  return <section className="shop-page section">
    <div className="shop-heading"><div><p className="eyebrow">Ready to fetch</p><h1>{shopTab === 'home' ? 'Cupboard sniff' : 'The fetch list'}</h1><p>{!items.length ? 'Turn your weekly gin-ners into one tidy fetch list.' : shopTab === 'home' ? 'Let Ginny sniff out what is already in the cupboards.' : `${checked} of ${shoppingItems.length} fetched`}</p></div>
      <div className="heading-actions">{!!items.length && <button className="secondary danger" onClick={resetWeek}><Trash2 size={17}/> Clear the bowls</button>}<button className="secondary" onClick={addManual}><Plus size={18}/> Add a stray item</button></div></div>
    {!!items.length && <div className="shop-tabs" role="tablist" aria-label="Shopping steps">
      <button role="tab" aria-selected={shopTab === 'home'} className={shopTab === 'home' ? 'active' : ''} onClick={() => setShopTab('home')}><ClipboardCheck/><span><strong>1. Sniff the cupboards</strong><small>{atHomeCount} of {pantryItems.length} already in the den</small></span></button>
      <button role="tab" aria-selected={shopTab === 'shop'} className={shopTab === 'shop' ? 'active' : ''} onClick={() => setShopTab('shop')}><ShoppingBasket/><span><strong>2. Fetch list</strong><small>{shoppingItems.filter((item) => !item.checked).length} left to fetch</small></span></button>
    </div>}
    {!!items.length && shopTab === 'shop' && <div className="progress"><span style={{ width: `${progress}%` }}/></div>}
    {!items.length ? <div className="empty-state"><ShoppingBasket/><h2>No treats in the basket</h2><p>Pick a few gin-ners first, then Ginny will round up every ingredient.</p><button className="primary" onClick={regenerate}>Fetch from meal plan</button></div>
      : shopTab === 'home' ? <div className="home-check-layout"><div className="home-check-card">
          <div className="home-check-intro"><ClipboardCheck/><div><strong>Give the cupboards a quick sniff</strong><p>Tick what is already in the den; everything else stays on the fetch list.</p></div></div>
          {pantryItems.length ? pantryItems.map((item) => <div className={`shop-item home-check-item ${item.atHome ? 'at-home' : ''}`} key={item.id}>
            <button className="check-button" onClick={() => toggleAtHome(item.id)} aria-label={`${item.atHome ? 'Add' : 'Remove'} ${item.name} ${item.atHome ? 'to' : 'from'} the shopping list`}>{item.atHome ? <Check/> : <Circle/>}</button>
            <button className="item-main" onClick={() => toggleAtHome(item.id)}><strong>{item.name}</strong><small>{item.atHome ? 'Already in the den' : 'Keep on the fetch list'}</small></button>
            <span className="quantity">{quantityLabel(item)}</span>
          </div>) : <div className="home-check-empty"><Check/><strong>No cupboard staples to sniff this week</strong><p>Everything from the plan is waiting on the fetch list.</p></div>}
          <div className="home-check-footer"><span>{atHomeCount ? `${atHomeCount} ${atHomeCount === 1 ? 'item' : 'items'} already found in the den` : 'Nothing found at home yet'}</span><button className="primary" onClick={() => setShopTab('shop')}>Unleash the fetch list <ChevronRight size={18}/></button></div>
        </div></div>
      : !shoppingItems.length ? <div className="empty-state ready-state"><Check/><h2>Good dog — everything is home</h2><p>Every ingredient is already in the den. Recheck the cupboard sniff if Ginny got overexcited.</p><button className="secondary" onClick={() => setShopTab('home')}>Sniff again</button></div>
      : <div className="shopping-layout"><div className="category-list">{grouped.map((group) => <article className="category-card" key={group.category}>
          <header><h2>{group.category}</h2><span>{group.items.filter((item) => !item.checked).length} left</span></header>
          {group.items.map((item) => <div className={`shop-item ${item.checked ? 'checked' : ''}`} key={item.id}>
            <button className="check-button" onClick={() => toggle(item.id)} aria-label={`Mark ${item.name} ${item.checked ? 'not bought' : 'bought'}`}>{item.checked ? <Check/> : <Circle/>}</button>
            <button className="item-main" onClick={() => toggle(item.id)}><strong>{item.name}</strong><small>{item.manual ? 'A stray item you added' : item.sources.join(', ')}</small></button>
            <span className="quantity">{quantityLabel(item)}</span>
            <button className="delete-item" onClick={() => updateItems(items.filter((candidate) => candidate.id !== item.id))} aria-label={`Delete ${item.name}`}><Trash2/></button>
          </div>)}
        </article>)}</div>
        <aside className="list-summary"><ShoppingBasket/><strong>{progress}% fetched</strong><p>The list stays on this device, even when Ginny wanders off-leash.</p><button className="secondary full" onClick={regenerate}><ArchiveRestore size={17}/> Re-fetch from plan</button></aside>
      </div>}
  </section>
}

function RecipeVisual({ recipe, className, children }: { recipe: Recipe; className: string; children?: React.ReactNode }) {
  const [failed, setFailed] = useState(false)
  return <span className={`${className} ${recipe.imageUrl && !failed ? 'has-image' : ''}`}>
    {recipe.imageUrl && !failed ? <img src={recipe.imageUrl} alt="" loading="lazy" referrerPolicy="no-referrer" onError={() => setFailed(true)}/> : recipe.emoji}
    {children}
  </span>
}

function RecipesView({ recipes, openNewRecipe, edit, remove, exportData, importData, logout: signOut }: { recipes: Recipe[]; openNewRecipe: () => void; edit: (recipe: Recipe) => void; remove: (id: string) => void; exportData: () => void; importData: () => void; logout?: () => void }) {
  const [healthiness, setHealthiness] = useState<Healthiness | 'all'>('all')
  const [timeCategory, setTimeCategory] = useState<TimeCategory | 'all'>('all')
  const [tag, setTag] = useState('all')
  const tags = [...new Set(recipes.flatMap((recipe) => recipe.tags ?? []))].sort()
  const visible = recipes.filter((recipe) =>
    (healthiness === 'all' || recipe.healthiness === healthiness) &&
    (timeCategory === 'all' || recipe.timeCategory === timeCategory) &&
    (tag === 'all' || recipe.tags?.includes(tag))
  )
  return <section className="section library-page">
    <div className="shop-heading"><div><p className="eyebrow">The treat cabinet</p><h1>Ginny’s recipe stash</h1><p>{recipes.length} dishes ready for their walk.</p></div><button className="primary" onClick={openNewRecipe}><Plus size={18}/> Teach a new recipe</button></div>
    <div className="recipe-filters"><label><span>Healthiness</span><select value={healthiness} onChange={(event) => setHealthiness(event.target.value as Healthiness | 'all')}><option value="all">Every appetite</option>{Object.entries(healthinessLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label><label><span>Time</span><select value={timeCategory} onChange={(event) => setTimeCategory(event.target.value as TimeCategory | 'all')}><option value="all">Any walk length</option>{Object.entries(timeCategoryLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label><label><span>Tag</span><select value={tag} onChange={(event) => setTag(event.target.value)}><option value="all">All tags</option>{tags.map((value) => <option key={value}>{value}</option>)}</select></label></div>
    <div className="library-grid">{visible.map((recipe) => <article className="library-card" key={recipe.id}><RecipeVisual recipe={recipe} className="library-art"/><div><h2>{recipe.name}</h2><p>{recipe.description}</p><div className="tag-row"><span className={`health-tag ${recipe.healthiness ?? 'balanced'}`}>{healthinessLabels[recipe.healthiness ?? 'balanced']}</span>{recipe.timeCategory && <span>{timeCategoryLabels[recipe.timeCategory]}</span>}{(recipe.tags ?? []).slice(0, 4).map((value) => <span key={value}>{value}</span>)}</div>{recipe.nutritionPerServing && <div className="nutrition-row"><b>{recipe.nutritionPerServing.caloriesKcal} kcal</b><span>{recipe.nutritionPerServing.proteinG}g protein</span><span>{recipe.nutritionPerServing.carbsG}g carbs</span><span>{recipe.nutritionPerServing.fatG}g fat</span><span>{recipe.nutritionPerServing.sugarG}g sugar</span></div>}<small>{recipe.servings} servings · {recipe.ingredients.length} ingredients{recipe.totalTimeMinutes ? ` · ${durationLabel(recipe.totalTimeMinutes)}` : ''}</small></div><div className="library-actions"><button onClick={() => edit(recipe)} aria-label={`Edit ${recipe.name}`}><Pencil/></button><button className="delete-recipe" onClick={() => remove(recipe.id)} aria-label={`Delete ${recipe.name}`}><Trash2/></button></div></article>)}</div>
    {!visible.length && <div className="empty-inline">Ginny could not catch that recipe scent.</div>}
    <div className="data-card"><div><h2>Keep your recipes on a short leash</h2><p>Fetch a backup before clearing browser data or moving to a new device.</p></div><div><button className="secondary" onClick={importData}><Upload size={17}/> Restore stash</button><button className="secondary" onClick={exportData}><Download size={17}/> Fetch backup</button>{signOut && <button className="secondary" onClick={signOut}><LogOut size={17}/> Leave the pack</button>}</div></div>
  </section>
}

const inboxKindLabels: Record<InboxKind, string> = {
  recipe: 'Recipe', photo: 'Photo', idea: 'Bright idea', other: 'Mysterious treasure'
}

function safeExternalUrl(value: string): string | null {
  if (!value) return null
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : null
  } catch {
    return null
  }
}

function fileSizeLabel(bytes: number | null): string {
  if (bytes === null) return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

function InboxView({ items, loading, error, online, openNew, remove }: {
  items: InboxItem[]
  loading: boolean
  error: string
  online: boolean
  openNew: () => void
  remove: (id: string) => void
}) {
  return <section className="section inbox-page">
    <div className="shop-heading"><div><p className="eyebrow">Drop it, Ginny!</p><h1>Ginny’s drop box</h1><p>Toss recipes, photos, links, and bright ideas here for Ginny to carry home.</p></div><button className="primary" onClick={openNew} disabled={!online}><Plus size={18}/> Toss something in</button></div>
    {!online && <div className="inbox-notice"><WifiOff/><div><strong>Ginny cannot reach the laptop</strong><span>Join the same network and make sure What’s for Gin-ner? is running at home.</span></div></div>}
    {error && <div className="inbox-notice error"><Circle/><div><strong>Drop box out of reach</strong><span>{error}</span></div></div>}
    {loading ? <div className="empty-inline">Sniffing through the drop box…</div> : !items.length ? <div className="empty-state"><Inbox/><h2>No new treasures</h2><p>Toss in a recipe link, food photo, or note from your phone. Ginny will carry it to the home laptop.</p><button className="primary" onClick={openNew} disabled={!online}>Toss in the first treasure</button></div>
      : <div className="inbox-list">{items.map((item) => {
        const externalUrl = safeExternalUrl(item.url)
        const isImage = item.mimeType?.startsWith('image/')
        return <article className="inbox-card" key={item.id}>
          {isImage ? <a className="inbox-preview" href={inboxFileUrl(item.id)} target="_blank" rel="noreferrer"><img src={inboxFileUrl(item.id)} alt=""/></a>
            : <div className={`inbox-type ${item.kind}`}>{item.kind === 'recipe' ? <FileText/> : item.kind === 'photo' ? <Image/> : item.kind === 'idea' ? <Lightbulb/> : <Inbox/>}</div>}
          <div className="inbox-copy"><div className="inbox-meta"><span>{inboxKindLabels[item.kind]}</span><time>{new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(item.createdAt))}</time></div>
            <h2>{item.title || item.fileName || 'Nameless treasure'}</h2>
            {item.note && <p>{item.note}</p>}
            <div className="inbox-actions">{externalUrl && <a href={externalUrl} target="_blank" rel="noreferrer"><Link2/> Follow the scent <ExternalLink/></a>}{item.fileName && <a href={inboxFileUrl(item.id)} target="_blank" rel="noreferrer"><Paperclip/> {item.fileName} <small>{fileSizeLabel(item.size)}</small></a>}</div>
          </div>
          <button className="delete-item" onClick={() => remove(item.id)} aria-label={`Delete ${item.title || item.fileName || 'inbox item'}`}><Trash2/></button>
        </article>
      })}</div>}
  </section>
}

function InboxDialog({ close, save }: { close: () => void; save: (submission: InboxSubmission) => Promise<void> }) {
  const [kind, setKind] = useState<InboxKind>('recipe')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [note, setNote] = useState('')
  const [file, setFile] = useState<File>()
  const [working, setWorking] = useState(false)
  const [error, setError] = useState('')

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    if (file && file.size > 15 * 1024 * 1024) { setError('That treasure is too big to carry. Choose a file under 15 MB.'); return }
    setWorking(true); setError('')
    try { await save({ kind, title: title.trim(), url: url.trim(), note: note.trim(), file }) }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'Ginny dropped that item on the way home.') }
    finally { setWorking(false) }
  }

  return <DialogFrame title="Drop something in Ginny’s box" close={close}><form onSubmit={submit}>
    <div className="form-grid"><label><span>Type</span><select value={kind} onChange={(event) => setKind(event.target.value as InboxKind)}><option value="recipe">Recipe</option><option value="photo">Photo</option><option value="idea">Bright idea</option><option value="other">Mysterious treasure</option></select></label><label className="grow"><span>Title</span><input autoFocus value={title} onChange={(event) => setTitle(event.target.value)} placeholder="What did Ginny find?" maxLength={160}/></label></div>
    <label><span>Link</span><input type="url" inputMode="url" value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://…" maxLength={2000}/></label>
    <label><span>Note or recipe text</span><textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Paste a recipe, describe the treasure, or leave Ginny a bright idea…" maxLength={10000}/></label>
    <label className="file-picker"><span>Photo or file</span><input type="file" accept="image/*,.pdf,.txt,.md" onChange={(event) => setFile(event.target.files?.[0])}/><small>Ginny can carry up to 15 MB</small></label>
    {error && <p className="form-error" role="alert">{error}</p>}
    <footer><button type="button" className="secondary" onClick={close}>Leave it</button><button className="primary" disabled={working || (!title.trim() && !url.trim() && !note.trim() && !file)}>{working ? 'Carrying it home…' : 'Drop it in the box'}</button></footer>
  </form></DialogFrame>
}

function ResetWeekDialog({ close, reset, plannedMeals, shoppingItems }: {
  close: () => void
  reset: () => void
  plannedMeals: number
  shoppingItems: number
}) {
  return <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && close()}>
    <section className="dialog confirm-dialog" role="alertdialog" aria-modal="true" aria-labelledby="reset-week-title" aria-describedby="reset-week-description">
      <header><div><p className="eyebrow">Wipe the slate clean</p><h2 id="reset-week-title">Clear the bowls?</h2></div><button className="icon-button" onClick={close} aria-label="Close"><X/></button></header>
      <p className="dialog-copy" id="reset-week-description">Ginny will clear {plannedMeals} planned {plannedMeals === 1 ? 'meal' : 'meals'} and {shoppingItems} fetch-list {shoppingItems === 1 ? 'item' : 'items'}. The recipe stash stays safely buried.</p>
      <footer><button className="secondary" onClick={close}>Keep this week</button><button className="primary danger-action" onClick={reset}><Trash2 size={17}/> Clear the bowls</button></footer>
    </section>
  </div>
}

function DialogFrame({ title, close, children }: { title: string; close: () => void; children: React.ReactNode }) {
  return <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && close()}><section className="dialog" role="dialog" aria-modal="true" aria-label={title}><header><div><p className="eyebrow">Good things incoming</p><h2>{title}</h2></div><button className="icon-button" onClick={close} aria-label="Close"><X/></button></header>{children}</section></div>
}

function RecipeDetailsDialog({ recipe, planned, close, edit, togglePlan }: { recipe: Recipe; planned: boolean; close: () => void; edit: () => void; togglePlan: () => void }) {
  const source = safeExternalUrl(recipe.sourceUrl ?? '')
  const requiredIngredients = recipe.ingredients.filter((item) => !item.optional)
  const optionalIngredients = recipe.ingredients.filter((item) => item.optional)
  return <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && close()}>
    <article className="dialog recipe-details" role="dialog" aria-modal="true" aria-label={recipe.name}>
      <header className="recipe-details-header">
        <div className="recipe-details-title"><RecipeVisual recipe={recipe} className="details-art"/><div><p className="eyebrow">{(recipe.collection ?? 'old-faithful') === 'old-faithful' ? 'Old faithful' : 'New trick'}</p><h2>{recipe.name}</h2><p>{recipe.description}</p></div></div>
        <button className="icon-button" onClick={close} aria-label="Close recipe"><X/></button>
      </header>
      <div className="recipe-facts">
        <span><strong>{recipe.servings}</strong> servings</span><span><strong>{recipe.ingredients.length}</strong> ingredients</span>
        <span><strong>{healthinessLabels[recipe.healthiness ?? 'balanced']}</strong></span>
        {recipe.totalTimeMinutes && <span><strong>{durationLabel(recipe.totalTimeMinutes)}</strong> · {timeCategoryLabels[recipe.timeCategory ?? timeCategoryFor(recipe.totalTimeMinutes)]}</span>}
        {recipe.nutritionPerServing && <span><strong>{recipe.nutritionPerServing.caloriesKcal}</strong> kcal / serving</span>}
      </div>
      {(recipe.tags?.length ?? 0) > 0 && <div className="details-tags">{recipe.tags?.map((tag) => <span key={tag}>{tag}</span>)}</div>}
      <div className="recipe-details-body">
        <section><p className="eyebrow">The good stuff</p><h3>Ingredients</h3><ul className="details-ingredients">{requiredIngredients.map((item) => <li key={item.id}><span>{item.name}</span><strong>{quantityLabel(item)}</strong></li>)}</ul>{optionalIngredients.length > 0 && <><h4 className="optional-heading">Bonus treats <small>not added to the fetch list</small></h4><ul className="details-ingredients optional-ingredients">{optionalIngredients.map((item) => <li key={item.id}><span>{item.name}</span><strong>{quantityLabel(item)}</strong></li>)}</ul></>}</section>
        <section><p className="eyebrow">How the trick is done</p><h3>Instructions</h3>{recipe.instructions?.length ? <ol className="details-steps">{recipe.instructions.map((step, index) => <li key={index}><span>{index + 1}</span><p>{step}</p></li>)}</ol> : <p className="details-empty">Ginny has not learned the steps for this one yet.</p>}{source && <a className="source-link" href={source} target="_blank" rel="noreferrer"><ExternalLink/> Follow the original scent</a>}</section>
      </div>
      {recipe.nutritionPerServing && <section className="details-nutrition" aria-label="Estimated nutrition per serving"><p className="eyebrow">Estimated per serving</p><div><span><strong>{recipe.nutritionPerServing.proteinG}g</strong> protein</span><span><strong>{recipe.nutritionPerServing.carbsG}g</strong> carbs</span><span><strong>{recipe.nutritionPerServing.fatG}g</strong> fat</span><span><strong>{recipe.nutritionPerServing.sugarG}g</strong> sugar</span></div></section>}
      <footer><button className="secondary" onClick={edit}><Pencil size={17}/> Tweak recipe</button><button className={planned ? 'secondary' : 'primary'} onClick={togglePlan}>{planned ? <><Check size={18}/> In this week’s bowl</> : <><Plus size={18}/> Add to this week</>}</button></footer>
    </article>
  </div>
}

function RecipeDialog({ recipe, close, save }: { recipe?: Recipe; close: () => void; save: (recipe: Recipe) => void }) {
  const [name, setName] = useState(recipe?.name ?? '')
  const [emoji, setEmoji] = useState(recipe?.emoji ?? '🍲')
  const [description, setDescription] = useState(recipe?.description ?? '')
  const [servings, setServings] = useState(recipe?.servings ?? 4)
  const [collection, setCollection] = useState<RecipeCollection>(recipe?.collection ?? 'old-faithful')
  const [healthiness, setHealthiness] = useState<Healthiness>(recipe?.healthiness ?? 'balanced')
  const [totalTimeMinutes, setTotalTimeMinutes] = useState(recipe?.totalTimeMinutes ?? 30)
  const [tags, setTags] = useState((recipe?.tags ?? []).join(', '))
  const [sourceUrl, setSourceUrl] = useState(recipe?.sourceUrl ?? '')
  const [imageUrl, setImageUrl] = useState(recipe?.imageUrl ?? '')
  const [instructions, setInstructions] = useState((recipe?.instructions ?? []).join('\n'))
  const [nutrition, setNutrition] = useState({ caloriesKcal: recipe?.nutritionPerServing?.caloriesKcal ?? 0, proteinG: recipe?.nutritionPerServing?.proteinG ?? 0, carbsG: recipe?.nutritionPerServing?.carbsG ?? 0, fatG: recipe?.nutritionPerServing?.fatG ?? 0, sugarG: recipe?.nutritionPerServing?.sugarG ?? 0 })
  const [ingredients, setIngredients] = useState<Ingredient[]>(recipe?.ingredients ?? [])
  const [draft, setDraft] = useState({ name: '', quantity: 1, unit: 'piece' as Unit, category: 'Vegetables' as Category, optional: false })
  function addIngredient() {
    if (!draft.name.trim()) return
    setIngredients((current) => [...current, { ...draft, name: draft.name.trim(), id: createId() }])
    setDraft({ ...draft, name: '', quantity: 1 })
  }
  return <DialogFrame title={recipe ? 'Polish this trick' : 'Teach Ginny a new recipe'} close={close}><div className="form-grid"><label className="emoji-field"><span>Dish badge</span><input value={emoji} maxLength={4} onChange={(e) => setEmoji(e.target.value)}/></label><label className="grow"><span>Recipe name</span><input autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="Roasted tomato orzo"/></label></div>
    <label><span>Why tails will wag</span><input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="A short note about the dish"/></label>
    <div className="form-grid"><label className="grow"><span>Recipe stash</span><select value={collection} onChange={(e) => setCollection(e.target.value as RecipeCollection)}><option value="old-faithful">Old faithful — tested & tail-wagging</option><option value="explore">New trick — still to try</option></select></label><label><span>Base servings</span><input type="number" min="1" value={servings} onChange={(e) => setServings(Math.max(1, Number(e.target.value)))}/></label></div>
    <div className="form-grid"><label className="grow"><span>Total kitchen walk</span><div className="number-with-unit"><input type="number" min="1" value={totalTimeMinutes} onChange={(event) => setTotalTimeMinutes(Math.max(1, Number(event.target.value)))}/><small>minutes</small></div></label><label><span>Walk length</span><input value={timeCategoryLabels[timeCategoryFor(totalTimeMinutes)]} readOnly/></label></div>
    <div className="form-grid"><label className="grow"><span>Tags (comma-separated)</span><input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="vegetarian, mexican, quick"/></label><label><span>Healthiness</span><select value={healthiness} onChange={(e) => setHealthiness(e.target.value as Healthiness)}>{Object.entries(healthinessLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label></div>
    <div className="nutrition-builder"><span className="field-title">Estimated nutrition per serving</span><div className="nutrition-inputs">{([['caloriesKcal', 'Calories', 'kcal'], ['proteinG', 'Protein', 'g'], ['carbsG', 'Carbs', 'g'], ['fatG', 'Fat', 'g'], ['sugarG', 'Sugar', 'g']] as const).map(([key, label, unit]) => <label key={key}><span>{label}</span><div><input type="number" min="0" step="0.1" value={nutrition[key]} onChange={(event) => setNutrition({ ...nutrition, [key]: Math.max(0, Number(event.target.value)) })}/><small>{unit}</small></div></label>)}</div></div>
    <div className="ingredient-builder"><span className="field-title">What goes in the bowl</span><div className="ingredient-row"><input className="ingredient-name" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="Ingredient"/><input type="number" min="0.01" step="0.25" value={draft.quantity} onChange={(e) => setDraft({ ...draft, quantity: Number(e.target.value) })}/><select value={draft.unit} onChange={(e) => setDraft({ ...draft, unit: e.target.value as Unit })}>{units.map((unit) => <option key={unit}>{unit}</option>)}</select><select value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value as Category })}>{categories.map((category) => <option key={category}>{category}</option>)}</select><label className="optional-toggle"><input type="checkbox" checked={draft.optional} onChange={(e) => setDraft({ ...draft, optional: e.target.checked })}/><span>Bonus treat</span></label><button className="icon-button add-line" onClick={addIngredient} aria-label="Add ingredient"><Plus/></button></div>
      <div className="ingredient-chips">{ingredients.map((item) => <button className={item.optional ? 'optional' : ''} key={item.id} onClick={() => setIngredients(ingredients.filter((candidate) => candidate.id !== item.id))}>{item.name} · {quantityLabel(item)}{item.optional ? ' · optional' : ''} <X/></button>)}</div></div>
    <label><span>Teach the trick (one step per line)</span><textarea value={instructions} onChange={(event) => setInstructions(event.target.value)} placeholder="Prepare the vegetables…&#10;Cook until tender…"/></label>
    <div className="form-grid"><label className="grow"><span>Source link</span><input type="url" value={sourceUrl} onChange={(event) => setSourceUrl(event.target.value)} placeholder="https://…"/></label><label className="grow"><span>Meal image link</span><input type="url" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} placeholder="Optional; icon is the fallback"/></label></div>
    <footer><button className="secondary" onClick={close}>Leave it</button><button className="primary" disabled={!name.trim() || !ingredients.length} onClick={() => save({ id: recipe?.id ?? createId(), name: name.trim(), emoji, description: description.trim() || 'A family favourite.', servings, ingredients, collection, healthiness, totalTimeMinutes, timeCategory: timeCategoryFor(totalTimeMinutes), tags: [...new Set(tags.split(',').map((value) => value.trim().toLowerCase()).filter(Boolean))], nutritionPerServing: { ...recipe?.nutritionPerServing, ...nutrition, estimated: true }, instructions: instructions.split(/\r?\n/).map((value) => value.trim()).filter(Boolean), sourceUrl: sourceUrl.trim() || undefined, imageUrl: imageUrl.trim() || undefined })}>{recipe ? 'Save the polish' : 'Add to the stash'}</button></footer>
  </DialogFrame>
}

function ManualItemDialog({ close, save }: { close: () => void; save: (item: ShoppingListItem) => void }) {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [unit, setUnit] = useState<Unit>('piece')
  const [category, setCategory] = useState<Category>('Other')
  return <DialogFrame title="Add a stray item" close={close}><label><span>What should Ginny fetch?</span><input autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="Coffee beans"/></label><div className="form-grid three"><label><span>Quantity</span><input type="number" min="0.01" step="0.25" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}/></label><label><span>Unit</span><select value={unit} onChange={(e) => setUnit(e.target.value as Unit)}>{units.map((candidate) => <option key={candidate}>{candidate}</option>)}</select></label><label><span>Category</span><select value={category} onChange={(e) => setCategory(e.target.value as Category)}>{categories.map((candidate) => <option key={candidate}>{candidate}</option>)}</select></label></div><footer><button className="secondary" onClick={close}>Leave it</button><button className="primary" disabled={!name.trim()} onClick={() => save({ id: createId(), name: name.trim(), quantity, unit, category, checked: false, manual: true, sources: [] })}>Add to fetch list</button></footer></DialogFrame>
}

export default App
