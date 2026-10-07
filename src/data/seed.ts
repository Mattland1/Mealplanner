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
      i('lp-parmesan', 'Parmesan', 80, 'g', 'Dairy & eggs')
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
      i('hg-feta', 'Feta', 200, 'g', 'Dairy & eggs'),
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
      i('ar-parmesan', 'Parmesan', 80, 'g', 'Dairy & eggs')
    ]
  },
  {
    id: 'halloumi-traybake', name: 'Halloumi couscous traybake', emoji: '🫑', servings: 4,
    description: 'Golden halloumi, peppers and fluffy herbed couscous.',
    collection: 'explore',
    ingredients: [
      i('ht-halloumi', 'Halloumi', 450, 'g', 'Dairy & eggs'),
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
      i('cpe-cheese', 'Grated cheese', 400, 'g', 'Dairy & eggs'),
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
    description: 'Classic creamy risotto with saffron, white wine and Parmesan.',
    collection: 'explore',
    sourceUrl: 'https://www.chefkoch.de/rezepte/1687631277047830/Risotto-alla-milanese.html',
    ingredients: [
      i('sr-rice', 'Risotto rice', 300, 'g', 'Dry goods'),
      i('sr-shallot', 'Shallot', 1, 'piece', 'Vegetables'),
      i('sr-stock', 'Vegetable stock', 1.5, 'l', 'Canned goods'),
      i('sr-butter', 'Butter', 90, 'g', 'Dairy & eggs'),
      i('sr-wine', 'Dry white wine', 100, 'ml', 'Spices & sauces'),
      i('sr-saffron', 'Saffron', 0.5, 'tsp', 'Spices & sauces'),
      i('sr-cheese', 'Parmesan', 75, 'g', 'Dairy & eggs'),
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
      i('kbc-grated-cheddar', 'Grated cheddar', 100, 'g', 'Dairy & eggs'),
      i('kbc-breadcrumbs', 'Breadcrumbs', 100, 'g', 'Dry goods'),
      i('kbc-egg', 'Egg', 1, 'piece', 'Dairy & eggs'),
      i('kbc-flour', 'Flour', 2, 'tbsp', 'Dry goods'),
      i('kbc-oil', 'Vegetable oil', 3, 'tbsp', 'Spices & sauces'),
      i('kbc-salt', 'Salt', 1, 'tsp', 'Spices & sauces'),
      i('kbc-pepper', 'Black pepper', 0.5, 'tsp', 'Spices & sauces'),
      i('kbc-buns', 'Burger buns', 4, 'piece', 'Bakery'),
      i('kbc-tomato', 'Tomato', 2, 'piece', 'Vegetables'),
      i('kbc-cheddar-slices', 'Cheddar slices', 4, 'piece', 'Dairy & eggs'),
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
  },
  {
    id: 'banana-bread', name: 'Banana bread', emoji: '🍌', servings: 10,
    description: 'A simple, moist family banana loaf with vanilla and a gentle sweetness.',
    collection: 'old-faithful',
    ingredients: [
      i('bb-bananas', 'Ripe bananas', 4, 'piece', 'Fruit'),
      i('bb-butter', 'Butter', 76, 'g', 'Dairy & eggs'),
      i('bb-baking-soda', 'Baking soda', 0.5, 'tsp', 'Dry goods'),
      i('bb-salt', 'Salt', 0.25, 'tsp', 'Spices & sauces'),
      i('bb-sugar', 'Sugar', 75, 'g', 'Dry goods'),
      i('bb-egg', 'Egg', 1, 'piece', 'Dairy & eggs'),
      i('bb-vanilla', 'Vanilla extract', 1, 'tsp', 'Spices & sauces'),
      i('bb-flour', 'Flour', 205, 'g', 'Dry goods')
    ]
  },
  {
    id: 'fudgy-brownies', name: 'Fudgy brownies', emoji: '🍫', servings: 24,
    description: 'Deeply chocolatey traybake brownies with a light crust and a moist centre.',
    collection: 'old-faithful',
    ingredients: [
      i('fb-dark-chocolate', 'Dark chocolate', 600, 'g', 'Dry goods'),
      i('fb-butter', 'Butter', 250, 'g', 'Dairy & eggs'),
      i('fb-sugar', 'Sugar', 280, 'g', 'Dry goods'),
      i('fb-eggs', 'Eggs', 6, 'piece', 'Dairy & eggs'),
      i('fb-vanilla-sugar', 'Vanilla sugar', 1, 'pack', 'Dry goods'),
      i('fb-flour', 'Flour', 280, 'g', 'Dry goods'),
      i('fb-salt', 'Salt', 0.5, 'tsp', 'Spices & sauces'),
      i('fb-baking-powder', 'Baking powder', 0.5, 'pack', 'Dry goods')
    ]
  },
  {
    id: 'andis-potatoes', name: 'Mashed potatoes', emoji: '🥔', servings: 4,
    description: 'Simple, fluffy mashed potatoes with butter and warm milk, plus optional creamy enrichments.',
    collection: 'old-faithful',
    ingredients: [
      i('ap-potatoes', 'Potatoes', 900, 'g', 'Vegetables'),
      i('ap-milk', 'Milk', 150, 'ml', 'Dairy & eggs'),
      i('ap-butter', 'Butter', 30, 'g', 'Dairy & eggs'),
      i('ap-cream-cheese', 'Cream cheese', 100, 'g', 'Dairy & eggs', true),
      i('ap-sour-cream', 'Sour cream', 100, 'g', 'Dairy & eggs', true),
      i('ap-salt', 'Salt', 0.5, 'tsp', 'Spices & sauces')
    ]
  },
  {
    id: 'andis-corn', name: "Andi's corn", emoji: '🌽', servings: 4,
    description: 'Sweetcorn, onion and pepper in a creamy sauce finished with parmesan.',
    collection: 'old-faithful',
    ingredients: [
      i('ac-butter', 'Butter', 15, 'g', 'Dairy & eggs'),
      i('ac-onion', 'Onion', 1, 'piece', 'Vegetables'),
      i('ac-garlic', 'Garlic', 3, 'piece', 'Vegetables'),
      i('ac-bell-pepper', 'Bell pepper', 1, 'piece', 'Vegetables'),
      i('ac-sweetcorn', 'Sweetcorn', 600, 'g', 'Frozen'),
      i('ac-cream', 'Double cream', 200, 'ml', 'Dairy & eggs'),
      i('ac-salt', 'Salt', 0.5, 'tsp', 'Spices & sauces'),
      i('ac-black-pepper', 'Black pepper', 0.25, 'tsp', 'Spices & sauces'),
      i('ac-parmesan', 'Parmesan', 50, 'g', 'Dairy & eggs')
    ]
  },
  {
    id: 'chocolate-zucchini-bread', name: 'Chocolate zucchini bread', emoji: '🍞', servings: 20,
    description: 'Two warmly spiced zucchini loaves with bittersweet chocolate chunks.',
    collection: 'old-faithful',
    ingredients: [
      i('czb-flour', 'Flour', 2, 'cup', 'Dry goods'),
      i('czb-sugar', 'Sugar', 1.5, 'cup', 'Dry goods'),
      i('czb-baking-soda', 'Baking soda', 2, 'tsp', 'Dry goods'),
      i('czb-cinnamon', 'Ground cinnamon', 1, 'tbsp', 'Spices & sauces'),
      i('czb-salt', 'Salt', 1, 'tsp', 'Spices & sauces'),
      i('czb-eggs', 'Eggs', 3, 'piece', 'Dairy & eggs'),
      i('czb-zucchini', 'Zucchini', 2, 'cup', 'Vegetables'),
      i('czb-oil', 'Vegetable oil', 0.75, 'cup', 'Spices & sauces'),
      i('czb-vanilla', 'Vanilla extract', 1, 'tbsp', 'Spices & sauces'),
      i('czb-chocolate', 'Bittersweet chocolate', 100, 'g', 'Dry goods'),
      i('czb-nuts', 'Chopped nuts', 1.5, 'cup', 'Dry goods', true)
    ]
  },
  {
    id: 'baked-mushroom-brown-rice-risotto', name: 'Baked mushroom brown-rice risotto', emoji: '🍄', servings: 6,
    description: 'Creamy oven-baked brown-rice risotto with mushrooms, Parmesan and fresh oregano.',
    collection: 'old-faithful',
    sourceUrl: 'https://cookieandkate.com/easy-brown-rice-risotto-with-mushrooms-and-fresh-oregano/',
    ingredients: [
      i('bmrr-olive-oil', 'Olive oil', 3, 'tbsp', 'Spices & sauces'),
      i('bmrr-onion', 'Yellow onion', 1, 'piece', 'Vegetables'),
      i('bmrr-garlic', 'Garlic', 2, 'piece', 'Vegetables'),
      i('bmrr-stock', 'Vegetable stock', 1.2, 'l', 'Canned goods'),
      i('bmrr-rice', 'Brown arborio rice', 1.5, 'cup', 'Dry goods'),
      i('bmrr-mushrooms', 'Cremini mushrooms', 370, 'g', 'Vegetables'),
      i('bmrr-cheese', 'Parmesan', 100, 'g', 'Dairy & eggs'),
      i('bmrr-wine', 'Dry white wine', 120, 'ml', 'Spices & sauces', true),
      i('bmrr-butter', 'Unsalted butter', 42, 'g', 'Dairy & eggs'),
      i('bmrr-tamari', 'Tamari', 2, 'tsp', 'Spices & sauces', true),
      i('bmrr-salt', 'Salt', 1, 'tsp', 'Spices & sauces'),
      i('bmrr-pepper', 'Black pepper', 0.5, 'tsp', 'Spices & sauces'),
      i('bmrr-oregano', 'Fresh oregano', 0.25, 'pack', 'Vegetables')
    ]
  },
  {
    id: 'vegetarian-caesar-wraps', name: 'Vegetarian Caesar wraps', emoji: '🥬', servings: 6,
    description: 'Crunchy romaine, croutons and Parmesan in a creamy yogurt Caesar dressing, rolled into wraps or served as a salad.',
    collection: 'old-faithful',
    ingredients: [
      i('vcw-garlic', 'Garlic', 2, 'piece', 'Vegetables'),
      i('vcw-mayonnaise', 'Mayonnaise', 100, 'g', 'Spices & sauces'),
      i('vcw-yogurt', 'Plain yogurt', 200, 'g', 'Dairy & eggs'),
      i('vcw-mustard', 'Mustard', 2, 'tsp', 'Spices & sauces'),
      i('vcw-lemon-juice', 'Lemon juice', 2, 'tbsp', 'Spices & sauces'),
      i('vcw-worcestershire', 'Vegetarian Worcestershire sauce', 1, 'tsp', 'Spices & sauces'),
      i('vcw-salt', 'Salt', 0.25, 'tsp', 'Spices & sauces'),
      i('vcw-pepper', 'Black pepper', 0.25, 'tsp', 'Spices & sauces'),
      i('vcw-romaine', 'Romaine lettuce hearts', 3, 'piece', 'Vegetables'),
      i('vcw-croutons', 'Croutons', 150, 'g', 'Bakery'),
      i('vcw-cheese', 'Parmesan', 90, 'g', 'Dairy & eggs'),
      i('vcw-tortillas', 'Large flour tortillas', 6, 'piece', 'Bakery')
    ]
  },
  {
    id: 'thai-red-curry', name: 'Thai red curry with vegetables', emoji: '🍛', servings: 4,
    description: 'A fragrant coconut red curry with peppers and carrots, served over brown jasmine rice.',
    collection: 'old-faithful',
    sourceUrl: 'https://cookieandkate.com/thai-red-curry-recipe/',
    ingredients: [
      i('trc-rice', 'Brown jasmine rice', 1.25, 'cup', 'Dry goods'),
      i('trc-oil', 'Coconut oil', 1, 'tbsp', 'Spices & sauces'),
      i('trc-onion', 'White onion', 1, 'piece', 'Vegetables'),
      i('trc-salt', 'Salt', 0.25, 'tsp', 'Spices & sauces'),
      i('trc-ginger', 'Fresh ginger', 1, 'tbsp', 'Vegetables'),
      i('trc-garlic', 'Garlic', 2, 'piece', 'Vegetables'),
      i('trc-red-pepper', 'Red bell pepper', 1, 'piece', 'Vegetables'),
      i('trc-second-pepper', 'Yellow or orange bell pepper', 1, 'piece', 'Vegetables'),
      i('trc-carrots', 'Carrots', 3, 'piece', 'Vegetables'),
      i('trc-curry-paste', 'Vegetarian Thai red curry paste', 2, 'tbsp', 'Spices & sauces'),
      i('trc-coconut-milk', 'Coconut milk (400 ml can)', 1, 'pack', 'Canned goods'),
      i('trc-sugar', 'Brown sugar', 1.5, 'tsp', 'Dry goods'),
      i('trc-tamari', 'Tamari', 1, 'tbsp', 'Spices & sauces'),
      i('trc-vinegar', 'Rice vinegar', 2, 'tsp', 'Spices & sauces'),
      i('trc-herbs', 'Fresh basil or coriander', 1, 'pack', 'Vegetables', true),
      i('trc-chilli-flakes', 'Red pepper flakes', 0.25, 'tsp', 'Spices & sauces', true),
      i('trc-sriracha', 'Sriracha', 1, 'tsp', 'Spices & sauces', true)
    ]
  },
  {
    id: 'sesame-garlic-ramen', name: 'Sesame garlic ramen noodles', emoji: '🍜', servings: 4,
    description: 'Fast ramen noodles tossed in a glossy sesame, garlic and ginger sauce.',
    collection: 'old-faithful',
    sourceUrl: 'https://themodernproper.com/sesame-garlic-ramen-noodles',
    ingredients: [
      i('sgr-ramen', 'Instant ramen noodles', 3, 'pack', 'Dry goods'),
      i('sgr-soy-sauce', 'Low-sodium soy sauce', 0.25, 'cup', 'Spices & sauces'),
      i('sgr-oyster-sauce', 'Vegetarian oyster sauce', 0.25, 'cup', 'Spices & sauces'),
      i('sgr-rice-vinegar', 'Rice vinegar', 1, 'tbsp', 'Spices & sauces'),
      i('sgr-brown-sugar', 'Brown sugar', 1, 'tbsp', 'Dry goods', true),
      i('sgr-chilli-sauce', 'Sriracha or sambal', 0.75, 'tsp', 'Spices & sauces'),
      i('sgr-sesame-oil', 'Toasted sesame oil', 2, 'tbsp', 'Spices & sauces'),
      i('sgr-garlic', 'Garlic', 4, 'piece', 'Vegetables'),
      i('sgr-ginger', 'Fresh ginger', 1, 'tsp', 'Vegetables'),
      i('sgr-spring-onions', 'Spring onions', 4, 'piece', 'Vegetables'),
      i('sgr-sesame-seeds', 'Sesame seeds', 1, 'tsp', 'Dry goods')
    ]
  },
  {
    id: 'flaky-biscuits', name: 'Flaky biscuits', emoji: '🧈', servings: 6,
    description: 'Tall, tender folded biscuits made with frozen butter and very cold milk.',
    collection: 'old-faithful',
    ingredients: [
      i('flb-flour', 'Flour', 250, 'g', 'Dry goods'),
      i('flb-baking-powder', 'Baking powder', 1, 'tbsp', 'Dry goods'),
      i('flb-sugar', 'Sugar', 1, 'tbsp', 'Dry goods'),
      i('flb-salt', 'Salt', 1, 'tsp', 'Spices & sauces'),
      i('flb-butter', 'Unsalted butter', 85, 'g', 'Dairy & eggs'),
      i('flb-milk', 'Whole milk', 177, 'ml', 'Dairy & eggs')
    ]
  },
  {
    id: 'creamy-plant-based-bolognese', name: 'Creamy plant-based bolognese', emoji: '🍝', servings: 4,
    description: 'A creamy tomato and ajvar spaghetti sauce with fake meat, carrots and parmesan.',
    collection: 'old-faithful',
    ingredients: [
      i('cpb-mince', 'Fake meat', 300, 'g', 'Other'),
      i('cpb-onion', 'Onion', 1, 'piece', 'Vegetables'),
      i('cpb-garlic', 'Garlic', 4, 'piece', 'Vegetables'),
      i('cpb-carrots', 'Carrots', 4, 'piece', 'Vegetables'),
      i('cpb-tomatoes', 'Crushed tomatoes (400 g can)', 1, 'pack', 'Canned goods'),
      i('cpb-ajvar', 'Ajvar', 1, 'tbsp', 'Spices & sauces'),
      i('cpb-cream', 'Single cream', 100, 'ml', 'Dairy & eggs'),
      i('cpb-salt', 'Salt', 0.5, 'tsp', 'Spices & sauces'),
      i('cpb-pepper', 'Black pepper', 0.5, 'tsp', 'Spices & sauces'),
      i('cpb-chilli-flakes', 'Red pepper flakes', 0.25, 'tsp', 'Spices & sauces'),
      i('cpb-cheese', 'Parmesan', 50, 'g', 'Dairy & eggs'),
      i('cpb-spaghetti', 'Spaghetti', 250, 'g', 'Dry goods')
    ]
  },
  {
    id: 'air-fryer-chocolate-chip-cookies', name: 'Air-fryer chocolate-chip cookies', emoji: '🍪', servings: 12,
    description: 'Soft-centred chocolate-chip cookies cooked in small batches in the air fryer.',
    collection: 'old-faithful',
    ingredients: [
      i('afc-butter', 'Unsalted butter', 113, 'g', 'Dairy & eggs'),
      i('afc-brown-sugar', 'Brown sugar', 100, 'g', 'Dry goods'),
      i('afc-white-sugar', 'Sugar', 50, 'g', 'Dry goods'),
      i('afc-egg', 'Egg', 1, 'piece', 'Dairy & eggs'),
      i('afc-vanilla', 'Vanilla extract', 1, 'tsp', 'Spices & sauces'),
      i('afc-flour', 'Flour', 180, 'g', 'Dry goods'),
      i('afc-cornstarch', 'Cornstarch', 1, 'tbsp', 'Dry goods'),
      i('afc-baking-soda', 'Baking soda', 1, 'tsp', 'Dry goods'),
      i('afc-salt', 'Salt', 0.25, 'tsp', 'Spices & sauces'),
      i('afc-chocolate', 'Semi-sweet chocolate chips', 130, 'g', 'Dry goods')
    ]
  },
  {
    id: 'cowboy-caviar', name: 'Cowboy caviar', emoji: '🥑', servings: 12,
    description: 'A fresh bean, corn, tomato and avocado dip with a lively lime vinaigrette.',
    collection: 'old-faithful',
    sourceUrl: 'https://www.spendwithpennies.com/cowboy-caviar/',
    ingredients: [
      i('cc-tomatoes', 'Roma tomatoes', 3, 'piece', 'Vegetables'),
      i('cc-avocados', 'Avocados', 2, 'piece', 'Vegetables'),
      i('cc-red-onion', 'Red onion', 0.5, 'piece', 'Vegetables'),
      i('cc-black-beans', 'Black beans (425 g can)', 1, 'pack', 'Canned goods'),
      i('cc-black-eyed-peas', 'Black-eyed peas (425 g can)', 1, 'pack', 'Canned goods'),
      i('cc-corn', 'Frozen sweetcorn', 1.5, 'cup', 'Frozen'),
      i('cc-bell-pepper', 'Bell pepper', 1, 'piece', 'Vegetables'),
      i('cc-jalapeno', 'Jalapeño', 1, 'piece', 'Vegetables'),
      i('cc-coriander', 'Fresh coriander', 0.5, 'pack', 'Vegetables'),
      i('cc-olive-oil', 'Olive oil', 0.33, 'cup', 'Spices & sauces'),
      i('cc-lime-juice', 'Lime juice', 2, 'tbsp', 'Spices & sauces'),
      i('cc-red-wine-vinegar', 'Red wine vinegar', 2, 'tbsp', 'Spices & sauces'),
      i('cc-sugar', 'Sugar', 1, 'tsp', 'Dry goods'),
      i('cc-salt', 'Salt', 0.5, 'tsp', 'Spices & sauces'),
      i('cc-pepper', 'Black pepper', 0.5, 'tsp', 'Spices & sauces'),
      i('cc-garlic-powder', 'Garlic powder', 0.25, 'tsp', 'Spices & sauces'),
      i('cc-tortilla-chips', 'Tortilla chips', 300, 'g', 'Dry goods', true)
    ]
  },
  {
    id: 'couscous-feta-stuffed-peppers', name: 'Couscous & feta stuffed peppers', emoji: '🫑', servings: 4,
    description: 'Roasted red peppers filled with turmeric couscous, spinach, garlic and feta.',
    collection: 'old-faithful',
    ingredients: [
      i('cfsp-peppers', 'Red bell peppers', 4, 'piece', 'Vegetables'),
      i('cfsp-spinach', 'Baby spinach', 200, 'g', 'Vegetables'),
      i('cfsp-feta', 'Feta', 200, 'g', 'Dairy & eggs'),
      i('cfsp-couscous', 'Couscous', 200, 'g', 'Dry goods'),
      i('cfsp-onion', 'Onion', 1, 'piece', 'Vegetables'),
      i('cfsp-garlic', 'Garlic', 3, 'piece', 'Vegetables'),
      i('cfsp-turmeric', 'Ground turmeric', 2, 'tsp', 'Spices & sauces'),
      i('cfsp-olive-oil', 'Olive oil', 1, 'tbsp', 'Spices & sauces'),
      i('cfsp-salt', 'Salt', 0.5, 'tsp', 'Spices & sauces'),
      i('cfsp-pepper', 'Black pepper', 0.25, 'tsp', 'Spices & sauces')
    ]
  },
  {
    id: 'sweet-potato-avocado-hash', name: 'Sweet-potato avocado hash with eggs', emoji: '🍳', servings: 2,
    description: 'Crispy sweet-potato and onion hash topped with eggs and smashed lime-garlic avocado.',
    collection: 'old-faithful',
    ingredients: [
      i('spah-avocados', 'Avocados', 2, 'piece', 'Vegetables'),
      i('spah-lime', 'Lime', 1, 'piece', 'Fruit'),
      i('spah-garlic', 'Garlic', 1, 'piece', 'Vegetables'),
      i('spah-olive-oil', 'Olive oil', 1.5, 'tbsp', 'Spices & sauces'),
      i('spah-onion', 'Onion', 1, 'piece', 'Vegetables'),
      i('spah-sweet-potatoes', 'Sweet potatoes', 2, 'piece', 'Vegetables'),
      i('spah-eggs', 'Eggs', 4, 'piece', 'Dairy & eggs'),
      i('spah-chilli-flakes', 'Red pepper flakes', 0.25, 'tsp', 'Spices & sauces'),
      i('spah-sriracha', 'Sriracha', 2, 'tsp', 'Spices & sauces'),
      i('spah-salt', 'Salt', 0.5, 'tsp', 'Spices & sauces'),
      i('spah-pepper', 'Black pepper', 0.25, 'tsp', 'Spices & sauces')
    ]
  },
  {
    id: 'vegetarian-burritos', name: 'Vegetarian burritos', emoji: '🌯', servings: 4,
    description: 'Hearty burritos packed with seasoned fake meat, black beans, rice, cheese and fresh guacamole.',
    collection: 'old-faithful',
    ingredients: [
      i('vb-tortillas', 'Large flour tortillas', 4, 'piece', 'Bakery'),
      i('vb-rice', 'Long-grain rice', 160, 'g', 'Dry goods'),
      i('vb-black-beans', 'Black beans (400 g can)', 1, 'pack', 'Canned goods'),
      i('vb-plant-mince', 'Fake meat', 250, 'g', 'Other'),
      i('vb-cheese', 'Grated cheese', 120, 'g', 'Dairy & eggs'),
      i('vb-avocados', 'Avocados', 2, 'piece', 'Vegetables'),
      i('vb-tomatoes', 'Tomatoes', 2, 'piece', 'Vegetables'),
      i('vb-red-onion', 'Red onion', 1, 'piece', 'Vegetables'),
      i('vb-lime', 'Lime', 1, 'piece', 'Fruit'),
      i('vb-garlic', 'Garlic', 1, 'piece', 'Vegetables'),
      i('vb-coriander', 'Fresh coriander', 0.5, 'pack', 'Vegetables'),
      i('vb-oil', 'Vegetable oil', 1, 'tbsp', 'Spices & sauces'),
      i('vb-taco-seasoning', 'Taco seasoning', 2, 'tbsp', 'Spices & sauces'),
      i('vb-salt', 'Salt', 0.5, 'tsp', 'Spices & sauces')
    ]
  },
  {
    id: 'vegetable-paella-smoked-tofu', name: 'Vegetable paella with smoked tofu', emoji: '🥘', servings: 2,
    description: 'A colourful one-pan rice dish with crisp smoked tofu, peppers, artichokes, olives and peas.',
    collection: 'old-faithful',
    ingredients: [
      i('vpst-onion', 'Onion', 1, 'piece', 'Vegetables'),
      i('vpst-pepper', 'Bell pepper', 1, 'piece', 'Vegetables'),
      i('vpst-tofu', 'Smoked tofu', 200, 'g', 'Other'),
      i('vpst-rice', 'Risotto rice', 120, 'g', 'Dry goods'),
      i('vpst-lemon', 'Lemon', 0.5, 'piece', 'Fruit'),
      i('vpst-olives', 'Kalamata olives', 30, 'g', 'Spices & sauces'),
      i('vpst-dried-tomatoes', 'Sun-dried tomatoes in oil', 30, 'g', 'Spices & sauces'),
      i('vpst-artichokes', 'Artichoke hearts', 60, 'g', 'Canned goods'),
      i('vpst-peas', 'Frozen peas', 30, 'g', 'Frozen'),
      i('vpst-parsley', 'Fresh parsley', 10, 'g', 'Vegetables'),
      i('vpst-chilli', 'Chilli powder', 0.5, 'tsp', 'Spices & sauces'),
      i('vpst-turmeric', 'Ground turmeric', 2, 'tsp', 'Spices & sauces'),
      i('vpst-paprika', 'Paprika', 1, 'tsp', 'Spices & sauces'),
      i('vpst-garlic', 'Garlic', 1, 'piece', 'Vegetables'),
      i('vpst-stock', 'Vegetable stock', 250, 'ml', 'Canned goods'),
      i('vpst-oil', 'Olive oil', 1, 'tbsp', 'Spices & sauces')
    ]
  },
  {
    id: 'plant-based-mince-tacos', name: 'Fake meat tacos', emoji: '🌮', servings: 4,
    description: 'Quick corn tacos with warmly spiced fake meat, feta, coriander and lime.',
    collection: 'old-faithful',
    ingredients: [
      i('pbmt-oil', 'Coconut oil', 2, 'tbsp', 'Spices & sauces'),
      i('pbmt-mince', 'Fake meat', 227, 'g', 'Other'),
      i('pbmt-onion', 'White onion', 1, 'piece', 'Vegetables'),
      i('pbmt-garlic', 'Garlic', 1, 'piece', 'Vegetables'),
      i('pbmt-cumin', 'Ground cumin', 0.5, 'tsp', 'Spices & sauces'),
      i('pbmt-chilli-powder', 'Chilli powder', 1, 'tbsp', 'Spices & sauces'),
      i('pbmt-chilli-flakes', 'Red pepper flakes', 0.25, 'tsp', 'Spices & sauces'),
      i('pbmt-tomato-paste', 'Tomato paste', 2, 'tbsp', 'Spices & sauces'),
      i('pbmt-soy-sauce', 'Soy sauce', 2, 'tbsp', 'Spices & sauces'),
      i('pbmt-maple-syrup', 'Maple syrup', 2, 'tsp', 'Spices & sauces'),
      i('pbmt-salt', 'Salt', 0.25, 'tsp', 'Spices & sauces'),
      i('pbmt-tortillas', 'Corn tortillas', 8, 'piece', 'Bakery'),
      i('pbmt-feta', 'Feta', 100, 'g', 'Dairy & eggs'),
      i('pbmt-coriander', 'Fresh coriander', 0.5, 'pack', 'Vegetables'),
      i('pbmt-lime', 'Lime', 1, 'piece', 'Fruit')
    ]
  },
  {
    id: 'like-chicken-guacamole-wraps', name: 'Like Chicken wraps with guacamole', emoji: '🌯', servings: 2,
    description: 'Loaded vegetarian wraps with seasoned plant-based chicken, guacamole, crisp vegetables and feta.',
    collection: 'old-faithful',
    ingredients: [
      i('lcgw-tortillas', 'Large flour tortillas', 3, 'piece', 'Bakery'),
      i('lcgw-chicken', 'Plant-based chicken pieces', 200, 'g', 'Other'),
      i('lcgw-pepper', 'Red bell pepper', 1, 'piece', 'Vegetables'),
      i('lcgw-onion', 'White onion', 1, 'piece', 'Vegetables'),
      i('lcgw-avocado', 'Avocado', 1, 'piece', 'Vegetables'),
      i('lcgw-garlic', 'Garlic', 2, 'piece', 'Vegetables'),
      i('lcgw-lime', 'Lime', 1, 'piece', 'Fruit'),
      i('lcgw-creme-fraiche', 'Crème fraîche', 3, 'tbsp', 'Dairy & eggs'),
      i('lcgw-feta', 'Feta', 100, 'g', 'Dairy & eggs'),
      i('lcgw-lettuce', 'Romaine lettuce', 0.5, 'piece', 'Vegetables'),
      i('lcgw-tomato', 'Tomato', 1, 'piece', 'Vegetables'),
      i('lcgw-oil', 'Olive oil', 1, 'tbsp', 'Spices & sauces'),
      i('lcgw-seasoning', 'Mexican seasoning', 1, 'tsp', 'Spices & sauces', true),
      i('lcgw-hot-sauce', 'Hot sauce', 1, 'tsp', 'Spices & sauces', true),
      i('lcgw-salt', 'Salt', 0.5, 'tsp', 'Spices & sauces'),
      i('lcgw-pepper-seasoning', 'Black pepper', 0.25, 'tsp', 'Spices & sauces')
    ]
  },
  {
    id: 'tomato-risotto', name: 'Tomato risotto', emoji: '🍅', servings: 2,
    description: 'Creamy tomato risotto with coconut milk, dried tomatoes, basil and white wine.',
    collection: 'old-faithful',
    ingredients: [
      i('tr-cherry-tomatoes', 'Cherry tomatoes', 80, 'g', 'Vegetables'),
      i('tr-basil', 'Fresh basil', 10, 'g', 'Vegetables'),
      i('tr-onion', 'Onion', 1, 'piece', 'Vegetables'),
      i('tr-rice', 'Risotto rice', 150, 'g', 'Dry goods'),
      i('tr-coconut-milk', 'Coconut milk', 50, 'ml', 'Canned goods'),
      i('tr-garlic', 'Garlic', 2, 'piece', 'Vegetables'),
      i('tr-dried-tomatoes', 'Sun-dried tomatoes in oil', 20, 'g', 'Spices & sauces'),
      i('tr-passata', 'Passata', 200, 'ml', 'Canned goods'),
      i('tr-stock', 'Vegetable stock', 500, 'ml', 'Canned goods'),
      i('tr-wine', 'Dry white wine', 80, 'ml', 'Spices & sauces'),
      i('tr-oregano', 'Dried oregano', 1, 'tbsp', 'Spices & sauces'),
      i('tr-sugar', 'Sugar', 1, 'tbsp', 'Dry goods'),
      i('tr-oil', 'Olive oil', 1, 'tbsp', 'Spices & sauces'),
      i('tr-salt', 'Salt', 0.5, 'tsp', 'Spices & sauces'),
      i('tr-pepper', 'Black pepper', 0.25, 'tsp', 'Spices & sauces'),
      i('tr-cheese', 'Parmesan', 30, 'g', 'Dairy & eggs', true)
    ]
  },
  {
    id: 'italian-pasta-salad', name: 'Italian pasta salad', emoji: '🥗', servings: 4,
    description: 'A rich pasta salad with mozzarella, rocket, sun-dried tomatoes, pine nuts and pesto dressing.',
    collection: 'old-faithful',
    ingredients: [
      i('ips-pasta', 'Pasta', 250, 'g', 'Dry goods'),
      i('ips-mozzarella', 'Mozzarella', 200, 'g', 'Dairy & eggs'),
      i('ips-dried-tomatoes', 'Sun-dried tomatoes in oil', 150, 'g', 'Spices & sauces'),
      i('ips-rocket', 'Rocket', 150, 'g', 'Vegetables'),
      i('ips-pine-nuts', 'Pine nuts', 50, 'g', 'Dry goods'),
      i('ips-cheese', 'Parmesan', 50, 'g', 'Dairy & eggs'),
      i('ips-garlic', 'Garlic', 1, 'piece', 'Vegetables'),
      i('ips-olive-oil', 'Olive oil', 70, 'ml', 'Spices & sauces'),
      i('ips-balsamic', 'Balsamic vinegar', 3, 'tbsp', 'Spices & sauces'),
      i('ips-pesto', 'Vegetarian pesto', 1, 'tbsp', 'Spices & sauces'),
      i('ips-mustard', 'Mustard', 1, 'tbsp', 'Spices & sauces'),
      i('ips-honey', 'Honey', 1, 'tbsp', 'Spices & sauces'),
      i('ips-salt', 'Salt', 0.5, 'tsp', 'Spices & sauces'),
      i('ips-pepper', 'Black pepper', 0.25, 'tsp', 'Spices & sauces')
    ]
  },
  {
    id: 'kisir-bulgur-salad', name: 'Kısır bulgur salad', emoji: '🌿', servings: 6,
    description: 'A Turkish bulgur salad with tomato and pepper pastes, fresh vegetables, herbs and pomegranate molasses.',
    collection: 'old-faithful',
    ingredients: [
      i('kbs-bulgur', 'Fine bulgur', 400, 'g', 'Dry goods'),
      i('kbs-tomato-paste', 'Tomato paste', 3, 'tbsp', 'Spices & sauces'),
      i('kbs-pepper-paste', 'Pepper paste', 1, 'tbsp', 'Spices & sauces'),
      i('kbs-oil', 'Olive oil', 3, 'tbsp', 'Spices & sauces'),
      i('kbs-pomegranate', 'Pomegranate molasses', 3, 'tbsp', 'Spices & sauces'),
      i('kbs-lemon', 'Lemon', 0.5, 'piece', 'Fruit'),
      i('kbs-cucumber', 'Cucumber', 0.5, 'piece', 'Vegetables'),
      i('kbs-tomatoes', 'Tomatoes', 2, 'piece', 'Vegetables'),
      i('kbs-pepper', 'Pointed pepper', 1, 'piece', 'Vegetables'),
      i('kbs-spring-onions', 'Spring onions', 0.5, 'pack', 'Vegetables'),
      i('kbs-parsley', 'Fresh parsley', 0.5, 'pack', 'Vegetables'),
      i('kbs-mint', 'Fresh mint', 0.25, 'pack', 'Vegetables', true),
      i('kbs-onion', 'Onion', 1, 'piece', 'Vegetables'),
      i('kbs-salt', 'Salt', 1, 'tsp', 'Spices & sauces'),
      i('kbs-black-pepper', 'Black pepper', 0.5, 'tsp', 'Spices & sauces')
    ]
  },
  {
    id: 'creamy-zucchini-soup', name: 'Creamy zucchini soup', emoji: '🥒', servings: 4,
    description: 'A light, silky zucchini and potato soup finished with a little cream and lemon.',
    collection: 'garden-harvest',
    ingredients: [
      i('czs-zucchini', 'Zucchini', 4, 'piece', 'Vegetables'),
      i('czs-potatoes', 'Potatoes', 2, 'piece', 'Vegetables'),
      i('czs-onion', 'Onion', 1, 'piece', 'Vegetables'),
      i('czs-garlic', 'Garlic', 2, 'piece', 'Vegetables'),
      i('czs-stock', 'Vegetable stock', 750, 'ml', 'Canned goods'),
      i('czs-cream', 'Single cream', 100, 'ml', 'Dairy & eggs'),
      i('czs-olive-oil', 'Olive oil', 1, 'tbsp', 'Spices & sauces'),
      i('czs-lemon', 'Lemon', 1, 'piece', 'Fruit'),
      i('czs-salt', 'Salt', 0.5, 'tsp', 'Spices & sauces'),
      i('czs-pepper', 'Black pepper', 0.25, 'tsp', 'Spices & sauces')
    ]
  },
  {
    id: 'coconut-ginger-pumpkin-soup', name: 'Coconut ginger pumpkin soup', emoji: '🎃', servings: 4,
    description: 'Velvety pumpkin soup with coconut milk, fresh ginger and a bright squeeze of lime.',
    collection: 'garden-harvest',
    ingredients: [
      i('cgps-pumpkin', 'Hokkaido pumpkin', 1, 'piece', 'Vegetables'),
      i('cgps-onion', 'Onion', 1, 'piece', 'Vegetables'),
      i('cgps-garlic', 'Garlic', 2, 'piece', 'Vegetables'),
      i('cgps-ginger', 'Fresh ginger', 30, 'g', 'Vegetables'),
      i('cgps-coconut-milk', 'Coconut milk (400 ml can)', 1, 'pack', 'Canned goods'),
      i('cgps-stock', 'Vegetable stock', 600, 'ml', 'Canned goods'),
      i('cgps-oil', 'Vegetable oil', 1, 'tbsp', 'Spices & sauces'),
      i('cgps-lime', 'Lime', 1, 'piece', 'Fruit'),
      i('cgps-salt', 'Salt', 0.5, 'tsp', 'Spices & sauces'),
      i('cgps-pepper', 'Black pepper', 0.25, 'tsp', 'Spices & sauces')
    ]
  },
  {
    id: 'schmorgurken-with-potatoes', name: 'Schmorgurken with new potatoes', emoji: '🥒', servings: 4,
    description: 'Creamy dill-braised cucumbers with new potatoes and optional crisp smoked tofu.',
    collection: 'garden-harvest',
    sourceUrl: 'https://hannoverspeist.de/wp-content/uploads/2023/08/Rezept_Schmorgurke_PDF.pdf',
    ingredients: [
      i('swp-potatoes', 'New potatoes', 750, 'g', 'Vegetables'),
      i('swp-cucumbers', 'Schmorgurken', 1, 'kg', 'Vegetables'),
      i('swp-smoked-tofu', 'Smoked tofu', 250, 'g', 'Other', true),
      i('swp-onion', 'Onion', 1, 'piece', 'Vegetables'),
      i('swp-smoked-paprika', 'Smoked paprika', 1, 'tsp', 'Spices & sauces'),
      i('swp-vegan-sour-cream', 'Vegan sour cream', 150, 'g', 'Dairy & eggs'),
      i('swp-stock', 'Vegetable stock', 260, 'ml', 'Canned goods'),
      i('swp-cornstarch', 'Cornstarch', 1, 'tbsp', 'Dry goods'),
      i('swp-dill', 'Fresh dill', 1, 'pack', 'Vegetables'),
      i('swp-oil', 'Vegetable oil', 1, 'tbsp', 'Spices & sauces'),
      i('swp-salt', 'Salt', 0.5, 'tsp', 'Spices & sauces'),
      i('swp-pepper', 'Black pepper', 0.25, 'tsp', 'Spices & sauces')
    ]
  },
  {
    id: 'mangold-chickpea-curry', name: 'Mangold & chickpea curry', emoji: '🥬', servings: 3,
    description: 'A creamy one-pan curry with tender Mangold, chickpeas, cherry tomatoes and coconut milk.',
    collection: 'garden-harvest',
    sourceUrl: 'https://sandraskochblog.de/mangold-kichererbsen-curry/',
    ingredients: [
      i('mcc-mangold', 'Mangold', 500, 'g', 'Vegetables'),
      i('mcc-chickpeas', 'Chickpeas (400 g can)', 1, 'pack', 'Canned goods'),
      i('mcc-onion', 'Onion', 1, 'piece', 'Vegetables'),
      i('mcc-cherry-tomatoes', 'Cherry tomatoes', 200, 'g', 'Vegetables'),
      i('mcc-curry-paste', 'Vegetarian red curry paste', 1.5, 'tbsp', 'Spices & sauces'),
      i('mcc-coconut-milk', 'Coconut milk (400 ml can)', 1, 'pack', 'Canned goods'),
      i('mcc-coconut-oil', 'Coconut oil', 1, 'tbsp', 'Spices & sauces'),
      i('mcc-salt', 'Salt', 0.5, 'tsp', 'Spices & sauces'),
      i('mcc-pepper', 'Black pepper', 0.25, 'tsp', 'Spices & sauces')
    ]
  },
  {
    id: 'garden-tomato-salad', name: 'Garden tomato salad', emoji: '🍅', servings: 4,
    description: 'Ripe garden tomatoes in a bright mustard vinaigrette with red onion and basil.',
    collection: 'garden-harvest',
    ingredients: [
      i('gts-tomatoes', 'Tomatoes', 800, 'g', 'Vegetables'),
      i('gts-red-onion', 'Red onion', 1, 'piece', 'Vegetables'),
      i('gts-basil', 'Fresh basil', 0.5, 'pack', 'Vegetables', true),
      i('gts-olive-oil', 'Olive oil', 2, 'tbsp', 'Spices & sauces'),
      i('gts-white-wine-vinegar', 'White wine vinegar', 1.5, 'tbsp', 'Spices & sauces'),
      i('gts-mustard', 'Dijon mustard', 1, 'tsp', 'Spices & sauces'),
      i('gts-salt', 'Salt', 0.5, 'tsp', 'Spices & sauces'),
      i('gts-pepper', 'Black pepper', 0.25, 'tsp', 'Spices & sauces')
    ]
  },
  {
    id: 'garden-green-bean-salad', name: 'Garden green bean salad', emoji: '🫛', servings: 4,
    description: 'A simple German-style salad made only with fresh green beans—Buschbohnen or Stangenbohnen—and a tangy onion dressing.',
    collection: 'garden-harvest',
    ingredients: [
      i('ggbs-green-beans', 'Fresh green beans', 800, 'g', 'Vegetables'),
      i('ggbs-onion', 'Onion', 1, 'piece', 'Vegetables'),
      i('ggbs-savory', 'Fresh savory', 0.5, 'pack', 'Vegetables', true),
      i('ggbs-rapeseed-oil', 'Rapeseed oil', 2, 'tbsp', 'Spices & sauces'),
      i('ggbs-white-wine-vinegar', 'White wine vinegar', 3, 'tbsp', 'Spices & sauces'),
      i('ggbs-mustard', 'Dijon mustard', 2, 'tsp', 'Spices & sauces'),
      i('ggbs-sugar', 'Sugar', 0.5, 'tsp', 'Dry goods'),
      i('ggbs-salt', 'Salt', 0.5, 'tsp', 'Spices & sauces'),
      i('ggbs-pepper', 'Black pepper', 0.25, 'tsp', 'Spices & sauces')
    ]
  },
  {
    id: 'classic-zucchini-fritters', name: 'Classic zucchini fritters with yogurt dip', emoji: '🥒', servings: 4,
    description: 'Crisp, cheesy zucchini fritters with a cool lemon-dill yogurt dip—simple, familiar and family-friendly.',
    collection: 'old-faithful',
    ingredients: [
      i('czf-zucchini', 'Zucchini', 1, 'kg', 'Vegetables'),
      i('czf-eggs', 'Eggs', 3, 'piece', 'Dairy & eggs'),
      i('czf-flour', 'Flour', 150, 'g', 'Dry goods'),
      i('czf-cheese', 'Grated cheese', 120, 'g', 'Dairy & eggs'),
      i('czf-spring-onions', 'Spring onions', 4, 'piece', 'Vegetables'),
      i('czf-garlic', 'Garlic', 1, 'piece', 'Vegetables'),
      i('czf-yogurt', 'Plain yogurt', 300, 'g', 'Dairy & eggs'),
      i('czf-lemon', 'Lemon', 1, 'piece', 'Fruit'),
      i('czf-dill', 'Fresh dill', 0.5, 'pack', 'Vegetables'),
      i('czf-oil', 'Vegetable oil', 3, 'tbsp', 'Spices & sauces'),
      i('czf-salt', 'Salt', 1, 'tsp', 'Spices & sauces'),
      i('czf-pepper', 'Black pepper', 0.25, 'tsp', 'Spices & sauces')
    ]
  },
  {
    id: 'creamy-pumpkin-pasta', name: 'Creamy pumpkin pasta', emoji: '🎃', servings: 4,
    description: 'A smooth, gently seasoned pumpkin sauce with pasta and Parmesan.',
    collection: 'old-faithful',
    ingredients: [
      i('cpp-pumpkin', 'Pumpkin flesh', 800, 'g', 'Vegetables'),
      i('cpp-pasta', 'Pasta', 350, 'g', 'Dry goods'),
      i('cpp-onion', 'Onion', 1, 'piece', 'Vegetables'),
      i('cpp-garlic', 'Garlic', 2, 'piece', 'Vegetables'),
      i('cpp-stock', 'Vegetable stock', 300, 'ml', 'Canned goods'),
      i('cpp-cream', 'Single cream', 150, 'ml', 'Dairy & eggs'),
      i('cpp-cheese', 'Parmesan', 80, 'g', 'Dairy & eggs'),
      i('cpp-olive-oil', 'Olive oil', 1, 'tbsp', 'Spices & sauces'),
      i('cpp-nutmeg', 'Ground nutmeg', 0.25, 'tsp', 'Spices & sauces'),
      i('cpp-salt', 'Salt', 0.5, 'tsp', 'Spices & sauces'),
      i('cpp-pepper', 'Black pepper', 0.25, 'tsp', 'Spices & sauces')
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
  'red-lentil-beetroot-salad': { tags: ['vegetarian', 'salad', 'gluten-free', 'high-fiber'], healthiness: 'healthy', nutritionPerServing: { caloriesKcal: 354, proteinG: 14.5, carbsG: 35.9, fatG: 16.5, sugarG: 12, fiberG: 9, saturatedFatG: 2.2, sodiumMg: 450, estimated: true } },
  'banana-bread': { tags: ['vegetarian', 'baking', 'snack'], healthiness: 'indulgent', nutritionPerServing: { caloriesKcal: 213, proteinG: 3.2, carbsG: 34, fatG: 7.8, sugarG: 13, fiberG: 1.8, saturatedFatG: 4.8, sodiumMg: 150, estimated: true } },
  'fudgy-brownies': { tags: ['vegetarian', 'baking', 'dessert', 'chocolate'], healthiness: 'indulgent', nutritionPerServing: { caloriesKcal: 330, proteinG: 4.8, carbsG: 32, fatG: 20.5, sugarG: 23, fiberG: 3, saturatedFatG: 11.5, sodiumMg: 110, estimated: true } },
  'andis-potatoes': { tags: ['vegetarian', 'side-dish', 'gluten-free', 'quick'], healthiness: 'balanced', nutritionPerServing: { caloriesKcal: 250, proteinG: 6, carbsG: 40, fatG: 8, sugarG: 4, fiberG: 4.5, saturatedFatG: 5, sodiumMg: 330, estimated: true } },
  'andis-corn': { tags: ['vegetarian', 'side-dish', 'gluten-free', 'quick'], healthiness: 'indulgent', nutritionPerServing: { caloriesKcal: 378, proteinG: 11.5, carbsG: 35, fatG: 23.5, sugarG: 13, fiberG: 5, saturatedFatG: 13, sodiumMg: 450, estimated: true } },
  'chocolate-zucchini-bread': { tags: ['vegetarian', 'baking', 'snack', 'chocolate'], healthiness: 'indulgent', nutritionPerServing: { caloriesKcal: 221, proteinG: 2.8, carbsG: 27, fatG: 11.3, sugarG: 18, fiberG: 1.3, saturatedFatG: 2.7, sodiumMg: 240, estimated: true } },
  'baked-mushroom-brown-rice-risotto': { tags: ['vegetarian', 'italian-inspired', 'risotto', 'baked'], healthiness: 'balanced', nutritionPerServing: { caloriesKcal: 400, proteinG: 12, carbsG: 42, fatG: 19, sugarG: 3, fiberG: 3, saturatedFatG: 7, sodiumMg: 1200, estimated: true } },
  'vegetarian-caesar-wraps': { tags: ['vegetarian', 'wraps', 'salad', 'quick'], healthiness: 'balanced', nutritionPerServing: { caloriesKcal: 480, proteinG: 14, carbsG: 51, fatG: 25, sugarG: 6, fiberG: 4, saturatedFatG: 7, sodiumMg: 1050, estimated: true } },
  'thai-red-curry': { tags: ['vegan', 'thai', 'curry', 'gluten-free'], healthiness: 'balanced', nutritionPerServing: { caloriesKcal: 505, proteinG: 8, carbsG: 75, fatG: 21, sugarG: 10, fiberG: 6, saturatedFatG: 14, sodiumMg: 700, estimated: true } },
  'sesame-garlic-ramen': { tags: ['vegetarian', 'asian-inspired', 'noodles', 'quick'], healthiness: 'indulgent', nutritionPerServing: { caloriesKcal: 402, proteinG: 10, carbsG: 49, fatG: 18, sugarG: 5, fiberG: 2, saturatedFatG: 4, sodiumMg: 1145, estimated: true } },
  'flaky-biscuits': { tags: ['vegetarian', 'baking', 'side-dish'], healthiness: 'indulgent', nutritionPerServing: { caloriesKcal: 280, proteinG: 5, carbsG: 35, fatG: 12.5, sugarG: 3, fiberG: 1.3, saturatedFatG: 7.5, sodiumMg: 650, estimated: true } },
  'creamy-plant-based-bolognese': { tags: ['vegetarian', 'italian-inspired', 'pasta', 'high-protein'], healthiness: 'balanced', nutritionPerServing: { caloriesKcal: 530, proteinG: 29, carbsG: 64, fatG: 18, sugarG: 11, fiberG: 8, saturatedFatG: 7, sodiumMg: 800, estimated: true } },
  'air-fryer-chocolate-chip-cookies': { tags: ['vegetarian', 'baking', 'dessert', 'chocolate'], healthiness: 'indulgent', nutritionPerServing: { caloriesKcal: 222, proteinG: 2.5, carbsG: 29, fatG: 11, sugarG: 17, fiberG: 1, saturatedFatG: 6.5, sodiumMg: 130, estimated: true } },
  'cowboy-caviar': { tags: ['vegan', 'mexican-inspired', 'dip', 'quick', 'high-fiber'], healthiness: 'healthy', nutritionPerServing: { caloriesKcal: 211, proteinG: 7, carbsG: 23, fatG: 11, sugarG: 3, fiberG: 8, saturatedFatG: 2, sodiumMg: 240, estimated: true } },
  'couscous-feta-stuffed-peppers': { tags: ['vegetarian', 'mediterranean-inspired', 'stuffed-peppers', 'baked'], healthiness: 'balanced', nutritionPerServing: { caloriesKcal: 405, proteinG: 18, carbsG: 52, fatG: 15, sugarG: 8, fiberG: 7, saturatedFatG: 7, sodiumMg: 700, estimated: true } },
  'sweet-potato-avocado-hash': { tags: ['vegetarian', 'brunch', 'one-pan', 'gluten-free', 'high-fiber'], healthiness: 'balanced', nutritionPerServing: { caloriesKcal: 690, proteinG: 18, carbsG: 61, fatG: 43, sugarG: 11, fiberG: 17, saturatedFatG: 9, sodiumMg: 650, estimated: true } },
  'vegetarian-burritos': { tags: ['vegetarian', 'mexican-inspired', 'burrito', 'high-protein', 'high-fiber'], healthiness: 'balanced', nutritionPerServing: { caloriesKcal: 840, proteinG: 34, carbsG: 93, fatG: 35, sugarG: 6, fiberG: 16, saturatedFatG: 11, sodiumMg: 1100, estimated: true } },
  'vegetable-paella-smoked-tofu': { tags: ['vegan', 'spanish-inspired', 'rice', 'one-pan', 'high-protein'], healthiness: 'balanced', nutritionPerServing: { caloriesKcal: 565, proteinG: 22, carbsG: 62, fatG: 21, sugarG: 9, fiberG: 9, saturatedFatG: 3, sodiumMg: 900, estimated: true } },
  'plant-based-mince-tacos': { tags: ['vegetarian', 'mexican-inspired', 'tacos', 'quick'], healthiness: 'balanced', nutritionPerServing: { caloriesKcal: 360, proteinG: 20, carbsG: 35, fatG: 17, sugarG: 5, fiberG: 5, saturatedFatG: 7, sodiumMg: 1000, estimated: true } },
  'like-chicken-guacamole-wraps': { tags: ['vegetarian', 'mexican-inspired', 'wraps', 'quick', 'high-protein'], healthiness: 'indulgent', nutritionPerServing: { caloriesKcal: 830, proteinG: 38, carbsG: 70, fatG: 44, sugarG: 11, fiberG: 13, saturatedFatG: 14, sodiumMg: 1300, estimated: true } },
  'tomato-risotto': { tags: ['vegetarian', 'italian-inspired', 'risotto'], healthiness: 'balanced', nutritionPerServing: { caloriesKcal: 490, proteinG: 9, carbsG: 84, fatG: 10, sugarG: 14, fiberG: 5, saturatedFatG: 3, sodiumMg: 900, estimated: true } },
  'italian-pasta-salad': { tags: ['vegetarian', 'italian-inspired', 'pasta', 'salad', 'quick'], healthiness: 'indulgent', nutritionPerServing: { caloriesKcal: 750, proteinG: 28, carbsG: 69, fatG: 42, sugarG: 13, fiberG: 6, saturatedFatG: 11, sodiumMg: 900, estimated: true } },
  'kisir-bulgur-salad': { tags: ['vegan', 'turkish', 'salad', 'high-fiber'], healthiness: 'healthy', nutritionPerServing: { caloriesKcal: 355, proteinG: 9, carbsG: 62, fatG: 8, sugarG: 9, fiberG: 10, saturatedFatG: 1, sodiumMg: 500, estimated: true } },
  'creamy-zucchini-soup': { tags: ['vegetarian', 'soup', 'one-pot', 'quick', 'gluten-free'], healthiness: 'healthy', nutritionPerServing: { caloriesKcal: 190, proteinG: 5, carbsG: 25, fatG: 9, sugarG: 8, fiberG: 4, saturatedFatG: 3.5, sodiumMg: 650, estimated: true } },
  'coconut-ginger-pumpkin-soup': { tags: ['vegan', 'soup', 'one-pot', 'gluten-free'], healthiness: 'balanced', nutritionPerServing: { caloriesKcal: 300, proteinG: 5, carbsG: 34, fatG: 18, sugarG: 10, fiberG: 6, saturatedFatG: 13, sodiumMg: 650, estimated: true } },
  'schmorgurken-with-potatoes': { tags: ['vegan', 'german', 'gluten-free'], healthiness: 'balanced', nutritionPerServing: { caloriesKcal: 315, proteinG: 7, carbsG: 48, fatG: 10, sugarG: 7, fiberG: 6, saturatedFatG: 3, sodiumMg: 500, estimated: true } },
  'mangold-chickpea-curry': { tags: ['vegan', 'asian-inspired', 'curry', 'one-pan', 'high-fiber'], healthiness: 'balanced', nutritionPerServing: { caloriesKcal: 480, proteinG: 14, carbsG: 45, fatG: 28, sugarG: 9, fiberG: 11, saturatedFatG: 19, sodiumMg: 750, estimated: true } },
  'garden-tomato-salad': { tags: ['vegan', 'salad', 'quick', 'gluten-free'], healthiness: 'healthy', nutritionPerServing: { caloriesKcal: 111, proteinG: 2.1, carbsG: 10.4, fatG: 7.2, sugarG: 6.5, fiberG: 2.6, saturatedFatG: 1, sodiumMg: 330, estimated: true } },
  'garden-green-bean-salad': { tags: ['vegan', 'german-inspired', 'salad', 'gluten-free', 'high-fiber'], healthiness: 'healthy', nutritionPerServing: { caloriesKcal: 138, proteinG: 4.1, carbsG: 17.1, fatG: 7.4, sugarG: 7.6, fiberG: 5.8, saturatedFatG: 0.6, sodiumMg: 350, estimated: true } },
  'classic-zucchini-fritters': { tags: ['vegetarian', 'fritters', 'family-friendly'], healthiness: 'balanced', nutritionPerServing: { caloriesKcal: 480, proteinG: 22, carbsG: 42, fatG: 25, sugarG: 10, fiberG: 4, saturatedFatG: 8, sodiumMg: 850, estimated: true } },
  'creamy-pumpkin-pasta': { tags: ['vegetarian', 'italian-inspired', 'pasta', 'family-friendly'], healthiness: 'balanced', nutritionPerServing: { caloriesKcal: 585, proteinG: 20, carbsG: 80, fatG: 17, sugarG: 9, fiberG: 8, saturatedFatG: 9, sodiumMg: 700, estimated: true } }
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
    'Beat in the remaining cold butter and grated Parmesan, season, and serve immediately.'
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
  ],
  'banana-bread': [
    'Heat the oven to 175°C. Grease or line a 23 × 13 cm loaf tin.',
    'Mash the bananas in a mixing bowl, then stir in the melted butter.',
    'Mix in the baking soda and salt, followed by the sugar, beaten egg and vanilla.',
    'Fold in the flour just until no dry streaks remain, then scrape the batter into the tin.',
    'Bake for 50–60 minutes, until a skewer inserted into the centre comes out clean. Cool briefly in the tin before turning out.'
  ],
  'fudgy-brownies': [
    'Heat the oven to 180°C and line a deep baking tray with baking paper.',
    'Melt 400 g dark chocolate with the butter and stir until smooth, then leave the mixture to cool. Chop the remaining 200 g chocolate into small pieces.',
    'Beat the sugar, vanilla sugar and eggs together well, then stir in the cooled chocolate mixture.',
    'Mix the flour, salt and baking powder. Add it by the spoonful and stir only until combined so the brownies stay tender.',
    'Spread the batter evenly in the tray and scatter over the chopped chocolate, or fold the pieces through the batter.',
    'Bake on the middle shelf for 20–25 minutes. The top should have a light crust while the centre remains very moist.'
  ],
  'andis-potatoes': [
    'Peel the potatoes, cut them into even chunks and boil in salted water for 15–20 minutes, until completely tender.',
    'Drain well and leave them in the hot pan for a minute so excess moisture can evaporate.',
    'Warm the milk. Mash the potatoes with the butter, then add enough warm milk to reach a soft, fluffy consistency.',
    'Season with salt and serve hot. For a richer version, beat in either the optional cream cheese or sour cream to taste.'
  ],
  'andis-corn': [
    'Melt the butter in a large frying pan. Finely chop the onion and garlic and sauté them over medium heat until soft.',
    'Dice the bell pepper, add it to the pan and cook for 4–5 minutes.',
    'Add the sweetcorn and cream, season with salt and black pepper, and simmer until the sauce thickens enough to coat the corn.',
    'Stir in the grated Parmesan and serve hot.'
  ],
  'chocolate-zucchini-bread': [
    'Heat the oven to 175°C. Grease two 20 × 10 cm loaf tins.',
    'Mix the flour, sugar, baking soda, cinnamon and salt in a large bowl.',
    'In a separate bowl, beat the eggs. Add the grated zucchini, oil and vanilla and mix well.',
    'Fold the dry ingredients into the zucchini mixture, then gently stir in the chopped chocolate and optional nuts.',
    'Divide the batter between the tins and bake for 50–60 minutes, until a skewer inserted into the centre comes out clean.'
  ],
  'baked-mushroom-brown-rice-risotto': [
    'Put an oven rack in the middle position and heat the oven to 190°C.',
    'Heat 1 tbsp olive oil in a Dutch oven over medium heat. Add the chopped onion and a pinch of salt and cook for 10 minutes. Add the garlic and cook for another 2–4 minutes, until the onion is well browned.',
    'Add 950 ml vegetable stock, cover and bring to a boil. Remove from the heat, stir in the rice, cover and bake for 65–70 minutes, until tender.',
    'During the final 20 minutes, heat the remaining 2 tbsp olive oil in a large frying pan. Add the sliced mushrooms and a dash of salt and cook for about 13 minutes, until dark and fragrant.',
    'Remove the rice from the oven. Add the remaining 250 ml stock, grated cheese, optional wine, butter, optional tamari, salt and plenty of black pepper. Stir vigorously for 2–3 minutes, until thick and creamy.',
    'Fold in the mushrooms and their juices, adjust the seasoning and finish with the torn oregano leaves.'
  ],
  'vegetarian-caesar-wraps': [
    'Crush or finely grate the garlic. Whisk it with the mayonnaise, yogurt, mustard, lemon juice and vegetarian Worcestershire sauce, then season with salt and black pepper.',
    'Chop the romaine and toss it with the croutons, grated Parmesan and enough dressing to coat everything generously.',
    'Warm the tortillas briefly so they are pliable. Divide the dressed salad between them, fold in the sides and roll tightly.',
    'For a Caesar salad instead, leave out the tortillas and serve the dressed romaine mixture in bowls.'
  ],
  'thai-red-curry': [
    'Boil the rinsed brown rice in plenty of water for 30 minutes. Drain, return it to the pot, cover and rest for 10 minutes, then season and fluff.',
    'Heat the coconut oil in a deep frying pan over medium heat. Cook the chopped onion with a pinch of salt for about 5 minutes, then add the ginger and garlic and stir for 30 seconds.',
    'Add the sliced peppers and carrots and cook for 3–5 minutes. Stir in the red curry paste and cook for 2 minutes.',
    'Add the coconut milk and sugar. Bring to a gentle simmer and cook for 5–10 minutes, until the vegetables are tender to your liking.',
    'Remove from the heat and season with tamari and rice vinegar. Serve over the brown rice with any optional herbs, chilli flakes or sriracha.'
  ],
  'sesame-garlic-ramen': [
    'Discard the ramen seasoning packets. Boil the noodles according to the packet, about 3 minutes, then drain well.',
    'Whisk the soy sauce, vegetarian oyster sauce, rice vinegar, optional brown sugar, chilli sauce and 60 ml water in a small bowl.',
    'Heat the sesame oil in a large frying pan over medium heat. Add the minced garlic and grated ginger and cook for about 1 minute, until fragrant.',
    'Pour in the sauce and simmer for 3–4 minutes, until slightly thickened. Add the noodles and toss for about 3 minutes, until hot and evenly coated.',
    'Garnish with sliced spring onions and sesame seeds.'
  ],
  'flaky-biscuits': [
    'Freeze the butter for at least 10 minutes. Heat the oven to 220°C and line a baking tray with baking paper.',
    'Mix the flour, baking powder, sugar and salt in a large bowl.',
    'Grate or cut the frozen butter into small crumbs and toss it through the flour mixture.',
    'Add the very cold milk and stir with a wooden spoon just until combined; do not overwork the dough.',
    'Turn onto a well-floured surface and knead very lightly, adding only enough flour to make the dough workable.',
    'Fold the dough over itself and gently flatten it, rotate 90 degrees and fold again. Repeat 5–6 times without overworking it.',
    'Use your hands to flatten the dough to about 2.5 cm thick. Cut six round biscuits, gently bringing the scraps together as needed, and place them on the tray.',
    'Bake for 12–15 minutes, until risen and golden brown.'
  ],
  'creamy-plant-based-bolognese': [
    'Cook the spaghetti in well-salted boiling water until al dente. Reserve a mug of cooking water, then drain.',
    'Finely chop the onion and garlic and grate or finely dice the carrots. Brown the fake meat in a large frying pan, then add the onion and carrots and cook until softened.',
    'Add the garlic and red pepper flakes and cook briefly. Stir in the crushed tomatoes and ajvar, then simmer for 15–20 minutes.',
    'Stir in the cream and loosen with a little reserved pasta water if needed. Season with salt and black pepper.',
    'Toss with the spaghetti and finish with grated Parmesan.'
  ],
  'air-fryer-chocolate-chip-cookies': [
    'Melt the butter and mix it with the brown and white sugars until smooth. Beat in the egg and vanilla.',
    'Mix the flour, cornstarch, baking soda and salt in a separate bowl, then fold the dry ingredients into the butter mixture.',
    'Fold in the chocolate chips. Cover and refrigerate the dough for 20 minutes.',
    'Shape into 12 balls. Line the air-fryer basket with a suitable perforated liner and arrange a few cookies at a time with room to spread.',
    'Air-fry at 163°C for about 7–9 minutes per batch. Let the cookies firm up for several minutes before moving them to a rack.'
  ],
  'cowboy-caviar': [
    'Seed and dice the tomatoes, dice the avocados, red onion and bell pepper, and finely chop the jalapeño and coriander.',
    'Drain and rinse the black beans and black-eyed peas. Combine them with the prepared vegetables and thawed sweetcorn in a large bowl.',
    'Whisk the olive oil, lime juice, red wine vinegar, sugar, salt, black pepper and garlic powder together.',
    'Pour the dressing over the vegetables and toss thoroughly. Refrigerate until needed and toss again before serving, with optional tortilla chips.'
  ],
  'couscous-feta-stuffed-peppers': [
    'Heat the oven to 200°C. Put the couscous in a bowl, add the turmeric and a little salt, and cover with about 400 ml boiling water. Cover and leave to absorb.',
    'Chop the onion and garlic and soften them in the olive oil. Add the spinach and cook until wilted.',
    'Remove the seeds and membranes from the peppers, trimming the bottoms only if needed so they stand upright. Bake the empty peppers for 5 minutes.',
    'Fluff the couscous and mix it with the spinach mixture and three-quarters of the crumbled feta. Season with salt and black pepper.',
    'Fill the peppers, crumble over the remaining feta and bake for about 20 minutes, until the peppers are tender and the tops are lightly browned.'
  ],
  'sweet-potato-avocado-hash': [
    'Mash the avocado with a fork. Stir in the lime juice and finely grated garlic, season with salt and black pepper, and set aside.',
    'Finely chop the onion and coarsely grate the sweet potatoes.',
    'Heat the olive oil in a large frying pan. Cook the onion for 2–5 minutes, then add the sweet potato, red pepper flakes, salt and black pepper.',
    'Cook for 10–15 minutes, stirring occasionally. Press the mixture into an even layer and let it crisp underneath, then turn sections so both sides brown while the centre stays soft.',
    'Make four wells in the hash, crack in the eggs, cover and cook until the whites are set and the yolks are done to your liking.',
    'Serve topped with the smashed avocado and sriracha.'
  ],
  'vegetarian-burritos': [
    'Cook the rice according to the packet instructions, then fluff it and keep warm.',
    'Heat the oil in a large frying pan. Brown the fake meat, add the taco seasoning and drained black beans, then cook until piping hot; add a splash of water if the mixture looks dry.',
    'For the guacamole, mash the avocados with the lime juice, crushed garlic, half of the finely chopped red onion and half of the chopped tomatoes. Stir in the coriander and salt.',
    'Warm the tortillas in a dry pan or microwave until pliable.',
    'Divide the rice, mince-and-bean mixture, remaining tomato and onion, grated cheese and guacamole between the tortillas.',
    'Fold in the sides, roll each burrito tightly and serve immediately. For a crisp finish, toast seam-side down in a dry pan for 1–2 minutes.'
  ],
  'vegetable-paella-smoked-tofu': [
    'Dice the smoked tofu and fry it in half the olive oil until crisp, then set aside.',
    'Finely chop the onion and garlic and soften them in the remaining oil. Add the diced bell pepper and cook for 2–3 minutes.',
    'Stir in the rice, chilli powder, turmeric and paprika and toast briefly.',
    'Pour in the vegetable stock and simmer for about 15 minutes, stirring occasionally, until the rice is tender.',
    'Add the chopped sun-dried tomatoes, peas, olives, artichoke hearts, parsley and crisp tofu and heat through.',
    'Divide between plates and squeeze over the lemon juice.'
  ],
  'plant-based-mince-tacos': [
    'Heat the coconut oil in a frying pan and brown the fake meat.',
    'Finely chop the onion. Add half to the pan with the crushed garlic and cook until softened.',
    'Stir in the cumin, chilli powder, chilli flakes, tomato paste, soy sauce, maple syrup and salt and cook until glossy and hot.',
    'Warm the corn tortillas. Finely chop the remaining onion and coriander and crumble the feta.',
    'Fill the tortillas with the mince mixture, onion, feta and coriander and finish with lime juice.'
  ],
  'like-chicken-guacamole-wraps': [
    'Mash the avocado with the crushed garlic and juice of half the lime. Season with salt and black pepper.',
    'Mix the crème fraîche with the remaining lime zest and juice, salt and black pepper; add optional Mexican seasoning or hot sauce if desired.',
    'Heat the olive oil and cook the plant-based chicken until nearly done. Add the sliced red pepper and onion, season and cook until tender.',
    'Chop the lettuce and tomato and crumble the feta. Warm the tortillas.',
    'Spread each tortilla with guacamole and lime crème fraîche, add the chicken mixture, lettuce, tomato and feta, then fold tightly.'
  ],
  'tomato-risotto': [
    'Keep the vegetable stock hot. Finely chop the onion and garlic and soften them in the olive oil for about 3 minutes.',
    'Add the risotto rice and toast for 1 minute. Pour in the white wine and stir until absorbed.',
    'Gradually add the passata and hot stock, stirring regularly and letting each addition absorb before adding more.',
    'When the rice is tender and creamy, season with the oregano, sugar, salt and black pepper.',
    'Fold in the halved cherry tomatoes, chopped sun-dried tomatoes and coconut milk and heat through.',
    'Serve with fresh basil and optional grated Parmesan.'
  ],
  'italian-pasta-salad': [
    'Cook the pasta in salted water until al dente, drain and leave to cool.',
    'Toast the pine nuts in a dry frying pan over medium heat until golden.',
    'Wash and roughly chop the rocket. Dice the sun-dried tomatoes and mozzarella.',
    'Combine the pasta, rocket, tomatoes, mozzarella, pine nuts and grated Parmesan in a large bowl.',
    'Whisk the crushed garlic, olive oil, balsamic vinegar, pesto, mustard, honey, salt and black pepper together.',
    'Pour the dressing over the salad, toss thoroughly and serve.'
  ],
  'kisir-bulgur-salad': [
    'Put the fine bulgur in a large heatproof bowl, pour over 300 ml boiling water, cover and leave it to swell.',
    'Finely chop the onion. Heat the olive oil and cook the onion with the tomato and pepper pastes until fragrant.',
    'Stir the warm onion mixture through the bulgur, fluffing it to distribute the pastes evenly, then leave to cool slightly.',
    'Dice the cucumber, tomatoes and pointed pepper. Slice the spring onions and chop the parsley and optional mint.',
    'Combine the vegetables and herbs with the bulgur. Add the pomegranate molasses and lemon juice, season with salt and black pepper and mix thoroughly.'
  ],
  'creamy-zucchini-soup': [
    'Roughly chop the zucchini and potatoes. Finely chop the onion and garlic.',
    'Heat the olive oil in a large saucepan. Cook the onion for about 5 minutes until soft, then add the garlic and cook for 30 seconds.',
    'Add the zucchini, potatoes and vegetable stock. Bring to a boil, cover and simmer for 15–20 minutes, until the potatoes are tender.',
    'Blend the soup until completely smooth, then stir in the cream and warm gently without boiling.',
    'Season with salt, black pepper and lemon juice to taste, then serve.'
  ],
  'coconut-ginger-pumpkin-soup': [
    'Halve the Hokkaido pumpkin, scoop out the seeds and cut the unpeeled flesh into small chunks. Finely chop the onion, garlic and ginger.',
    'Heat the oil in a large saucepan. Cook the onion for about 5 minutes, then add the garlic and ginger and cook for 1 minute until fragrant.',
    'Add the pumpkin and vegetable stock. Bring to a boil, cover and simmer for 20–25 minutes, until the pumpkin is completely tender.',
    'Add the coconut milk and blend until smooth. Return to a gentle heat, adding a little water if the soup is too thick.',
    'Season with salt, black pepper and lime juice to taste, then serve hot.'
  ],
  'schmorgurken-with-potatoes': [
    'Scrub the new potatoes and boil them in salted water for 15–20 minutes, until tender.',
    'Peel the Schmorgurken, halve them lengthwise, scrape out the seeds and cut the flesh into bite-sized pieces. Finely chop the onion and dill; dice the optional smoked tofu.',
    'Heat the oil in a deep frying pan. Soften the onion, then add the smoked tofu, if using, and fry for 5–10 minutes until crisp.',
    'Add the cucumber and smoked paprika and cook for 6 minutes, stirring occasionally. Pour in the vegetable stock and simmer for another 5 minutes.',
    'Mix the cornstarch with 2 tbsp cold water, stir it into the pan and simmer until the sauce thickens. Fold in the vegan sour cream without letting it boil hard.',
    'Season with salt and black pepper, stir through the dill and serve with the drained new potatoes.'
  ],
  'mangold-chickpea-curry': [
    'Finely chop the onion. Drain and rinse the chickpeas. Separate the Mangold stems from the leaves, dice the stems and cut the leaves into broad strips.',
    'Heat the coconut oil in a deep frying pan. Fry the curry paste and onion briefly, then add the Mangold stems and chickpeas and cook for 2–3 minutes.',
    'Pour in the coconut milk, season with salt and black pepper, cover and simmer for 5 minutes.',
    'Add the Mangold leaves and halved cherry tomatoes. Cover again and simmer gently for about 20 minutes, until the stems are tender and the leaves have wilted.',
    'Taste and adjust the seasoning, then serve in bowls.'
  ],
  'garden-tomato-salad': [
    'Cut the tomatoes into bite-sized wedges, thinly slice the red onion and place both in a serving bowl.',
    'Whisk the olive oil, white wine vinegar and Dijon mustard with the salt and black pepper until combined.',
    'Pour the dressing over the tomatoes and onion and toss gently so the tomatoes keep their shape.',
    'Tear over the optional basil and serve straight away.'
  ],
  'garden-green-bean-salad': [
    'Trim the fresh green beans and cut very long Stangenbohnen into bite-sized lengths; leave shorter Buschbohnen whole or halve them.',
    'Cook the beans in boiling salted water for 8–10 minutes, until tender but still pleasantly firm. Drain and rinse briefly under cold water.',
    'Finely dice the onion. Whisk it with the rapeseed oil, white wine vinegar, Dijon mustard, sugar, salt and black pepper.',
    'Toss the warm beans with the dressing and optional chopped savory. Leave for 15 minutes so the flavours settle, then serve warm or at room temperature.'
  ],
  'classic-zucchini-fritters': [
    'Coarsely grate the zucchini, mix it with half the salt and leave it in a colander for 10 minutes.',
    'Meanwhile, stir the yogurt with half the lemon juice, the chopped dill and a pinch of black pepper. Refrigerate until serving.',
    'Squeeze the zucchini very firmly in a clean tea towel to remove as much water as possible.',
    'Mix the zucchini with the eggs, flour, grated cheese, sliced spring onions, crushed garlic, remaining salt and black pepper.',
    'Heat a little of the oil in a large frying pan. Spoon in small mounds of batter, flatten them and fry in batches for 3–4 minutes per side until deeply golden and cooked through.',
    'Keep the finished fritters warm and serve with the yogurt dip and remaining lemon wedges.'
  ],
  'creamy-pumpkin-pasta': [
    'Cut the pumpkin flesh into small cubes. Finely chop the onion and garlic.',
    'Heat the olive oil in a large saucepan. Cook the onion for 5 minutes until soft, add the garlic and cook for another 30 seconds.',
    'Add the pumpkin and vegetable stock. Cover and simmer for 15–20 minutes, until the pumpkin is completely tender.',
    'Meanwhile, cook the pasta in salted water until al dente. Reserve a mug of pasta water, then drain.',
    'Blend the pumpkin mixture until smooth. Stir in the cream, nutmeg and half the grated cheese, then season with salt and black pepper.',
    'Toss the pasta through the sauce, loosening it with reserved pasta water if needed. Serve with the remaining cheese.'
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
  'red-lentil-beetroot-salad': timeEstimate(45),
  'banana-bread': timeEstimate(75),
  'fudgy-brownies': timeEstimate(40),
  'andis-potatoes': timeEstimate(30),
  'andis-corn': timeEstimate(30),
  'chocolate-zucchini-bread': timeEstimate(75),
  'baked-mushroom-brown-rice-risotto': timeEstimate(80),
  'vegetarian-caesar-wraps': timeEstimate(20),
  'thai-red-curry': timeEstimate(40),
  'sesame-garlic-ramen': timeEstimate(25),
  'flaky-biscuits': timeEstimate(40),
  'creamy-plant-based-bolognese': timeEstimate(40),
  'air-fryer-chocolate-chip-cookies': timeEstimate(55),
  'cowboy-caviar': timeEstimate(20),
  'couscous-feta-stuffed-peppers': timeEstimate(40),
  'sweet-potato-avocado-hash': timeEstimate(30),
  'vegetarian-burritos': timeEstimate(40),
  'vegetable-paella-smoked-tofu': timeEstimate(40),
  'plant-based-mince-tacos': timeEstimate(25),
  'like-chicken-guacamole-wraps': timeEstimate(30),
  'tomato-risotto': timeEstimate(40),
  'italian-pasta-salad': timeEstimate(30),
  'kisir-bulgur-salad': timeEstimate(35),
  'creamy-zucchini-soup': timeEstimate(30),
  'coconut-ginger-pumpkin-soup': timeEstimate(45),
  'schmorgurken-with-potatoes': timeEstimate(45),
  'mangold-chickpea-curry': timeEstimate(35),
  'garden-tomato-salad': timeEstimate(15),
  'garden-green-bean-salad': timeEstimate(35),
  'classic-zucchini-fritters': timeEstimate(45),
  'creamy-pumpkin-pasta': timeEstimate(40)
}

export const starterRecipes: Recipe[] = starterRecipeBasics.map((recipe) => ({ ...recipe, ...starterMetadata[recipe.id], ...starterTimes[recipe.id], instructions: starterInstructions[recipe.id] }))

const RETIRED_RECIPE_IDS = new Set(['sheet-pan', 'salmon', 'chicken-orzo'])
const REFRESHED_RECIPE_IDS = new Set([
  'tacos', 'soup', 'falafel-pitas', 'andis-potatoes',
  'creamy-plant-based-bolognese', 'vegetarian-burritos', 'plant-based-mince-tacos'
])
const GARDEN_RECIPE_IDS = new Set([
  'creamy-zucchini-soup',
  'coconut-ginger-pumpkin-soup',
  'schmorgurken-with-potatoes',
  'mangold-chickpea-curry',
  'garden-tomato-salad',
  'garden-green-bean-salad'
])

export const CATALOG_VERSION = 25

const CHEESE_NAME_REPLACEMENTS: Record<string, string> = {
  'Vegetarian Italian-style hard cheese': 'Parmesan',
  'Vegetarian feta': 'Feta',
  'Vegetarian halloumi': 'Halloumi',
  'Vegetarian grated cheese': 'Grated cheese',
  'Vegetarian grated cheddar': 'Grated cheddar',
  'Vegetarian cheddar slices': 'Cheddar slices'
}

function normalizeCheeseNames(recipe: Recipe): Recipe {
  return {
    ...recipe,
    description: recipe.description.replace(/vegetarian (?:Italian-style )?hard cheese/gi, 'Parmesan'),
    ingredients: recipe.ingredients.map((ingredient) => ({
      ...ingredient,
      name: CHEESE_NAME_REPLACEMENTS[ingredient.name] ?? ingredient.name
    })),
    instructions: recipe.instructions?.map((instruction) =>
      instruction.replace(/vegetarian (?:Italian-style )?hard cheese/gi, 'Parmesan')
    )
  }
}

export function migrateRecipeCatalog(state: AppState): AppState {
  if ((state.catalogVersion ?? 0) >= CATALOG_VERSION) return state
  const retainedRecipes = state.recipes.filter((recipe) => !RETIRED_RECIPE_IDS.has(recipe.id))
  const known = new Set(retainedRecipes.map((recipe) => recipe.id))
  const starters = new Map(starterRecipes.map((recipe) => [recipe.id, recipe]))
  const recipes = [
    ...retainedRecipes.map((recipe) => {
      const starter = starters.get(recipe.id)
      if (starter && REFRESHED_RECIPE_IDS.has(recipe.id)) return starter
      return normalizeCheeseNames({
        ...recipe,
        collection: GARDEN_RECIPE_IDS.has(recipe.id) ? 'garden-harvest' : recipe.collection ?? starter?.collection ?? 'explore' as const,
        tags: recipe.tags ?? starter?.tags ?? [],
        healthiness: recipe.healthiness ?? starter?.healthiness ?? 'balanced' as const,
        totalTimeMinutes: recipe.id === 'overnight-oats' ? starter?.totalTimeMinutes : recipe.totalTimeMinutes ?? starter?.totalTimeMinutes,
        timeCategory: recipe.id === 'overnight-oats' ? starter?.timeCategory : recipe.timeCategory ?? starter?.timeCategory,
        nutritionPerServing: recipe.nutritionPerServing ?? starter?.nutritionPerServing,
        instructions: recipe.instructions?.length ? recipe.instructions : starter?.instructions
      })
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
