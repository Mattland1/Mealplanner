import { timeCategoryFor, type AppState, type Recipe } from '../domain/model'
import { ingredient as i } from '../domain/shoppingList'

const starterRecipeBasics: Recipe[] = [
  {
    id: 'lentil-curry', name: 'Coconut lentil curry', emoji: '🥥', servings: 4,
    description: 'Creamy, warming and weeknight-friendly.',
    collection: 'explore',
    ingredients: [
      i('lc-lentils', 'Red lentils', 300, 'g', 'Dry goods'),
      i('lc-coconut', 'Coconut milk', 2, 'pack', 'Canned goods'),
      i('lc-tomatoes', 'Chopped tomatoes', 1, 'pack', 'Canned goods'),
      i('lc-spinach', 'Baby spinach', 200, 'g', 'Vegetables'),
      i('lc-onion', 'Onion', 1, 'piece', 'Vegetables'),
      i('lc-garlic', 'Garlic', 3, 'piece', 'Vegetables'),
      i('lc-curry', 'Curry powder', 2, 'tbsp', 'Spices & sauces')
    ]
  },
  {
    id: 'lemon-pasta', name: 'Lemon ricotta pasta', emoji: '🍋', servings: 4,
    description: 'Bright pasta with peas and creamy ricotta.',
    collection: 'explore',
    ingredients: [
      i('lp-pasta', 'Pasta', 400, 'g', 'Dry goods'),
      i('lp-ricotta', 'Ricotta', 250, 'g', 'Dairy & eggs'),
      i('lp-lemon', 'Lemon', 2, 'piece', 'Fruit'),
      i('lp-peas', 'Green peas', 300, 'g', 'Frozen'),
      i('lp-parmesan', 'Vegetarian Italian-style hard cheese', 80, 'g', 'Dairy & eggs')
    ]
  },
  {
    id: 'tacos', name: 'Black bean tacos', emoji: '🌮', servings: 4,
    description: 'Quick tacos with crisp lettuce and avocado.',
    collection: 'explore',
    ingredients: [
      i('bt-tortilla', 'Tortillas', 8, 'piece', 'Bakery'),
      i('bt-beans', 'Black beans', 2, 'pack', 'Canned goods'),
      i('bt-lettuce', 'Romaine lettuce', 1, 'piece', 'Vegetables'),
      i('bt-avocado', 'Avocado', 2, 'piece', 'Vegetables'),
      i('bt-lime', 'Lime', 2, 'piece', 'Fruit'),
      i('bt-yogurt', 'Greek yogurt', 150, 'g', 'Dairy & eggs')
    ]
  },
  {
    id: 'soup', name: 'Tomato butter bean soup', emoji: '🥣', servings: 4,
    description: 'A pantry-led tomato and white bean soup with crusty bread.',
    collection: 'explore',
    ingredients: [
      i('ts-beans', 'White beans (400 g can)', 2, 'pack', 'Canned goods'),
      i('ts-tomatoes', 'Chopped tomatoes', 2, 'pack', 'Canned goods'),
      i('ts-onion', 'Onion', 1, 'piece', 'Vegetables'),
      i('ts-carrot', 'Carrots', 2, 'piece', 'Vegetables'),
      i('ts-bread', 'Sourdough bread', 1, 'piece', 'Bakery')
    ]
  },
  {
    id: 'harissa-gnocchi', name: 'Crispy harissa gnocchi', emoji: '🍅', servings: 4,
    description: 'One-pan gnocchi with tomatoes, chickpeas and feta.',
    collection: 'explore',
    ingredients: [
      i('hg-gnocchi', 'Gnocchi', 800, 'g', 'Dry goods'),
      i('hg-chickpeas', 'Chickpeas', 1, 'pack', 'Canned goods'),
      i('hg-tomatoes', 'Cherry tomatoes', 500, 'g', 'Vegetables'),
      i('hg-feta', 'Vegetarian feta', 200, 'g', 'Dairy & eggs'),
      i('hg-harissa', 'Harissa paste', 2, 'tbsp', 'Spices & sauces')
    ]
  },
  {
    id: 'sesame-noodles', name: 'Sesame soba noodles', emoji: '🍜', servings: 4,
    description: 'Nutty noodles with edamame and crunchy vegetables.',
    collection: 'explore',
    ingredients: [
      i('sn-noodles', 'Soba noodles', 350, 'g', 'Dry goods'),
      i('sn-edamame', 'Edamame', 300, 'g', 'Frozen'),
      i('sn-cucumber', 'Cucumber', 1, 'piece', 'Vegetables'),
      i('sn-carrots', 'Carrots', 3, 'piece', 'Vegetables'),
      i('sn-sesame', 'Sesame oil', 2, 'tbsp', 'Spices & sauces'),
      i('sn-soy', 'Soy sauce', 3, 'tbsp', 'Spices & sauces')
    ]
  },
  {
    id: 'green-shakshuka', name: 'Green shakshuka', emoji: '🍳', servings: 4,
    description: 'Baked eggs in a herby spinach and leek sauce.',
    collection: 'explore',
    ingredients: [
      i('gs-eggs', 'Eggs', 8, 'piece', 'Dairy & eggs'),
      i('gs-spinach', 'Spinach', 500, 'g', 'Vegetables'),
      i('gs-leeks', 'Leeks', 2, 'piece', 'Vegetables'),
      i('gs-herbs', 'Fresh herbs', 1, 'pack', 'Vegetables'),
      i('gs-yogurt', 'Greek yogurt', 200, 'g', 'Dairy & eggs'),
      i('gs-bread', 'Flatbread', 4, 'piece', 'Bakery')
    ]
  },
  {
    id: 'aubergine-ragu', name: 'Smoky aubergine ragù', emoji: '🍆', servings: 4,
    description: 'Slow-simmered aubergine and tomato over rigatoni.',
    collection: 'explore',
    ingredients: [
      i('ar-aubergine', 'Aubergines', 2, 'piece', 'Vegetables'),
      i('ar-pasta', 'Rigatoni', 400, 'g', 'Dry goods'),
      i('ar-tomatoes', 'Chopped tomatoes', 2, 'pack', 'Canned goods'),
      i('ar-onion', 'Onion', 1, 'piece', 'Vegetables'),
      i('ar-garlic', 'Garlic', 3, 'piece', 'Vegetables'),
      i('ar-parmesan', 'Vegetarian Italian-style hard cheese', 80, 'g', 'Dairy & eggs')
    ]
  },
  {
    id: 'halloumi-traybake', name: 'Halloumi couscous traybake', emoji: '🫑', servings: 4,
    description: 'Golden halloumi, peppers and fluffy herbed couscous.',
    collection: 'explore',
    ingredients: [
      i('ht-halloumi', 'Vegetarian halloumi', 450, 'g', 'Dairy & eggs'),
      i('ht-couscous', 'Couscous', 300, 'g', 'Dry goods'),
      i('ht-peppers', 'Bell pepper', 3, 'piece', 'Vegetables'),
      i('ht-courgette', 'Courgette', 2, 'piece', 'Vegetables'),
      i('ht-lemon', 'Lemon', 1, 'piece', 'Fruit')
    ]
  },
  {
    id: 'cheese-pepper-enchiladas', name: 'Cheese & pepper enchiladas', emoji: '🫔', servings: 4,
    description: 'Baked tortillas filled with peppers, crème fraîche and cheese in a lively tomato-chilli sauce.',
    collection: 'explore',
    sourceUrl: 'https://www.chefkoch.de/rezepte/1805181291909643/Enchiladas-de-Queso.html',
    ingredients: [
      i('cpe-tortillas', 'Tortillas', 8, 'piece', 'Bakery'),
      i('cpe-cheese', 'Vegetarian grated cheese', 400, 'g', 'Dairy & eggs'),
      i('cpe-onions', 'Onions', 2, 'piece', 'Vegetables'),
      i('cpe-peppers', 'Bell peppers', 3, 'piece', 'Vegetables'),
      i('cpe-creme-fraiche', 'Crème fraîche', 400, 'g', 'Dairy & eggs'),
      i('cpe-passata', 'Passata', 500, 'g', 'Canned goods'),
      i('cpe-garlic', 'Garlic', 1, 'piece', 'Vegetables'),
      i('cpe-chillies', 'Fresh chillies', 2, 'piece', 'Vegetables'),
      i('cpe-oil', 'Vegetable oil', 1, 'tbsp', 'Spices & sauces'),
      i('cpe-lemon', 'Lemon', 1, 'piece', 'Fruit'),
      i('cpe-sugar', 'Sugar', 1, 'tsp', 'Dry goods'),
      i('cpe-salt', 'Salt', 1, 'tsp', 'Spices & sauces'),
      i('cpe-pepper', 'Black pepper', 0.5, 'tsp', 'Spices & sauces')
    ]
  },
  {
    id: 'chili-sin-carne', name: 'Chili sin carne', emoji: '🌶️', servings: 4,
    description: 'A thick, warming Tex-Mex-style chili with lentils, kidney beans, corn and potatoes.',
    collection: 'explore',
    sourceUrl: 'https://www.chefkoch.de/rezepte/595441159189225/Chili-sin-Carne.html',
    ingredients: [
      i('csc-onion', 'Onion', 1, 'piece', 'Vegetables'),
      i('csc-garlic', 'Garlic', 2, 'piece', 'Vegetables'),
      i('csc-oil', 'Vegetable oil', 1, 'tbsp', 'Spices & sauces'),
      i('csc-potatoes', 'Potatoes', 2, 'piece', 'Vegetables'),
      i('csc-lentils', 'Red lentils', 250, 'g', 'Dry goods'),
      i('csc-stock', 'Vegetable stock', 1.25, 'l', 'Canned goods'),
      i('csc-kidney-beans', 'Kidney beans (400 g can)', 1, 'pack', 'Canned goods'),
      i('csc-corn', 'Sweetcorn (300 g can)', 1, 'pack', 'Canned goods'),
      i('csc-passata', 'Passata', 500, 'g', 'Canned goods'),
      i('csc-curry', 'Curry powder', 1, 'tsp', 'Spices & sauces'),
      i('csc-paprika', 'Paprika', 2, 'tsp', 'Spices & sauces'),
      i('csc-chilli', 'Chilli powder', 1, 'tsp', 'Spices & sauces'),
      i('csc-salt', 'Salt', 0.5, 'tsp', 'Spices & sauces'),
      i('csc-pepper', 'Black pepper', 0.5, 'tsp', 'Spices & sauces')
    ]
  },
  {
    id: 'falafel-pitas', name: 'Falafel pitas with tahini salad', emoji: '🧆', servings: 4,
    description: 'Ready-made falafel tucked into warm pitas with fresh salad and lemon-tahini sauce.',
    collection: 'explore',
    sourceUrl: 'https://www.chefkoch.de/rezepte/779611181045749/Falafel.html',
    ingredients: [
      i('fp-ready-made-falafel', 'Ready-made falafel', 400, 'g', 'Other'),
      i('fp-parsley', 'Fresh parsley', 1, 'pack', 'Vegetables'),
      i('fp-pitas', 'Pita breads', 4, 'piece', 'Bakery'),
      i('fp-tomatoes', 'Tomatoes', 2, 'piece', 'Vegetables'),
      i('fp-cucumber', 'Cucumber', 1, 'piece', 'Vegetables'),
      i('fp-tahini', 'Tahini', 4, 'tbsp', 'Spices & sauces'),
      i('fp-lemon', 'Lemon', 1, 'piece', 'Fruit'),
      i('fp-salt', 'Salt', 1, 'tsp', 'Spices & sauces'),
      i('fp-pepper', 'Black pepper', 0.5, 'tsp', 'Spices & sauces')
    ]
  },
  {
    id: 'saffron-risotto', name: 'Saffron risotto', emoji: '🍚', servings: 4,
    description: 'Classic creamy risotto with saffron, white wine and vegetarian hard cheese.',
    collection: 'explore',
    sourceUrl: 'https://www.chefkoch.de/rezepte/1687631277047830/Risotto-alla-milanese.html',
    ingredients: [
      i('sr-rice', 'Risotto rice', 300, 'g', 'Dry goods'),
      i('sr-shallot', 'Shallot', 1, 'piece', 'Vegetables'),
      i('sr-stock', 'Vegetable stock', 1.5, 'l', 'Canned goods'),
      i('sr-butter', 'Butter', 90, 'g', 'Dairy & eggs'),
      i('sr-wine', 'Dry white wine', 100, 'ml', 'Spices & sauces'),
      i('sr-saffron', 'Saffron', 0.5, 'tsp', 'Spices & sauces'),
      i('sr-cheese', 'Vegetarian Italian-style hard cheese', 75, 'g', 'Dairy & eggs'),
      i('sr-salt', 'Salt', 0.5, 'tsp', 'Spices & sauces'),
      i('sr-pepper', 'Black pepper', 0.5, 'tsp', 'Spices & sauces')
    ]
  },
  {
    id: 'mediterranean-stuffed-sweet-potatoes', name: 'Mediterranean stuffed sweet potatoes', emoji: '🍠', servings: 4,
    description: 'Roasted sweet potatoes with spiced chickpeas, hummus sauce and a fresh tomato-herb topping.',
    collection: 'explore',
    sourceUrl: 'https://www.chefkoch.de/rezepte/3291881488754107/Mediterrane-gebackene-Suesskartoffeln-mit-geroesteten-Kichererbsen.html',
    ingredients: [
      i('mssp-sweet-potatoes', 'Sweet potatoes', 600, 'g', 'Vegetables'),
      i('mssp-chickpeas', 'Chickpeas (425 g can)', 1, 'pack', 'Canned goods'),
      i('mssp-oil', 'Olive oil', 2, 'tbsp', 'Spices & sauces'),
      i('mssp-coriander', 'Ground coriander', 0.5, 'tbsp', 'Spices & sauces'),
      i('mssp-cumin', 'Ground cumin', 0.5, 'tbsp', 'Spices & sauces'),
      i('mssp-paprika', 'Smoked paprika', 0.5, 'tbsp', 'Spices & sauces'),
      i('mssp-lemon', 'Lemon', 1, 'piece', 'Fruit'),
      i('mssp-hummus', 'Hummus', 60, 'g', 'Spices & sauces'),
      i('mssp-dill', 'Fresh dill', 1, 'pack', 'Vegetables'),
      i('mssp-garlic', 'Garlic', 3, 'piece', 'Vegetables'),
      i('mssp-almond-milk', 'Unsweetened almond milk', 50, 'ml', 'Dairy & eggs'),
      i('mssp-tomatoes', 'Cherry tomatoes', 50, 'g', 'Vegetables'),
      i('mssp-parsley', 'Fresh parsley', 20, 'g', 'Vegetables'),
      i('mssp-chilli-sauce', 'Chilli-garlic sauce', 1, 'tbsp', 'Spices & sauces'),
      i('mssp-salt', 'Salt', 0.5, 'tsp', 'Spices & sauces'),
      i('mssp-pepper', 'Black pepper', 0.5, 'tsp', 'Spices & sauces')
    ]
  },
  {
    id: 'kidney-bean-cheeseburgers', name: 'Kidney bean cheeseburgers & fries', emoji: '🍔', servings: 4,
    description: 'Crisp kidney bean patties with cheddar and fresh toppings, served with homemade fries.',
    collection: 'old-faithful',
    sourceUrl: 'https://www.chefkoch.de/rezepte/2175571349333216/Vegetarische-Burgerpatties-aus-Kidneybohnen.html',
    ingredients: [
      i('kbc-kidney-beans', 'Kidney beans (400 g can)', 1, 'pack', 'Canned goods'),
      i('kbc-onion', 'Onion', 1, 'piece', 'Vegetables'),
      i('kbc-grated-cheddar', 'Vegetarian grated cheddar', 100, 'g', 'Dairy & eggs'),
      i('kbc-breadcrumbs', 'Breadcrumbs', 100, 'g', 'Dry goods'),
      i('kbc-egg', 'Egg', 1, 'piece', 'Dairy & eggs'),
      i('kbc-flour', 'Flour', 2, 'tbsp', 'Dry goods'),
      i('kbc-oil', 'Vegetable oil', 3, 'tbsp', 'Spices & sauces'),
      i('kbc-salt', 'Salt', 1, 'tsp', 'Spices & sauces'),
      i('kbc-pepper', 'Black pepper', 0.5, 'tsp', 'Spices & sauces'),
      i('kbc-buns', 'Burger buns', 4, 'piece', 'Bakery'),
      i('kbc-tomato', 'Tomato', 2, 'piece', 'Vegetables'),
      i('kbc-cheddar-slices', 'Vegetarian cheddar slices', 4, 'piece', 'Dairy & eggs'),
      i('kbc-ketchup', 'Ketchup', 4, 'tbsp', 'Spices & sauces'),
      i('kbc-potatoes', 'Potatoes', 800, 'g', 'Vegetables')
    ]
  },
  {
    id: 'brotchen-with-cheese', name: 'Brötchen with cheese', emoji: '🧀', servings: 1,
    description: 'A simple no-cook meal with fresh Brötchen and cheese.',
    collection: 'old-faithful',
    ingredients: [
      i('bwc-rolls', 'Brötchen', 2, 'piece', 'Bakery'),
      i('bwc-cheese', 'Sliced cheese', 60, 'g', 'Dairy & eggs'),
      i('bwc-cucumber', 'Cucumber', 0.5, 'piece', 'Vegetables', true),
      i('bwc-tomatoes', 'Tomatoes', 1, 'piece', 'Vegetables', true),
      i('bwc-grapes', 'Grapes', 100, 'g', 'Fruit', true)
    ]
  },
  {
    id: 'overnight-oats', name: 'Overnight oats', emoji: '🥣', servings: 1,
    description: 'Creamy no-cook oats with seeds, protein powder, berries and fruit.',
    collection: 'old-faithful',
    ingredients: [
      i('oo-oats', 'Oats', 0.5, 'cup', 'Dry goods'),
      i('oo-plant-milk', 'Plant-based milk', 0.75, 'cup', 'Dairy & eggs'),
      i('oo-chia', 'Chia seeds', 1, 'tbsp', 'Dry goods'),
      i('oo-linseed', 'Linseed', 1, 'tbsp', 'Dry goods'),
      i('oo-protein-powder', 'Protein powder', 1, 'tbsp', 'Dry goods'),
      i('oo-frozen-berries', 'Frozen berries', 100, 'g', 'Frozen'),
      i('oo-fruit', 'Fruit', 1, 'piece', 'Fruit')
    ]
  },
  {
    id: 'red-lentil-beetroot-salad', name: 'Red lentil & beetroot salad', emoji: '🥗', servings: 4,
    description: 'Earthy beetroot and warmly spiced red lentils with a honey-mustard vinaigrette.',
    collection: 'explore',
    sourceUrl: 'https://www.chefkoch.de/rezepte/2995931452430804/Rote-Linsen-Salat-mit-Roter-Bete.html',
    imageUrl: 'https://img.chefkoch-cdn.de/rezepte/2995931452430804/bilder/1523305/crop-640x427/rote-linsen-salat-mit-roter-bete.jpg',
    ingredients: [
      i('rlbs-lentils', 'Red lentils', 200, 'g', 'Dry goods'),
      i('rlbs-cumin', 'Ground cumin', 1, 'tsp', 'Spices & sauces'),
      i('rlbs-curry', 'Curry powder', 1, 'tsp', 'Spices & sauces'),
      i('rlbs-stock', 'Vegetable stock', 350, 'ml', 'Canned goods'),
      i('rlbs-spring-onions', 'Spring onions', 4, 'piece', 'Vegetables'),
      i('rlbs-parsley', 'Fresh parsley', 0.5, 'pack', 'Vegetables'),
      i('rlbs-beetroot', 'Cooked beetroot', 400, 'g', 'Vegetables'),
      i('rlbs-mustard', 'Mustard', 1, 'tsp', 'Spices & sauces'),
      i('rlbs-vinegar', 'Apple cider vinegar', 3, 'tbsp', 'Spices & sauces'),
      i('rlbs-oil', 'Olive oil', 4, 'tbsp', 'Spices & sauces'),
      i('rlbs-honey', 'Honey', 1, 'tbsp', 'Spices & sauces'),
      i('rlbs-salt', 'Salt', 0.5, 'tsp', 'Spices & sauces'),
      i('rlbs-pepper', 'Black pepper', 0.25, 'tsp', 'Spices & sauces')
    ]
  }
]

