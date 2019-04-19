import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject, Observable } from 'rxjs';
import 'rxjs/operators';
//import { Observable } from 'rxjs/Observable';

import { RecipeInterface } from './recipes-list/recipe.interface';
import { Recipe } from './recipes-list/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { environment } from '../../environments/environment';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<RecipeInterface[]>();
  private recipes: RecipeInterface[] = []
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Non-Veg Burger', 
  //     'Non-Veg Burger description',
  //     'https://cbspittsburgh.files.wordpress.com/2015/11/recipes-1024x576.jpg',
  //     [
  //       new Ingredient('Buns', 2),
  //       new Ingredient('Meat', 1)
  //     ]),
  //   new Recipe(
  //     'Vege Burger',
  //     'Vege Burger complete Recipe description',
  //     'https://cbspittsburgh.files.wordpress.com/2015/11/recipes-1024x576.jpg',
  //     [
  //       new Ingredient('Buns', 2),
  //       new Ingredient('Vegitables', 10)
  //     ])
  // ];

  constructor(private slService: ShoppingListService, private http: Http) {}

  getRecipes() {
    return this.http.get(environment.apiBaseUrl + '/recipes.json');
      // .map(response: Response) { return response.json() }
      // .cacth(error: Response) { return error; };
    // return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.http.get(environment.apiBaseUrl + '/recipes/' + index +'.json');
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
    let data = newRecipe;
    data['ingredients_attributes'] = newRecipe['ingredients'];
    delete data['ingredients'];
    return this.http.post(environment.apiBaseUrl + '/recipes.json', {recipe: data})
    //this.recipesChanged.next(this.getRecipes());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    //this.recipesChanged.next(this.getRecipes());
  }
}
