import { describe, expect, it } from 'vitest'
import { createWeekHistoryEntry, extraItemUsage, recipeUsage, sortByUsage } from './history'
import type { AppState, WeekHistoryEntry } from './model'

const state: AppState = {
  recipes: [{ id: 'soup', name: 'Soup', emoji: '🍲', description: '', servings: 4, ingredients: [] }],
  plan: [{ id: 'plan-1', recipeId: 'soup', servings: 2 }],
  shoppingList: [
    { id: 'bought', name: 'Chocolate', quantity: 1, unit: 'piece', category: 'Other', checked: true, manual: true, sources: [] },
    { id: 'skipped', name: 'Batteries', quantity: 1, unit: 'pack', category: 'Household', checked: false, manual: true, sources: [] },
    { id: 'home', name: 'Salt', quantity: 1, unit: 'pack', category: 'Spices & sauces', checked: true, atHome: true, manual: false, sources: ['Soup'] }
  ],
  weekStart: '2026-10-05',
  updatedAt: '2026-10-07T12:00:00.000Z'
}

describe('week history', () => {
  it('snapshots the final plan and only checked purchases', () => {
    const entry = createWeekHistoryEntry(state, 'history-1', '2026-10-07T13:00:00.000Z')
    expect(entry.recipes).toEqual([{ recipeId: 'soup', name: 'Soup', servings: 2 }])
    expect(entry.purchasedItems).toEqual([{ name: 'Chocolate', quantity: 1, unit: 'piece', manual: true }])
  })

  it('ranks recipes and manual extras across finished weeks', () => {
    const first = createWeekHistoryEntry(state, 'history-1', '2026-10-07T13:00:00.000Z')
    const second: WeekHistoryEntry = {
      ...first,
      id: 'history-2',
      recipes: [...first.recipes, { recipeId: 'pasta', name: 'Pasta', servings: 4 }],
      purchasedItems: [{ name: 'chocolate', quantity: 2, unit: 'piece', manual: true }]
    }
    expect(recipeUsage([first, second])).toEqual([
      { id: 'soup', name: 'Soup', count: 2 },
      { id: 'pasta', name: 'Pasta', count: 1 }
    ])
    expect(extraItemUsage([first, second])).toEqual([{ id: 'chocolate', name: 'chocolate', count: 2 }])
  })

  it('sorts by usage while preserving the curated order for ties', () => {
    const items = [{ id: 'new' }, { id: 'favourite' }, { id: 'also-new' }]
    expect(sortByUsage(items, [{ id: 'favourite', name: 'Favourite', count: 3 }], (item) => item.id)).toEqual([
      { id: 'favourite' }, { id: 'new' }, { id: 'also-new' }
    ])
  })
})