const starterMetadata: Record<string, Pick<Recipe, 'tags' | 'healthiness' | 'nutritionPerServing'>> = {
  'lentil-curry': { tags: ['vegetarian', 'indian-inspired', 'curry', 'one-pot'], healthiness: 'balanced', nutritionPerServing: { caloriesKcal: 545, proteinG: 20, carbsG: 58, fatG: 25, sugarG: 9, fiberG: 13, estimated: true } },
  'lemon-pasta': { tags: ['vegetarian', 'italian-inspired', 'pasta', 'quick'], healthiness: 'balanced', nutritionPerServing: { caloriesKcal: 610, proteinG: 25, carbsG: 91, fatG: 17, sugarG: 8, fiberG: 8, estimated: true } },
  tacos: { tags: ['vegetarian', 'mexican-inspired', 'tacos', 'quick'], healthiness: 'healthy', nutritionPerServing: { caloriesKcal: 500, proteinG: 19, carbsG: 70, fatG: 18, sugarG: 7, fiberG: 14, estimated: true } },
  soup: { tags: ['vegetarian', 'soup', 'one-pot', 'high-fiber'], healthiness: 'healthy', nutritionPerServing: { caloriesKcal: 455, proteinG: 20, carbsG: 78, fatG: 7, sugarG: 13, fiberG: 15, estimated: true } },
  'harissa-gnocchi': { tags: ['vegetarian', 'mediterranean-inspired', 'one-pan', 'spicy'], healthiness: 'balanced', nutritionPerServing: { caloriesKcal: 650, proteinG: 24, carbsG: 101, fatG: 18, sugarG: 11, fiberG: 10, estimated: true } },
  'sesame-noodles': { tags: ['vegan', 'asian-inspired', 'noodles', 'quick'], healthiness: 'healthy', nutritionPerServing: { caloriesKcal: 510, proteinG: 22, carbsG: 75, fatG: 16, sugarG: 7, fiberG: 10, estimated: true } },
  'green-shakshuka': { tags: ['vegetarian', 'middle-eastern-inspired', 'eggs', 'brunch'], healthiness: 'healthy', nutritionPerServing: { caloriesKcal: 440, proteinG: 28, carbsG: 39, fatG: 20, sugarG: 8, fiberG: 7, estimated: true } },
  'aubergine-ragu': { tags: ['vegetarian', 'italian-inspired', 'pasta', 'high-fiber'], healthiness: 'balanced', nutritionPerServing: { caloriesKcal: 570, proteinG: 23, carbsG: 94, fatG: 13, sugarG: 16, fiberG: 12, estimated: true } },
  'halloumi-traybake': { tags: ['vegetarian', 'mediterranean-inspired', 'traybake'], healthiness: 'indulgent', nutritionPerServing: { caloriesKcal: 690, proteinG: 33, carbsG: 72, fatG: 31, sugarG: 10, fiberG: 8, estimated: true } },
  'cheese-pepper-enchiladas': { tags: ['vegetarian', 'mexican-inspired', 'enchiladas', 'baked'], healthiness: 'indulgent', nutritionPerServing: { caloriesKcal: 918, proteinG: 40, carbsG: 74, fatG: 51, sugarG: 18, fiberG: 6, saturatedFatG: 27, sodiumMg: 1400, estimated: true } },
  'chili-sin-carne': { tags: ['vegan', 'tex-mex', 'chili', 'one-pot', 'high-fiber'], healthiness: 'healthy', nutritionPerServing: { caloriesKcal: 505, proteinG: 30, carbsG: 68, fatG: 12, sugarG: 14, fiberG: 20, saturatedFatG: 2, sodiumMg: 900, estimated: true } },
  'falafel-pitas': { tags: ['vegan', 'middle-eastern-inspired', 'falafel', 'quick', 'high-fiber'], healthiness: 'balanced', nutritionPerServing: { caloriesKcal: 545, proteinG: 18, carbsG: 69, fatG: 21, sugarG: 8, fiberG: 10, saturatedFatG: 3, sodiumMg: 850, estimated: true } },
  'saffron-risotto': { tags: ['vegetarian', 'italian', 'risotto', 'gluten-free'], healthiness: 'indulgent', nutritionPerServing: { caloriesKcal: 555, proteinG: 13, carbsG: 70, fatG: 24, sugarG: 3, fiberG: 2, saturatedFatG: 15, sodiumMg: 950, estimated: true } },
  'mediterranean-stuffed-sweet-potatoes': { tags: ['vegan', 'mediterranean-inspired', 'traybake', 'high-fiber'], healthiness: 'healthy', nutritionPerServing: { caloriesKcal: 397, proteinG: 13, carbsG: 64, fatG: 9, sugarG: 12, fiberG: 11, saturatedFatG: 1, sodiumMg: 500, estimated: true } },
  'kidney-bean-cheeseburgers': { tags: ['vegetarian', 'burger', 'high-fiber'], healthiness: 'balanced', nutritionPerServing: { caloriesKcal: 850, proteinG: 34, carbsG: 114, fatG: 30, sugarG: 14, fiberG: 15, saturatedFatG: 10, sodiumMg: 1450, estimated: true } },
  'brotchen-with-cheese': { tags: ['vegetarian', 'quick', 'no-cook'], healthiness: 'balanced', nutritionPerServing: { caloriesKcal: 510, proteinG: 25, carbsG: 58, fatG: 19, sugarG: 4, fiberG: 3, saturatedFatG: 12, sodiumMg: 950, estimated: true } },
  'overnight-oats': { tags: ['vegetarian', 'breakfast', 'no-cook', 'high-fiber', 'high-protein'], healthiness: 'healthy', nutritionPerServing: { caloriesKcal: 510, proteinG: 25, carbsG: 74, fatG: 15, sugarG: 22, fiberG: 18, saturatedFatG: 2, sodiumMg: 250, estimated: true } },
  'red-lentil-beetroot-salad': { tags: ['vegetarian', 'salad', 'gluten-free', 'high-fiber'], healthiness: 'healthy', nutritionPerServing: { caloriesKcal: 354, proteinG: 14.5, carbsG: 35.9, fatG: 16.5, sugarG: 12, fiberG: 9, saturatedFatG: 2.2, sodiumMg: 450, estimated: true } }
}

