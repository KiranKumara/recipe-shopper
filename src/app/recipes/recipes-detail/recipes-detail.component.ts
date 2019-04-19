import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Response } from '@angular/http';

import { RecipeInterface } from '../recipes-list/recipe.interface';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
	recipe: RecipeInterface;
  id: number;
  showLoading: boolean = true;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipeService.getRecipe(this.id)
            .subscribe(
              (resp: Response) => {
                this.recipe = <RecipeInterface>resp.json();
                this.showLoading = false;
              },
              (error: any) => { console.log(error) }
            );
        });
  }

  addToShoppingList() {
    this.recipeService.addToShoppingList(this.recipe.ingredients)
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
