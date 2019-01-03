import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') userForm: NgForm;
  title = 'recipe-shopper';
  defaultOption = 'advanced';
  formSubmitted = false;
  user = {
    enteredEmail: '',
    selectedSubscription: ''
  };

  onSubmit() {
    this.formSubmitted = true
    console.log(this.userForm.value);
    this.user.enteredEmail = this.userForm.value.email;
    this.user.selectedSubscription = this.userForm.value.subscription;
  }
}
