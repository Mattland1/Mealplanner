import { describe, expect, it } from 'vitest'
import type { ShoppingListItem } from './model'
import { formatShoppingListForClipboard } from './shoppingListText'

function item(overrides: Partial<ShoppingListItem> & Pick<ShoppingListItem, 'id' | 'name'>): ShoppingListItem {
  return {
    quantity: 1,
    unit: 'piece',
    category: 'Other',
    checked: false,
    manual: false,
    sources: [],
    ...overrides
  }
}

describe('formatShoppingListForClipboard', () => {
  it('groups essentials, marks progress, and keeps optional items separate', () => {
    const text = formatShoppingListForClipboard([
      item({ id: 'carrots', name: 'Carrots', quantity: 500, unit: 'g', category: 'Vegetables' }),
      item({ id: 'milk', name: 'Milk', quantity: 2, unit: 'l', category: 'Dairy & eggs', checked: true }),
      item({ id: 'berries', name: 'Berries', quantity: 1, unit: 'pack', category: 'Fruit', optional: true })
    ])

    expect(text).toBe('Shopping list\n\nVegetables\n☐ 500 g Carrots\n\nDairy & eggs\n✓ 2 l Milk\n\nOptional / bonus\n☐ 1 pack Berries')
  })

  it('leaves items already found at home out of the copied list', () => {
    const text = formatShoppingListForClipboard([
      item({ id: 'oil', name: 'Olive oil', unit: 'tbsp', atHome: true }),
      item({ id: 'bread', name: 'Bread rolls', quantity: 2, category: 'Bakery' })
    ])

    expect(text).toBe('Shopping list\n\nBakery\n☐ 2 pcs Bread rolls')
  })
})
