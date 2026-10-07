import { categories, type ShoppingListItem } from './model'

function quantityLabel(item: ShoppingListItem): string {
  const quantity = Math.round(item.quantity * 100) / 100
  const unit = item.unit === 'piece' ? (quantity === 1 ? 'pc' : 'pcs') : item.unit
  return `${quantity} ${unit}`
}

function formatItem(item: ShoppingListItem): string {
  return `${item.checked ? '✓' : '☐'} ${quantityLabel(item)} ${item.name}`
}

export function formatShoppingListForClipboard(items: ShoppingListItem[]): string {
  const available = items.filter((item) => !item.atHome)
  const essential = available.filter((item) => !item.optional)
  const optional = available.filter((item) => item.optional)
  const sections = categories.flatMap((category) => {
    const categoryItems = essential.filter((item) => item.category === category)
    return categoryItems.length ? [`${category}\n${categoryItems.map(formatItem).join('\n')}`] : []
  })

  if (optional.length) {
    sections.push(`Optional / bonus\n${optional.map(formatItem).join('\n')}`)
  }

  return ['Shopping list', ...sections].join('\n\n')
}
