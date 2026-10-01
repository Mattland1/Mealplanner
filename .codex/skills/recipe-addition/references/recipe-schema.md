# Savor recipe schema

Use the live TypeScript definitions in `src/domain/model.ts` as the authority. At the time this reference was written, a complete recipe has this logical shape:

```ts
interface Recipe {
  id: string
  name: string
  emoji: string
  description: string
  servings: number
  ingredients: Ingredient[]
  collection?: 'old-faithful' | 'explore'
  tags?: string[]
  healthiness?: 'healthy' | 'balanced' | 'indulgent'
  totalTimeMinutes?: number
  timeCategory?: 'fast' | 'medium' | 'long'
  nutritionPerServing?: {
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
  instructions?: string[]
  sourceUrl?: string
  imageUrl?: string
}
```

Ingredient units are `g`, `kg`, `ml`, `l`, `piece`, `cup`, `tbsp`, `tsp`, or `pack`. Choose the shopping category from the exported `categories` list.
Ingredients may set `optional: true`. Optional ingredients are shown as extras in recipe details and are deliberately excluded from generated shopping lists. Use this only for genuinely dispensable accompaniments, not core ingredients.

## Time calibration

Store total elapsed time—not only active preparation time—and derive the category from it:

- `fast`: 30 minutes or less
- `medium`: 31–60 minutes
- `long`: more than 60 minutes

Include required soaking, marinating, rising, resting, chilling, and similar waiting periods. For example, a 45-minute falafel method that requires a 12-hour chickpea soak has a total time around 765 minutes and is `long`. Use `timeCategoryFor` from the live domain model when editing application code so category boundaries remain consistent.

## Healthiness calibration

- `healthy`: strongly supports an everyday healthy choice; generally vegetable/legume/whole-food forward with useful protein or fiber and moderate energy, saturated fat, sodium, and added sugar.
- `balanced`: a reasonable meal with meaningful nutrition but some refined carbohydrate, richer dairy, oil, salt, or energy density that makes `healthy` too strong.
- `indulgent`: notably energy-dense or high in saturated fat, sodium, or added sugar, with limited balancing fiber/produce. This is not a moral judgment.

## Tag conventions

Use lowercase kebab-case for multiword tags. Prefer existing tags over synonyms. Useful tag dimensions are:

- Diet: `vegetarian`, `vegan`, `pescatarian`
- Cuisine: `mexican-inspired`, `italian-inspired`, `indian-inspired`, `middle-eastern-inspired`, `mediterranean-inspired`, `asian-inspired`
- Format: `pasta`, `curry`, `soup`, `tacos`, `bowl`, `traybake`, `one-pot`, `one-pan`
- Utility: `quick`, `high-protein`, `high-fiber`, `gluten-free`, `spicy`, `brunch`

Use cuisine names without `-inspired` only when the source and dish clearly warrant that stronger claim.

## Ingredient normalization examples

- `1 lb potatoes` → `454 g` (or a sensible rounded recipe amount such as `450 g`)
- `8 oz pasta` → `227 g` (round only when it does not distort the recipe)
- `1 bell pepper` → `1 piece`, not an invented gram weight
- `2 garlic cloves` → `2 piece`
- `1 US cup rice` → `1 cup` is acceptable; do not convert merely for uniformity