const starterInstructions: Record<string, string[]> = {
  'lentil-curry': ['Soften the chopped onion in a little oil.', 'Stir in garlic and curry powder, then add the lentils, tomatoes and coconut milk.', 'Simmer for 20–25 minutes until the lentils are tender.', 'Fold in the spinach and season before serving.'],
  'lemon-pasta': ['Cook the pasta until al dente, adding the peas for the final 3 minutes.', 'Mix the ricotta, lemon zest, lemon juice and parmesan in a large bowl.', 'Reserve a mug of pasta water, then drain the pasta and peas.', 'Toss everything together, loosening with pasta water until glossy.'],
  tacos: ['Warm the drained black beans with a pinch of salt and your favourite spices.', 'Shred the romaine lettuce and toss it with lime juice just before serving.', 'Warm the tortillas in a dry pan.', 'Fill with beans, lettuce, sliced avocado and yogurt.'],
  soup: ['Soften the chopped onion and carrots in a large pot.', 'Add the tomatoes and drained white beans with 500 ml water.', 'Simmer for 20 minutes, then crush some beans to thicken the soup.', 'Season well and serve with toasted sourdough.'],
  'harissa-gnocchi': ['Heat the oven to 220°C and toss the gnocchi, chickpeas and tomatoes with harissa and oil.', 'Roast on a large tray for 20 minutes.', 'Turn everything, crumble over the feta and roast for 8–10 minutes more.', 'Serve when the gnocchi is crisp and the tomatoes have burst.'],
  'sesame-noodles': ['Cook the soba noodles and edamame, then rinse under cold water.', 'Whisk the soy sauce and sesame oil with a splash of water.', 'Cut the cucumber and carrots into thin strips.', 'Toss the noodles, vegetables and dressing together.'],
  'green-shakshuka': ['Soften the sliced leeks in an ovenproof pan.', 'Add the spinach in batches and cook until wilted.', 'Make eight wells, crack in the eggs and bake at 190°C until just set.', 'Top with herbs and yogurt and serve with warm flatbread.'],
  'aubergine-ragu': ['Brown the diced aubergine in batches until deeply golden.', 'Soften the onion, add garlic and return the aubergine to the pan.', 'Add the tomatoes and simmer for 25 minutes.', 'Toss with cooked rigatoni and finish with parmesan.'],
  'halloumi-traybake': ['Heat the oven to 220°C and roast the chopped peppers and courgettes for 15 minutes.', 'Add sliced halloumi and roast for another 15 minutes until golden.', 'Prepare the couscous according to the packet.', 'Fluff with lemon juice and fold through the roasted vegetables and halloumi.'],
  'cheese-pepper-enchiladas': [
    'Finely chop the onions and peppers. Soften the onions in the oil, add the peppers and cook for about 10 minutes; season and allow to cool.',
    'For the sauce, simmer 4 tbsp of the pepper mixture with the passata, chopped chillies, 1 tbsp crème fraîche and crushed garlic for 15 minutes. Season with salt, pepper, sugar and lemon juice.',
    'Mix the remaining crème fraîche with 320 g grated cheese and the cooled vegetables.',
    'Spread a little sauce in a baking dish. Fill and roll the tortillas, then place them seam-side down in the dish.',
    'Cover with the remaining sauce and 80 g cheese, then bake at 180°C for 25–30 minutes.'
  ],
  'chili-sin-carne': [
    'Chop the onion and garlic and soften them in the oil in a large pot.',
    'Cut the potatoes into small cubes. Add them with the rinsed red lentils and vegetable stock, then simmer for 20–25 minutes until tender.',
    'Drain the kidney beans and corn. Stir them into the pot with the passata and heat through.',
    'Season generously with curry powder, paprika, chilli, salt and black pepper; simmer briefly until thick.'
  ],
  'falafel-pitas': [
    'Cook the ready-made falafel according to the packet instructions until hot and crisp.',
    'Stir the tahini with lemon juice and enough water to make a pourable sauce, then season with salt and black pepper.',
    'Chop the tomato, cucumber and parsley, and warm the pita breads.',
    'Fill each pita with falafel and salad, then spoon over the lemon-tahini sauce.'
  ],
  'saffron-risotto': [
    'Keep the vegetable stock hot in a separate saucepan. Gently soften the finely chopped shallot in 40 g butter without browning.',
    'Add the rice and stir until every grain is glossy. Pour in the wine and let it evaporate completely.',
    'Steep the saffron in 1 tbsp warm water, then add it to the rice. Add the hot stock one ladle at a time, stirring and allowing each addition to absorb.',
    'After 17–18 minutes, when the rice is creamy but still has bite, remove it from the heat and rest for 1 minute.',
    'Beat in the remaining cold butter and grated vegetarian hard cheese, season, and serve immediately.'
  ],
  'mediterranean-stuffed-sweet-potatoes': [
    'Heat the oven to 200°C. Halve the sweet potatoes lengthwise.',
    'Drain and dry the chickpeas, then toss them with the olive oil, coriander, cumin and paprika. Rub the sweet potatoes with a little of the seasoned oil and salt.',
    'Roast the sweet potatoes cut-side down with the chickpeas for about 25 minutes, until the potatoes are soft and the chickpeas are golden.',
    'Mix the hummus with dill, half the lemon juice and chopped garlic; loosen with almond milk or water and season.',
    'Mix the tomatoes and parsley with the remaining lemon juice and chilli-garlic sauce.',
    'Rough up the sweet-potato flesh with a fork, then top with chickpeas, hummus sauce and tomato-herb topping.'
  ],
  'kidney-bean-cheeseburgers': [
    'Heat the oven to 220°C (200°C fan). Cut the potatoes into fries, toss with 2 tbsp vegetable oil and some of the salt, then bake for 30–35 minutes, turning once, until browned and crisp.',
    'Drain and rinse the kidney beans thoroughly, then mash them in a bowl with a fork.',
    'Finely chop half of the onion. Mix it into the beans with the grated cheese, breadcrumbs and egg, then season with the remaining salt and black pepper.',
    'Dust your hands with the flour and shape the mixture into 4 large patties.',
    'Heat 1 tbsp vegetable oil in a frying pan. Cook the patties for 8–10 minutes, turning once, until deeply browned on both sides.',
    'Slice the tomato and remaining onion. Toast the burger buns briefly, then assemble each with a bean patty, cheddar slice, tomato, onion and ketchup. Serve with the fries.'
  ],
  'brotchen-with-cheese': ['Slice the Brötchen and fill them with cheese.', 'Serve with any optional cucumber, tomato or grapes you already have or would like to add.'],
  'overnight-oats': ['Stir the oats, plant-based milk, chia seeds, linseed and protein powder together in a jar or bowl.', 'Fold in the frozen berries, cover and refrigerate overnight.', 'Top with the fruit before eating; add a splash of plant-based milk if the oats are too thick.'],
  'red-lentil-beetroot-salad': [
    'Heat 1 tbsp olive oil in a saucepan. Add the red lentils, cumin and curry powder and cook briefly, stirring.',
    'Pour in the vegetable stock and simmer for 8–10 minutes, until the lentils are just tender but still hold their shape. Drain well and leave to cool.',
    'Drain and dice the cooked beetroot. Slice the spring onions into rings and roughly chop the parsley leaves.',
    'Whisk the mustard, honey, apple cider vinegar, salt and black pepper together, then gradually whisk in the remaining 3 tbsp olive oil.',
    'Combine the lentils, beetroot and spring onions. Fold through the dressing and parsley, then adjust the salt and pepper to taste.'
  ]
}

