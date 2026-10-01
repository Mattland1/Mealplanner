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
      expect(recipe.collection, recipe.name).toMatch(/^(old-faithful|explore)$/)
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
    expect(starterRecipes.filter((recipe) => recipe.collection === 'old-faithful').map((recipe) => recipe.id)).toEqual(['kidney-bean-cheeseburgers', 'brotchen-with-cheese', 'overnight-oats'])
  })

  it('marks the Brötchen accompaniments as optional', () => {
    const recipe = starterRecipes.find((candidate) => candidate.id === 'brotchen-with-cheese')
    expect(recipe?.ingredients.filter((item) => !item.optional).map((item) => item.name)).toEqual(['Brötchen', 'Sliced cheese'])
    expect(recipe?.ingredients.filter((item) => item.optional).map((item) => item.name)).toEqual(['Cucumber', 'Tomatoes', 'Grapes'])
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
