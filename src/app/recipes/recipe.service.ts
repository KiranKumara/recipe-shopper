import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs';

import { Recipe } from './recipes-list/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { environment } from '../../environments/environment';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
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

  constructor(private slService: ShoppingListService, private http: Http) {}

  getRecipes() {
    return this.http.get(environment.apiBaseUrl + '/recipes.json');
    // return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addToShoppingList(ingredients: Ingredient[]) {
    this.slService.addMoreIngredients(ingredients);
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    // this.recipesChanged.next(this.getRecipes());
  }

  addRecipe(newRecipe: Recipe) {
    // this.recipes.push(newRecipe);
    return this.http.post(environment.apiBaseUrl + '/recipes.json', {recipe: newRecipe})
    //this.recipesChanged.next(this.getRecipes());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    //this.recipesChanged.next(this.getRecipes());
  }
}