const timeEstimate = (totalTimeMinutes: number): Pick<Recipe, 'totalTimeMinutes' | 'timeCategory'> => ({
  totalTimeMinutes,
  timeCategory: timeCategoryFor(totalTimeMinutes)
})

const starterTimes: Record<string, Pick<Recipe, 'totalTimeMinutes' | 'timeCategory'>> = {
  'lentil-curry': timeEstimate(35),
  'lemon-pasta': timeEstimate(25),
  tacos: timeEstimate(20),
  soup: timeEstimate(35),
  'harissa-gnocchi': timeEstimate(35),
  'sesame-noodles': timeEstimate(25),
  'green-shakshuka': timeEstimate(35),
  'aubergine-ragu': timeEstimate(45),
  'halloumi-traybake': timeEstimate(40),
  'cheese-pepper-enchiladas': timeEstimate(60),
  'chili-sin-carne': timeEstimate(45),
  'falafel-pitas': timeEstimate(20),
  'saffron-risotto': timeEstimate(35),
  'mediterranean-stuffed-sweet-potatoes': timeEstimate(30),
  'kidney-bean-cheeseburgers': timeEstimate(45),
  'brotchen-with-cheese': timeEstimate(5),
  'overnight-oats': timeEstimate(15),
  'red-lentil-beetroot-salad': timeEstimate(45)
}

