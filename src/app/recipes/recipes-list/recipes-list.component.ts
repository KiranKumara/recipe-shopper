import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';

import { RecipeInterface } from './recipe.interface';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
	recipes: RecipeInterface[];

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipeService.recipesChanged
      .subscribe(
        (newRecipes: RecipeInterface[]) => {
          this.recipes = newRecipes;
        }
      );
    this.recipeService.getRecipes()
      .subscribe(
        (response: Response) => {
          this.recipes = response.json();
        },
        (error) => console.log(error)
      );
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
