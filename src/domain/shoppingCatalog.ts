import type { Category, ShoppingCatalogItem, Unit } from './model'

function catalogItem(id: string, name: string, category: Category, unit: Unit = 'piece', quantity = 1): ShoppingCatalogItem {
  return { id, name, quantity, unit, category }
}

export const preparedShoppingItems: ShoppingCatalogItem[] = [
  catalogItem('catalog-toilet-paper', 'Toilet paper', 'Household', 'pack'),
  catalogItem('catalog-kitchen-roll', 'Kitchen roll', 'Household', 'pack'),
  catalogItem('catalog-tissues', 'Tissues', 'Household', 'pack'),
  catalogItem('catalog-bin-bags', 'Bin bags', 'Household', 'pack'),
  catalogItem('catalog-dish-soap', 'Dish soap', 'Household'),
  catalogItem('catalog-dishwasher-tabs', 'Dishwasher tablets', 'Household', 'pack'),
  catalogItem('catalog-laundry-detergent', 'Laundry detergent', 'Household'),
  catalogItem('catalog-cleaning-spray', 'All-purpose cleaner', 'Household'),
  catalogItem('catalog-sponges', 'Cleaning sponges', 'Household', 'pack'),
  catalogItem('catalog-hand-soap', 'Hand soap', 'Household'),
  catalogItem('catalog-shampoo', 'Shampoo', 'Household'),
  catalogItem('catalog-toothpaste', 'Toothpaste', 'Household'),
  catalogItem('catalog-baking-paper', 'Baking paper', 'Household', 'pack'),
  catalogItem('catalog-aluminium-foil', 'Aluminium foil', 'Household', 'pack'),
  catalogItem('catalog-chocolate', 'Chocolate', 'Other'),
  catalogItem('catalog-coffee', 'Coffee', 'Dry goods', 'pack'),
  catalogItem('catalog-tea', 'Tea', 'Dry goods', 'pack'),
  catalogItem('catalog-snacks', 'Snacks', 'Other', 'pack'),
  catalogItem('catalog-pet-food', 'Pet food', 'Other', 'pack'),
  catalogItem('catalog-batteries', 'Batteries', 'Household', 'pack')
]

export function sameCatalogName(left: string, right: string): boolean {
  return left.trim().toLocaleLowerCase() === right.trim().toLocaleLowerCase()
}

export function addCustomCatalogItem(current: ShoppingCatalogItem[], item: ShoppingCatalogItem): ShoppingCatalogItem[] {
  const normalized = { ...item, name: item.name.trim(), custom: true as const }
  const duplicateIndex = current.findIndex((candidate) => sameCatalogName(candidate.name, normalized.name))
  if (duplicateIndex === -1) return [...current, normalized]
  return current.map((candidate, index) => index === duplicateIndex ? { ...normalized, id: candidate.id } : candidate)
}