export const starterRecipes: Recipe[] = starterRecipeBasics.map((recipe) => ({ ...recipe, ...starterMetadata[recipe.id], ...starterTimes[recipe.id], instructions: starterInstructions[recipe.id] }))

const RETIRED_RECIPE_IDS = new Set(['sheet-pan', 'salmon', 'chicken-orzo'])
const REFRESHED_RECIPE_IDS = new Set(['tacos', 'soup', 'falafel-pitas'])

export const CATALOG_VERSION = 12

export function migrateRecipeCatalog(state: AppState): AppState {
  if ((state.catalogVersion ?? 0) >= CATALOG_VERSION) return state
  const retainedRecipes = state.recipes.filter((recipe) => !RETIRED_RECIPE_IDS.has(recipe.id))
  const known = new Set(retainedRecipes.map((recipe) => recipe.id))
  const starters = new Map(starterRecipes.map((recipe) => [recipe.id, recipe]))
  const recipes = [
    ...retainedRecipes.map((recipe) => {
      const starter = starters.get(recipe.id)
      if (starter && REFRESHED_RECIPE_IDS.has(recipe.id)) return starter
      return {
        ...recipe,
        collection: recipe.collection ?? starter?.collection ?? 'explore' as const,
        tags: recipe.tags ?? starter?.tags ?? [],
        healthiness: recipe.healthiness ?? starter?.healthiness ?? 'balanced' as const,
        totalTimeMinutes: recipe.id === 'overnight-oats' ? starter?.totalTimeMinutes : recipe.totalTimeMinutes ?? starter?.totalTimeMinutes,
        timeCategory: recipe.id === 'overnight-oats' ? starter?.timeCategory : recipe.timeCategory ?? starter?.timeCategory,
        nutritionPerServing: recipe.nutritionPerServing ?? starter?.nutritionPerServing,
        instructions: recipe.instructions?.length ? recipe.instructions : starter?.instructions
      }
    }),
    ...starterRecipes.filter((recipe) => !known.has(recipe.id))
  ]
  const plan = state.plan.filter((meal) => !RETIRED_RECIPE_IDS.has(meal.recipeId))
  // A schema/catalog migration is deterministic normalization, not a user
  // edit. Preserve the source timestamp so sync conflict resolution compares
  // the actual edits instead of making every migrated remote read look newest.
  return { ...state, recipes, plan, catalogVersion: CATALOG_VERSION }
}

function mondayIso(): string {
  const date = new Date()
  const day = date.getDay() || 7
  date.setDate(date.getDate() - day + 1)
  return date.toISOString().slice(0, 10)
}

export const initialState: AppState = {
  recipes: starterRecipes,
  plan: [],
  shoppingList: [],
  weekStart: mondayIso(),
  // Pristine seed data must always lose to a real synchronized household state.
  updatedAt: '1970-01-01T00:00:00.000Z',
  catalogVersion: CATALOG_VERSION
}
