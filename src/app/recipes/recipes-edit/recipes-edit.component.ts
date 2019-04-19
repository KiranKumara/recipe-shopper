import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Response} from '@angular/http';

import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.css']
})
export class RecipesEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
      private recipeService: RecipeService,
      private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initRecipeForm();
        }
      );
  }

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['image_path'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['ingredients'])
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value)
        .subscribe(
          (response: Response) => { console.log(response) },
          (error) => { console.log(error) }
        );
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {
   (<FormArray>this.recipeForm.get('ingredients')).push(
    new FormGroup({
      'name': new FormControl(null, Validators.required),
      'quantity': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }

  private initRecipeForm() {
    let recipeName = ''
    let recipeImagePath = ''
    let recipeDescription = ''
    let recipeIngredients = new FormArray([])

    if (this.editMode) {
      //const recipe = this.recipeService.getRecipe(this.id);
      this.recipeService.getRecipe(this.id).subscribe((resp: Response) => {;
        const recipe = resp.json();
        console.log(recipe)
        recipeName = recipe.name;
        recipeDescription = recipe.description;
        recipeImagePath = recipe.image_path;
        if(recipe['ingredients']){
          for(let ingredient of recipe.ingredients) {
            recipeIngredients.push(new FormGroup({
                'name': new FormControl(ingredient.name, Validators.required),
                'quantity': new FormControl(ingredient.quantity,[
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)])
              }));
          }
        }
        this.recipeForm = new FormGroup({
          'name': new FormControl(recipeName, Validators.required),
          'image_path': new FormControl(recipeImagePath, Validators.required),
          'description': new FormControl(recipeDescription, Validators.required),
          'ingredients': recipeIngredients,
        })
      },
      (error: any) => console.log(error))
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'image_path': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients,
    })
  }
}
