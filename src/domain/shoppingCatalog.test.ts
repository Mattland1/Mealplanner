import { describe, expect, it } from 'vitest'
import { addCustomCatalogItem, preparedShoppingItems } from './shoppingCatalog'

describe('shopping item catalogue', () => {
  it('includes common household items and non-recipe treats', () => {
    expect(preparedShoppingItems.find((item) => item.name === 'Toilet paper')).toMatchObject({ category: 'Household', unit: 'pack' })
    expect(preparedShoppingItems.find((item) => item.name === 'Chocolate')).toMatchObject({ category: 'Other' })
  })

  it('adds a custom item and replaces a duplicate case-insensitively', () => {
    const first = addCustomCatalogItem([], { id: 'first', name: 'Birthday candles', quantity: 1, unit: 'pack', category: 'Household' })
    const second = addCustomCatalogItem(first, { id: 'second', name: ' birthday CANDLES ', quantity: 2, unit: 'piece', category: 'Other' })

    expect(second).toHaveLength(1)
    expect(second[0]).toMatchObject({ id: 'first', name: 'birthday CANDLES', quantity: 2, custom: true })
  })
})
