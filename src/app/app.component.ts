import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('f') userForm: NgForm;
  title = 'recipe-shopper';
  defaultOption = 'advanced';
  formSubmitted = false;
  user = {
    enteredEmail: '',
    selectedSubscription: ''
  };
  projectStatuses = ['Stable', 'Critical', 'Finished'];
  projectForm: FormGroup;
  projectFormSubmited = false;


  ngOnInit () {
    this.projectForm = new FormGroup({
      'projectName': new FormControl(null, Validators.required),
      'projectEmail': new FormControl(null, [Validators.required, Validators.email]),
      'projectStatus': new FormControl(null)
    })
  }

  onSubmit() {
    this.formSubmitted = true
    console.log(this.userForm.value);
    this.user.enteredEmail = this.userForm.value.email;
    this.user.selectedSubscription = this.userForm.value.subscription;
  }

  onProjectFormSubmit() {
    this.projectFormSubmited = this.projectForm.valid;
  }
}
