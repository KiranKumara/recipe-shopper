import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipes-list/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      'Non-Veg Burger', 
      'Non-Veg Burger description',
      'https://cbspittsburgh.files.wordpress.com/2015/11/recipes-1024x576.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ]),
    new Recipe(
      'Vege Burger',
      'Vege Burger complete Recipe description',
      'https://cbspittsburgh.files.wordpress.com/2015/11/recipes-1024x576.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Vegitables', 10)
      ])
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  addToShoppingList(ingredients: Ingredient[]) {
    this.slService.addMoreIngredients(ingredients);
  }

}
