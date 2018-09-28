import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  private ingedients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatos', 10)
  ];

  getIngredients() {
    return this.ingedients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingedients.push(ingredient);
    this.ingredientsChanged.emit(this.getIngredients());
  }

  addMoreIngredients(ingedients: Ingredient[]) {
    this.ingedients.push(...ingedients);
    this.ingredientsChanged.emit(this.getIngredients());
  }
}
