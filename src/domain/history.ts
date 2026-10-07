import type { AppState, WeekHistoryEntry } from './model'

export interface UsageCount {
  id: string
  name: string
  count: number
}

export function createWeekHistoryEntry(
  state: AppState,
  id: string,
  completedAt: string
): WeekHistoryEntry {
  const recipesById = new Map(state.recipes.map((recipe) => [recipe.id, recipe]))
  return {
    id,
    weekStart: state.weekStart,
    completedAt,
    recipes: state.plan.flatMap((meal) => {
      const recipe = recipesById.get(meal.recipeId)
      return recipe ? [{ recipeId: recipe.id, name: recipe.name, servings: meal.servings }] : []
    }),
    purchasedItems: state.shoppingList
      .filter((item) => item.checked && !item.atHome)
      .map((item) => ({ name: item.name, quantity: item.quantity, unit: item.unit, manual: item.manual }))
  }
}

export function recipeUsage(history: WeekHistoryEntry[] = []): UsageCount[] {
  const counts = new Map<string, UsageCount>()
  for (const week of history) {
    for (const recipe of week.recipes) {
      const current = counts.get(recipe.recipeId)
      counts.set(recipe.recipeId, { id: recipe.recipeId, name: recipe.name, count: (current?.count ?? 0) + 1 })
    }
  }
  return [...counts.values()].sort((left, right) => right.count - left.count || left.name.localeCompare(right.name))
}

export function extraItemUsage(history: WeekHistoryEntry[] = []): UsageCount[] {
  const counts = new Map<string, UsageCount>()
  for (const week of history) {
    for (const item of week.purchasedItems.filter((purchase) => purchase.manual)) {
      const id = item.name.trim().toLocaleLowerCase()
      const current = counts.get(id)
      counts.set(id, { id, name: item.name, count: (current?.count ?? 0) + 1 })
    }
  }
  return [...counts.values()].sort((left, right) => right.count - left.count || left.name.localeCompare(right.name))
}

export function sortByUsage<T>(items: T[], usage: UsageCount[], identity: (item: T) => string): T[] {
  const counts = new Map(usage.map((item) => [item.id, item.count]))
  return items
    .map((item, index) => ({ item, index, count: counts.get(identity(item)) ?? 0 }))
    .sort((left, right) => right.count - left.count || left.index - right.index)
    .map(({ item }) => item)
}
