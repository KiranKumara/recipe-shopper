import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
	@Output() recipeWasSelected = new EventEmitter<Recipe>();

	recipes: Recipe[] = [
		new Recipe('The Test Recipe', 
			'The complete Recipe description',
			'https://cbspittsburgh.files.wordpress.com/2015/11/recipes-1024x576.jpg'),
		new Recipe('Another Test Recipe', 
			'The Another complete Recipe description',
			'https://cbspittsburgh.files.wordpress.com/2015/11/recipes-1024x576.jpg')
	];

  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(recipe: Recipe) {
  	this.recipeWasSelected.emit(recipe)
  }
}
