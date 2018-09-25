import { EventEmitter } from '@angular/core';
import { Recipe } from './recipes-list/recipe.model';

export class RecipeService {
	recipeSelected = new EventEmitter<Recipe>();
	private recipes: Recipe[] = [
		new Recipe('The Test Recipe', 
			'The complete Recipe description',
			'https://cbspittsburgh.files.wordpress.com/2015/11/recipes-1024x576.jpg'),
		new Recipe('Another Test Recipe', 
			'The Another complete Recipe description',
			'https://cbspittsburgh.files.wordpress.com/2015/11/recipes-1024x576.jpg')
	];

	getRecipes() {
		return this.recipes.slice();
	}

}
