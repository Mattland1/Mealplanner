import { describe, expect, it } from 'vitest'
import type { PlannedMeal } from './model'
import { effectivePlanDayCount, resizePlanDays } from './mealPlan'

const plan: PlannedMeal[] = [
  { id: 'one', recipeId: 'a', servings: 2, day: 1, slot: 'lunch' },
  { id: 'two', recipeId: 'b', servings: 4, day: 3, slot: 'dinner' },
  { id: 'extra', recipeId: 'c', servings: 1 }
]

describe('flexible meal-plan days', () => {
  it('keeps enough days to display every assigned meal', () => {
    expect(effectivePlanDayCount(plan, 1)).toBe(3)
    expect(effectivePlanDayCount([], undefined)).toBe(1)
  })

  it('moves meals from removed days to Extras without deleting them', () => {
    const resized = resizePlanDays(plan, 2)

    expect(resized.planDayCount).toBe(2)
    expect(resized.plan).toHaveLength(3)
    expect(resized.plan.find((meal) => meal.id === 'one')).toMatchObject({ day: 1, slot: 'lunch' })
    expect(resized.plan.find((meal) => meal.id === 'two')).toMatchObject({ day: undefined, slot: undefined })
  })
})
