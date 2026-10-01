import type { PlannedMeal } from './model'

export function effectivePlanDayCount(plan: PlannedMeal[], preferredCount?: number): number {
  return Math.max(1, preferredCount ?? 1, ...plan.map((meal) => meal.day ?? 1))
}

export function resizePlanDays(plan: PlannedMeal[], requestedCount: number): {
  planDayCount: number
  plan: PlannedMeal[]
} {
  const planDayCount = Math.max(1, Math.floor(requestedCount))
  return {
    planDayCount,
    plan: plan.map((meal) => meal.day && meal.day > planDayCount
      ? { ...meal, day: undefined, slot: undefined }
      : meal)
  }
}
