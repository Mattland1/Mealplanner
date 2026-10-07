import { describe, expect, it } from 'vitest'
import type { PlannedMeal, Recipe, ShoppingListItem } from './model'
import { buildShoppingList, ingredient, isPantryStaple } from './shoppingList'

const recipes: Recipe[] = [
  { id: 'a', name: 'Soup', emoji: '🥣', description: '', servings: 2, ingredients: [ingredient('1', 'Carrots', 500, 'g', 'Vegetables'), ingredient('2', 'Onion', 1, 'piece', 'Vegetables')] },
  { id: 'b', name: 'Curry', emoji: '🍛', description: '', servings: 4, ingredients: [ingredient('3', 'carrots', 1, 'kg', 'Vegetables')] }
]

describe('buildShoppingList', () => {
  it('scales servings and combines compatible units', () => {
    const plan: PlannedMeal[] = [{ id: 'p1', recipeId: 'a', servings: 4 }, { id: 'p2', recipeId: 'b', servings: 2 }]
    const list = buildShoppingList(recipes, plan)
    expect(list.find((item) => item.name === 'Carrots')).toMatchObject({ quantity: 1.5, unit: 'kg', sources: ['Soup', 'Curry'] })
    expect(list.find((item) => item.name === 'Onion')).toMatchObject({ quantity: 2, unit: 'piece' })
  })

  it('preserves checked state and manual items when regenerated', () => {
    const previous: ShoppingListItem[] = [
      { ...ingredient('old', 'Carrots', 500, 'g', 'Vegetables'), checked: true, manual: false, sources: ['Soup'] },
      { ...ingredient('manual', 'Coffee', 1, 'pack', 'Dry goods'), checked: false, manual: true, sources: [] }
    ]
    const list = buildShoppingList(recipes, [{ id: 'p1', recipeId: 'a', servings: 2 }], previous)
    expect(list.find((item) => item.name === 'Carrots')).toMatchObject({ id: 'old', checked: true })
    expect(list.find((item) => item.name === 'Coffee')).toMatchObject({ manual: true })
  })

  it('preserves items marked as already at home when regenerated', () => {
    const previous: ShoppingListItem[] = [
      { ...ingredient('oil', 'Olive oil', 2, 'tbsp', 'Spices & sauces'), checked: false, manual: false, sources: ['Salad'], atHome: true }
    ]
    const oilRecipe: Recipe = { id: 'salad', name: 'Salad', emoji: '🥗', description: '', servings: 2, ingredients: [ingredient('new-oil', 'Olive oil', 2, 'tbsp', 'Spices & sauces')] }

    const list = buildShoppingList([oilRecipe], [{ id: 'p1', recipeId: 'salad', servings: 2 }], previous)

    expect(list[0]).toMatchObject({ name: 'Olive oil', atHome: true })
  })

  it('identifies pantry staples for the pre-shopping check', () => {
    expect(isPantryStaple(ingredient('oil', 'Olive oil', 1, 'tbsp', 'Spices & sauces'))).toBe(true)
    expect(isPantryStaple(ingredient('flour', 'Flour', 100, 'g', 'Dry goods'))).toBe(true)
    expect(isPantryStaple(ingredient('pasta', 'Pasta', 400, 'g', 'Dry goods'))).toBe(false)
  })

  it('keeps cups as a practical source unit', () => {
    const cupRecipe: Recipe = {
      id: 'cups', name: 'Rice', emoji: '🍚', description: '', servings: 2,
      ingredients: [ingredient('rice', 'Rice', 1.5, 'cup', 'Dry goods')]
    }
    const list = buildShoppingList([cupRecipe], [{ id: 'p1', recipeId: 'cups', servings: 4 }])
    expect(list[0]).toMatchObject({ name: 'Rice', quantity: 3, unit: 'cup' })
  })

  it('adds scaled optional ingredients as bonus items', () => {
    const flexibleMeal: Recipe = {
      id: 'flexible', name: 'Flexible meal', emoji: '🥪', description: '', servings: 2,
      ingredients: [
        ingredient('bread', 'Bread rolls', 4, 'piece', 'Bakery'),
        ingredient('tomato', 'Tomato', 2, 'piece', 'Vegetables', true)
      ]
    }
    const list = buildShoppingList([flexibleMeal], [{ id: 'p1', recipeId: 'flexible', servings: 4 }])

    expect(list).toHaveLength(2)
    expect(list.find((item) => item.name === 'Bread rolls')).toMatchObject({ quantity: 8 })
    expect(list.find((item) => item.name === 'Bread rolls')?.optional).toBeUndefined()
    expect(list.find((item) => item.name === 'Tomato')).toMatchObject({ quantity: 4, optional: true })
  })

  it('treats a combined ingredient as essential when any recipe requires it', () => {
    const optionalTomato: Recipe = {
      id: 'optional', name: 'Optional tomato', emoji: '🥪', description: '', servings: 2,
      ingredients: [ingredient('optional-tomato', 'Tomato', 1, 'piece', 'Vegetables', true)]
    }
    const requiredTomato: Recipe = {
      id: 'required', name: 'Required tomato', emoji: '🥗', description: '', servings: 2,
      ingredients: [ingredient('required-tomato', 'tomato', 2, 'piece', 'Vegetables')]
    }

    const list = buildShoppingList(
      [optionalTomato, requiredTomato],
      [{ id: 'p1', recipeId: 'optional', servings: 2 }, { id: 'p2', recipeId: 'required', servings: 2 }]
    )

    expect(list).toHaveLength(1)
    expect(list[0]).toMatchObject({ quantity: 3, optional: false, sources: ['Optional tomato', 'Required tomato'] })
  })
})
