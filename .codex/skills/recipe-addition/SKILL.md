---
name: recipe-addition
description: Add a complete recipe to the Savor Mealplanner from a link, photo, pasted recipe, or rough idea, including practical metric ingredients, total-time classification, estimated per-serving nutrition, tags, healthiness, and an optional meal image. Use for adding or normalizing recipes in this repository; not for general meal-planning advice.
---

# Recipe Addition

Turn the user's source into a usable Savor recipe and add it to the catalog. Inspect the current domain model and seed migration before editing because the schema may have evolved.

## Resolve the source

- Accept a webpage, photo, document, pasted text, or rough ingredient list.
- Read the source closely. For a link, use the original recipe page where possible. For an image, transcribe visible amounts and method before inferring missing details.
- Fill minor gaps using culinary judgment or targeted research. Ask only when a missing choice would materially change the dish, servings, dietary suitability, or result.
- Preserve the source's identity. Do not silently replace unusual ingredients or materially rewrite the recipe.

## Normalize the recipe

Read [references/recipe-schema.md](references/recipe-schema.md) before constructing or editing recipe data.

- Record a realistic base serving count and ingredient amounts for the whole recipe.
- Use metric weight/volume. Cups, tablespoons, and teaspoons may remain when natural to the source. Convert pounds and ounces to grams; convert fluid ounces, pints, and quarts to millilitres or litres.
- Prefer `piece` for countable produce and other items people normally buy or use by count: peppers, onions, lemons, garlic cloves, eggs, avocados, tortillas, and similar items. Do not force these into grams merely for precision.
- Keep shopping names recognizable and stable so shopping-list aggregation works.
- Include concise, executable method steps when the source provides or implies a method.
- Record a realistic total elapsed time in minutes, including preparation, cooking, baking, resting, marinating, soaking, or chilling that must happen before serving. Do not substitute hands-on time for total time.
- Assign the time category deterministically: `fast` for 30 minutes or less, `medium` for 31–60 minutes, and `long` for more than 60 minutes. Required overnight preparation makes a recipe `long`; mention it clearly in the handoff.

## Estimate nutrition

Estimate nutrition per serving from the edible quantities in the ingredient list, including cooking oil, sauces, toppings, and other meaningful ingredients. Use trustworthy food-composition or package data when available. Sum the whole recipe, divide by base servings, then round calories to a useful whole-number estimate and macros to practical gram precision.

Always provide calories, protein, carbohydrates, fat, and sugar. Add fiber, saturated fat, and sodium when the evidence supports a reasonable estimate. Mark the values as estimated; do not present them as laboratory precision. If an ingredient amount is uncertain, choose a defensible household amount and mention material uncertainty in the handoff.

## Classify and illustrate

- Assign a small, consistent set of lowercase tags. Include diet when relevant (`vegetarian`, `vegan`, `pescatarian`), cuisine or inspiration, dish type, and one or two genuinely useful traits such as `quick`, `one-pot`, `high-protein`, or `high-fiber`. Do not add `meat` alternatives by default.
- Set one healthiness value: `healthy`, `balanced`, or `indulgent`. Judge the complete serving, considering vegetable/whole-food content, fiber, protein, energy density, saturated fat, sodium, and added sugar. This is a practical sorting aid, not medical advice.
- Prefer an image from the original recipe page when reuse/hotlinking is appropriate and the URL is stable. Otherwise use a clearly fitting, reusable image found online. If neither is easy and appropriate, leave `imageUrl` absent and choose a fitting emoji; the UI uses it as the fallback. Never delay the recipe solely for an image.
- Preserve the source URL when one exists.

## Add and verify

- Add the recipe to `src/data/seed.ts` using the established ingredient helper and metadata shape.
- Use a stable kebab-case recipe ID and unique ingredient IDs.
- Increment `CATALOG_VERSION` so existing households receive newly added seed recipes. Do not change an existing recipe's ID.
- If adding a field the current `Recipe` model cannot represent, extend the model and migration narrowly instead of hiding data in the description.
- Run the repository's tests and production build. Confirm shopping-list units still scale and combine correctly.
- Summarize the added recipe, total time and category, per-serving estimate, tags, healthiness, unit conversions, source, and any important assumptions.
