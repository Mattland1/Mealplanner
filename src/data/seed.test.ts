import { describe, expect, it } from 'vitest'
import { timeCategoryFor, type AppState, type Recipe } from '../domain/model'
import { buildShoppingList } from '../domain/shoppingList'
import { CATALOG_VERSION, migrateRecipeCatalog, starterRecipes } from './seed'

describe('recipe catalog metadata', () => {
  it('gives every starter recipe all required information', () => {
    for (const recipe of starterRecipes) {
      expect(recipe.id, recipe.name).toMatch(/^[a-z0-9-]+$/)
      expect(recipe.description.trim(), recipe.name).not.toBe('')
      expect(recipe.servings, recipe.name).toBeGreaterThan(0)
      expect(recipe.ingredients.length, recipe.name).toBeGreaterThan(0)
      expect(recipe.collection, recipe.name).toMatch(/^(old-faithful|garden-harvest|explore)$/)
      expect(recipe.tags?.length, recipe.name).toBeGreaterThan(0)
      expect(['healthy', 'balanced', 'indulgent'], recipe.name).toContain(recipe.healthiness)
      expect(recipe.nutritionPerServing, recipe.name).toMatchObject({ estimated: true })
      expect(recipe.nutritionPerServing?.caloriesKcal, recipe.name).toBeGreaterThan(0)
      expect(recipe.nutritionPerServing?.proteinG, recipe.name).toBeGreaterThan(0)
      expect(recipe.nutritionPerServing?.carbsG, recipe.name).toBeGreaterThan(0)
      expect(recipe.nutritionPerServing?.fatG, recipe.name).toBeGreaterThan(0)
      expect(recipe.nutritionPerServing?.sugarG, recipe.name).toBeGreaterThanOrEqual(0)
      expect(recipe.instructions?.length, recipe.name).toBeGreaterThan(0)
      expect(recipe.totalTimeMinutes, recipe.name).toBeGreaterThan(0)
      expect(recipe.timeCategory, recipe.name).toBe(timeCategoryFor(recipe.totalTimeMinutes!))
    }
  })

  it('uses stable time-category boundaries', () => {
    expect(timeCategoryFor(30)).toBe('fast')
    expect(timeCategoryFor(31)).toBe('medium')
    expect(timeCategoryFor(60)).toBe('medium')
    expect(timeCategoryFor(61)).toBe('long')
  })

  it('keeps the catalog vegetarian and the trusted recipes in Old Faithful', () => {
    expect(starterRecipes.some((recipe) => recipe.ingredients.some((item) => item.category === 'Meat & fish'))).toBe(false)
    expect(starterRecipes.filter((recipe) => recipe.collection === 'old-faithful').map((recipe) => recipe.id)).toEqual([
      'kidney-bean-cheeseburgers', 'brotchen-with-cheese', 'overnight-oats', 'banana-bread',
      'fudgy-brownies', 'andis-potatoes', 'andis-corn', 'chocolate-zucchini-bread',
      'baked-mushroom-brown-rice-risotto', 'vegetarian-caesar-wraps', 'thai-red-curry',
      'sesame-garlic-ramen', 'flaky-biscuits', 'creamy-plant-based-bolognese',
      'air-fryer-chocolate-chip-cookies', 'cowboy-caviar', 'couscous-feta-stuffed-peppers',
      'sweet-potato-avocado-hash', 'vegetarian-burritos', 'vegetable-paella-smoked-tofu',
      'plant-based-mince-tacos', 'like-chicken-guacamole-wraps', 'tomato-risotto',
      'italian-pasta-salad', 'kisir-bulgur-salad', 'classic-zucchini-fritters',
      'creamy-pumpkin-pasta', 'oven-pizza'
    ])
    expect(starterRecipes.filter((recipe) => recipe.collection === 'garden-harvest').map((recipe) => recipe.id)).toEqual([
      'creamy-zucchini-soup', 'coconut-ginger-pumpkin-soup', 'schmorgurken-with-potatoes',
      'mangold-chickpea-curry', 'garden-tomato-salad', 'garden-green-bean-salad'
    ])
  })

  it('scales the Oven Pizza toppings with practical shopping units', () => {
    const recipe = starterRecipes.find((candidate) => candidate.id === 'oven-pizza')!
    const list = buildShoppingList([recipe], [{ id: 'planned-oven-pizza', recipeId: recipe.id, servings: 2 }])

    expect(list.find((item) => item.name === 'Pre-made pizza dough')).toMatchObject({ quantity: 200, unit: 'g' })
    expect(list.find((item) => item.name === 'Hollandaise sauce')).toMatchObject({ quantity: 50, unit: 'g' })
    expect(list.find((item) => item.name === 'Jalapeños')).toMatchObject({ quantity: 0.5, unit: 'piece' })
  })

  it('scales the vegetarian burrito staples for the shopping list', () => {
    const recipe = starterRecipes.find((candidate) => candidate.id === 'vegetarian-burritos')!
    const list = buildShoppingList([recipe], [{ id: 'planned-burritos', recipeId: recipe.id, servings: 2 }])

    expect(list.find((item) => item.name === 'Large flour tortillas')).toMatchObject({ quantity: 2, unit: 'piece' })
    expect(list.find((item) => item.name === 'Long-grain rice')).toMatchObject({ quantity: 80, unit: 'g' })
    expect(list.find((item) => item.name === 'Fake meat')).toMatchObject({ quantity: 125, unit: 'g' })
    expect(list.find((item) => item.name === 'Avocados')).toMatchObject({ quantity: 1, unit: 'piece' })
  })

  it('scales both soup recipes with practical shopping units', () => {
    const zucchiniSoup = starterRecipes.find((candidate) => candidate.id === 'creamy-zucchini-soup')!
    const pumpkinSoup = starterRecipes.find((candidate) => candidate.id === 'coconut-ginger-pumpkin-soup')!
    const list = buildShoppingList(
      [zucchiniSoup, pumpkinSoup],
      [
        { id: 'planned-zucchini-soup', recipeId: zucchiniSoup.id, servings: 2 },
        { id: 'planned-pumpkin-soup', recipeId: pumpkinSoup.id, servings: 4 }
      ]
    )

    expect(list.find((item) => item.name === 'Zucchini')).toMatchObject({ quantity: 2, unit: 'piece' })
    expect(list.find((item) => item.name === 'Hokkaido pumpkin')).toMatchObject({ quantity: 1, unit: 'piece' })
    expect(list.find((item) => item.name === 'Coconut milk (400 ml can)')).toMatchObject({ quantity: 1, unit: 'pack' })
    expect(list.find((item) => item.name === 'Fresh ginger')).toMatchObject({ quantity: 30, unit: 'g' })
  })

  it('keeps smoked tofu optional for Schmorgurken and scales the Mangold curry', () => {
    const schmorgurken = starterRecipes.find((candidate) => candidate.id === 'schmorgurken-with-potatoes')!
    const mangoldCurry = starterRecipes.find((candidate) => candidate.id === 'mangold-chickpea-curry')!
    const list = buildShoppingList(
      [schmorgurken, mangoldCurry],
      [
        { id: 'planned-schmorgurken', recipeId: schmorgurken.id, servings: 4 },
        { id: 'planned-mangold', recipeId: mangoldCurry.id, servings: 1.5 }
      ]
    )

    expect(schmorgurken.ingredients.find((item) => item.name === 'Smoked tofu')).toMatchObject({ optional: true })
    expect(list.find((item) => item.name === 'Smoked tofu')).toMatchObject({ quantity: 250, unit: 'g', optional: true })
    expect(list.find((item) => item.name === 'Mangold')).toMatchObject({ quantity: 250, unit: 'g' })
    expect(list.find((item) => item.name === 'Coconut milk (400 ml can)')).toMatchObject({ quantity: 0.5, unit: 'pack' })
  })

  it('adds garden salads with practical produce quantities and only fresh green beans', () => {
    const tomatoSalad = starterRecipes.find((candidate) => candidate.id === 'garden-tomato-salad')!
    const beanSalad = starterRecipes.find((candidate) => candidate.id === 'garden-green-bean-salad')!
    const list = buildShoppingList(
      [tomatoSalad, beanSalad],
      [
        { id: 'planned-tomato-salad', recipeId: tomatoSalad.id, servings: 2 },
        { id: 'planned-bean-salad', recipeId: beanSalad.id, servings: 2 }
      ]
    )

    expect(list.find((item) => item.name === 'Tomatoes')).toMatchObject({ quantity: 400, unit: 'g' })
    expect(list.find((item) => item.name === 'Fresh green beans')).toMatchObject({ quantity: 400, unit: 'g' })
    expect(beanSalad.ingredients.filter((item) => /bean/i.test(item.name)).map((item) => item.name)).toEqual(['Fresh green beans'])
    expect(beanSalad.ingredients.some((item) => item.category === 'Canned goods')).toBe(false)
  })

  it('uses generous, scalable amounts of garden zucchini and pumpkin', () => {
    const fritters = starterRecipes.find((candidate) => candidate.id === 'classic-zucchini-fritters')!
    const pumpkinPasta = starterRecipes.find((candidate) => candidate.id === 'creamy-pumpkin-pasta')!
    const list = buildShoppingList(
      [fritters, pumpkinPasta],
      [
        { id: 'planned-fritters', recipeId: fritters.id, servings: 2 },
        { id: 'planned-pumpkin-pasta', recipeId: pumpkinPasta.id, servings: 2 }
      ]
    )

    expect(list.find((item) => item.name === 'Zucchini')).toMatchObject({ quantity: 500, unit: 'g' })
    expect(list.find((item) => item.name === 'Pumpkin flesh')).toMatchObject({ quantity: 400, unit: 'g' })
    expect(list.find((item) => item.name === 'Pasta')).toMatchObject({ quantity: 175, unit: 'g' })
  })

  it('marks the Brötchen accompaniments as optional', () => {
    const recipe = starterRecipes.find((candidate) => candidate.id === 'brotchen-with-cheese')
    expect(recipe?.ingredients.filter((item) => !item.optional).map((item) => item.name)).toEqual(['Brötchen', 'Sliced cheese'])
    expect(recipe?.ingredients.filter((item) => item.optional).map((item) => item.name)).toEqual(['Cucumber', 'Tomatoes', 'Grapes'])
  })

  it('keeps mashed potatoes simple and marks creamy extras as optional in the shopping list', () => {
    const recipe = starterRecipes.find((candidate) => candidate.id === 'andis-potatoes')!
    expect(recipe.name).toBe('Mashed potatoes')
    expect(recipe.ingredients.filter((item) => !item.optional).map((item) => item.name)).toEqual(['Potatoes', 'Milk', 'Butter', 'Salt'])
    expect(recipe.ingredients.filter((item) => item.optional).map((item) => item.name)).toEqual(['Cream cheese', 'Sour cream'])

    const list = buildShoppingList([recipe], [{ id: 'planned-mash', recipeId: recipe.id, servings: 2 }])
    expect(list.find((item) => item.name === 'Potatoes')).toMatchObject({ quantity: 450, unit: 'g' })
    expect(list.find((item) => item.name === 'Cream cheese')).toMatchObject({ quantity: 50, unit: 'g', optional: true })
    expect(list.find((item) => item.name === 'Sour cream')).toMatchObject({ quantity: 50, unit: 'g', optional: true })
  })

  it('adds the flexible fruit item from overnight oats to the shopping list', () => {
    const recipe = starterRecipes.find((candidate) => candidate.id === 'overnight-oats')!
    const list = buildShoppingList([recipe], [{ id: 'planned-oats', recipeId: recipe.id, servings: 1 }])

    expect(list.find((item) => item.name === 'Fruit')).toMatchObject({ quantity: 1, unit: 'piece', category: 'Fruit' })
  })

  it('uses the requested convenient ingredients in tacos, soup and falafel pitas', () => {
    const tacos = starterRecipes.find((recipe) => recipe.id === 'tacos')!
    const soup = starterRecipes.find((recipe) => recipe.id === 'soup')!
    const falafelPitas = starterRecipes.find((recipe) => recipe.id === 'falafel-pitas')!

    expect(tacos.ingredients.map((item) => item.name)).toContain('Romaine lettuce')
    expect(tacos.ingredients.map((item) => item.name)).not.toContain('Red cabbage')
    expect(soup.ingredients.map((item) => item.name)).toContain('White beans (400 g can)')
    expect(falafelPitas.ingredients.map((item) => item.name)).toContain('Ready-made falafel')
    expect(falafelPitas.ingredients.map((item) => item.name)).not.toContain('Dried chickpeas')

    const list = buildShoppingList([falafelPitas], [{ id: 'planned-falafel', recipeId: falafelPitas.id, servings: 4 }])
    expect(list.find((item) => item.name === 'Ready-made falafel')).toMatchObject({ quantity: 400, unit: 'g' })
  })

  it('refreshes changed starter recipes for existing households', () => {
    const oldFalafel: Recipe = {
      ...starterRecipes.find((recipe) => recipe.id === 'falafel-pitas')!,
      ingredients: [], totalTimeMinutes: 780, timeCategory: 'long'
    }
    const state: AppState = {
      recipes: [oldFalafel], plan: [], shoppingList: [], weekStart: '2026-09-28',
      updatedAt: '2026-10-01T12:00:00.000Z', catalogVersion: 11
    }

    const migrated = migrateRecipeCatalog(state).recipes.find((recipe) => recipe.id === 'falafel-pitas')!
    expect(migrated.ingredients.map((item) => item.name)).toContain('Ready-made falafel')
    expect(migrated).toMatchObject({ totalTimeMinutes: 20, timeCategory: 'fast' })
  })

  it('migrates overnight oats to the hands-on time preference', () => {
    const overnightOats = starterRecipes.find((candidate) => candidate.id === 'overnight-oats')!
    const state: AppState = {
      recipes: [{ ...overnightOats, totalTimeMinutes: 485, timeCategory: 'long' }],
      plan: [], shoppingList: [], weekStart: '2026-09-28', updatedAt: '2026-10-01T12:00:00.000Z', catalogVersion: 9
    }

    expect(migrateRecipeCatalog(state).recipes[0]).toMatchObject({ totalTimeMinutes: 15, timeCategory: 'fast' })
  })

  it('enriches known recipes and gives custom legacy recipes safe filter defaults', () => {
    const legacyStarter: Recipe = { ...starterRecipes[0], tags: undefined, healthiness: undefined, totalTimeMinutes: undefined, timeCategory: undefined, nutritionPerServing: undefined }
    const custom: Recipe = { id: 'custom', name: 'Custom', emoji: '🍽️', description: '', servings: 2, ingredients: [] }
    const state: AppState = {
      recipes: [legacyStarter, custom], plan: [], shoppingList: [],
      weekStart: '2026-09-28', updatedAt: '2026-09-30T12:00:00.000Z', catalogVersion: 2
    }

    const migrated = migrateRecipeCatalog(state)
    expect(migrated.catalogVersion).toBe(CATALOG_VERSION)
    expect(migrated.updatedAt).toBe(state.updatedAt)
    expect(migrated.recipes.find((recipe) => recipe.id === legacyStarter.id)?.nutritionPerServing).toBeDefined()
    expect(migrated.recipes.find((recipe) => recipe.id === legacyStarter.id)?.totalTimeMinutes).toBeGreaterThan(0)
    expect(migrated.recipes.find((recipe) => recipe.id === 'custom')).toMatchObject({ tags: [], healthiness: 'balanced' })
    expect(migrated.recipes.find((recipe) => recipe.id === 'custom')?.collection).toBe('explore')
  })

  it('moves existing home-garden recipes without replacing user edits', () => {
    const zucchiniSoup = starterRecipes.find((candidate) => candidate.id === 'creamy-zucchini-soup')!
    const state: AppState = {
      recipes: [{ ...zucchiniSoup, name: 'Our zucchini soup', collection: 'old-faithful' }],
      plan: [], shoppingList: [], weekStart: '2026-09-28',
      updatedAt: '2026-10-05T12:00:00.000Z', catalogVersion: 23
    }

    const migrated = migrateRecipeCatalog(state).recipes.find((recipe) => recipe.id === zucchiniSoup.id)!
    expect(migrated).toMatchObject({ name: 'Our zucchini soup', collection: 'garden-harvest' })
  })

  it('removes vegetarian qualifiers from cheese names in existing recipes', () => {
    const recipe: Recipe = {
      id: 'legacy-cheese-recipe',
      name: 'Legacy cheese recipe',
      emoji: '🧀',
      description: 'Made with vegetarian hard cheese and feta.',
      servings: 2,
      ingredients: [
        { id: 'hard-cheese', name: 'Vegetarian Italian-style hard cheese', quantity: 50, unit: 'g', category: 'Dairy & eggs' },
        { id: 'feta', name: 'Vegetarian feta', quantity: 100, unit: 'g', category: 'Dairy & eggs' }
      ],
      instructions: ['Finish with grated vegetarian hard cheese.']
    }
    const state: AppState = {
      recipes: [recipe], plan: [], shoppingList: [], weekStart: '2026-09-28',
      updatedAt: '2026-10-06T12:00:00.000Z', catalogVersion: 24
    }

    const migrated = migrateRecipeCatalog(state).recipes.find((candidate) => candidate.id === recipe.id)!
    expect(migrated.description).toBe('Made with Parmesan and feta.')
    expect(migrated.ingredients.map((ingredient) => ingredient.name)).toEqual(['Parmesan', 'Feta'])
    expect(migrated.instructions).toEqual(['Finish with grated Parmesan.'])
  })

  it('retires non-vegetarian recipes and removes them from the plan', () => {
    const retired: Recipe = { id: 'salmon', name: 'Miso salmon bowls', emoji: '🍚', description: '', servings: 4, ingredients: [] }
    const state: AppState = {
      recipes: [retired], plan: [{ id: 'planned', recipeId: 'salmon', servings: 4 }], shoppingList: [],
      weekStart: '2026-09-28', updatedAt: '2026-09-30T12:00:00.000Z', catalogVersion: 5
    }

    const migrated = migrateRecipeCatalog(state)
    expect(migrated.recipes.some((recipe) => recipe.id === 'salmon')).toBe(false)
    expect(migrated.plan).toEqual([])
  })
})
