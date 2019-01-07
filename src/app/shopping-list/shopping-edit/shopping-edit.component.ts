import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') ingredientForm: NgForm;
  editingIngredient: Ingredient;
  editMode: boolean = false;
  editingIndex: number;

  private subscription: Subscription;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing
      .subscribe(
        (index: number) => {
          this.editMode = true;
          this.editingIndex = index;
          this.editingIngredient = this.slService.getIngredient(index);
          this.ingredientForm.setValue({
            'name': this.editingIngredient.name,
            'amount': this.editingIngredient.quantity
          });
        }
      );
  }

  onFormSubmit() {
    const value = this.ingredientForm.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this.slService.updateIngredient(this.editingIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.onClear()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClear() {
    this.ingredientForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.slService.deleteIngredient(this.editingIndex);
    this.onClear();
  }

}
