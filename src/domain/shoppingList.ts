import type { Ingredient, PlannedMeal, Recipe, ShoppingListItem, Unit } from './model'
import { createId } from './id'

const unitFamily: Record<Unit, string> = {
  g: 'weight', kg: 'weight', ml: 'volume', l: 'volume', piece: 'piece',
  cup: 'cup', tbsp: 'tbsp', tsp: 'tsp', pack: 'pack'
}

function toBase(quantity: number, unit: Unit): { quantity: number; unit: Unit } {
  if (unit === 'kg') return { quantity: quantity * 1000, unit: 'g' }
  if (unit === 'l') return { quantity: quantity * 1000, unit: 'ml' }
  return { quantity, unit }
}

function displayUnit(quantity: number, unit: Unit): { quantity: number; unit: Unit } {
  if (unit === 'g' && quantity >= 1000) return { quantity: quantity / 1000, unit: 'kg' }
  if (unit === 'ml' && quantity >= 1000) return { quantity: quantity / 1000, unit: 'l' }
  return { quantity: Math.round(quantity * 100) / 100, unit }
}

export function canonicalName(name: string): string {
  return name.trim().toLocaleLowerCase()
}

const pantryNamePatterns = [
  /\bflour\b/, /\bsugar\b/, /\bhoney\b/, /\bstock\b/, /\bbreadcrumbs?\b/,
  /\bbaking (?:powder|soda)\b/, /\bcornstarch\b/, /\bvanilla\b/
]

export function isPantryStaple(item: Pick<Ingredient, 'name' | 'category'>): boolean {
  const name = canonicalName(item.name)
  return item.category === 'Spices & sauces' || pantryNamePatterns.some((pattern) => pattern.test(name))
}

export function buildShoppingList(
  recipes: Recipe[],
  plan: PlannedMeal[],
  previous: ShoppingListItem[] = []
): ShoppingListItem[] {
  const accumulated = new Map<string, ShoppingListItem>()

  for (const meal of plan) {
    const recipe = recipes.find((candidate) => candidate.id === meal.recipeId)
    if (!recipe) continue
    const multiplier = meal.servings / recipe.servings
    for (const ingredient of recipe.ingredients) {
      if (ingredient.optional) continue
      const base = toBase(ingredient.quantity * multiplier, ingredient.unit)
      const key = `${canonicalName(ingredient.name)}:${unitFamily[ingredient.unit]}`
      const existing = accumulated.get(key)
      if (existing) {
        existing.quantity += base.quantity
        if (!existing.sources.includes(recipe.name)) existing.sources.push(recipe.name)
      } else {
        accumulated.set(key, {
          ...ingredient,
          id: createId(),
          quantity: base.quantity,
          unit: base.unit,
          checked: false,
          manual: false,
          sources: [recipe.name]
        })
      }
    }
  }

  const generated = [...accumulated.values()].map((item) => {
    const displayed = displayUnit(item.quantity, item.unit)
    const old = previous.find((candidate) =>
      !candidate.manual && canonicalName(candidate.name) === canonicalName(item.name) &&
      unitFamily[candidate.unit] === unitFamily[item.unit]
    )
    return { ...item, ...displayed, checked: old?.checked ?? false, atHome: old?.atHome ?? false, id: old?.id ?? item.id }
  })

  return [...generated, ...previous.filter((item) => item.manual)]
}

export function ingredient(id: string, name: string, quantity: number, unit: Unit, category: Ingredient['category'], optional = false): Ingredient {
  return { id, name, quantity, unit, category, ...(optional ? { optional: true } : {}) }
}
