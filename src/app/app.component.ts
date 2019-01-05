import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

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
      'projectName': new FormControl(null, [Validators.required, this.forbiddenProjectName], this.forbiddenProjectNameFromServer),
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

  forbiddenProjectName(control: FormControl): {[s: string]: boolean} {
    if (control.value == 'Test') {
      return {'forbiddenProjectName': true};
    }
    return null;
  }

  forbiddenProjectNameFromServer(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value == 'TestProjectname') {
          resolve({'forbiddenProjectName': true});
        } else {
          resolve(null);
        }
      }, 3000);
    });
    return promise;
  }
}
