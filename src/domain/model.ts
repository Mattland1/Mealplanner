export const categories = [
  'Vegetables', 'Fruit', 'Bakery', 'Dairy & eggs', 'Meat & fish',
  'Dry goods', 'Canned goods', 'Frozen', 'Spices & sauces', 'Household', 'Other'
] as const

export type Category = typeof categories[number]
export type Unit = 'g' | 'kg' | 'ml' | 'l' | 'piece' | 'cup' | 'tbsp' | 'tsp' | 'pack'
export type RecipeCollection = 'old-faithful' | 'garden-harvest' | 'explore'
export type Healthiness = 'healthy' | 'balanced' | 'indulgent'
export type TimeCategory = 'fast' | 'medium' | 'long'

export function timeCategoryFor(totalTimeMinutes: number): TimeCategory {
  if (totalTimeMinutes <= 30) return 'fast'
  if (totalTimeMinutes <= 60) return 'medium'
  return 'long'
}

export interface NutritionPerServing {
  caloriesKcal: number
  proteinG: number
  carbsG: number
  fatG: number
  sugarG: number
  fiberG?: number
  saturatedFatG?: number
  sodiumMg?: number
  estimated: true
}

export interface Ingredient {
  id: string
  name: string
  quantity: number
  unit: Unit
  category: Category
  optional?: boolean
}

export interface Recipe {
  id: string
  name: string
  emoji: string
  description: string
  servings: number
  ingredients: Ingredient[]
  collection?: RecipeCollection
  tags?: string[]
  healthiness?: Healthiness
  totalTimeMinutes?: number
  timeCategory?: TimeCategory
  nutritionPerServing?: NutritionPerServing
  instructions?: string[]
  sourceUrl?: string
  imageUrl?: string
}

export interface PlannedMeal {
  id: string
  recipeId: string
  servings: number
}

export interface ShoppingListItem extends Ingredient {
  checked: boolean
  manual: boolean
  sources: string[]
  atHome?: boolean
}

export interface ShoppingCatalogItem extends Ingredient {
  custom?: boolean
}

export interface WeekHistoryRecipe {
  recipeId: string
  name: string
  servings: number
}

export interface WeekHistoryPurchase {
  name: string
  quantity: number
  unit: Unit
  manual: boolean
}

export interface WeekHistoryEntry {
  id: string
  weekStart: string
  completedAt: string
  recipes: WeekHistoryRecipe[]
  purchasedItems: WeekHistoryPurchase[]
}

export interface AppState {
  recipes: Recipe[]
  plan: PlannedMeal[]
  shoppingList: ShoppingListItem[]
  extraShoppingItems?: ShoppingCatalogItem[]
  weekHistory?: WeekHistoryEntry[]
  weekStart: string
  updatedAt: string
  catalogVersion?: number
}

export type InboxKind = 'recipe' | 'photo' | 'idea' | 'other'

export interface InboxItem {
  id: string
  kind: InboxKind
  title: string
  note: string
  url: string
  fileName: string | null
  mimeType: string | null
  size: number | null
  createdAt: string
}
