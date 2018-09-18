import { Component, Output, EventEmitter, ContentChild, AfterContentInit } from '@angular/core';

import { AuthRememberComponent } from './auth-remember.component';

import { User } from './auth-form.interface';

@Component({
  selector: 'auth-form',
  template: `
    <div>
      <form (ngSubmit)="onSubmit(form.value)" #form="ngForm">
        <ng-content select="h3"></ng-content>
        <label>
          Email address
          <input type="email" name="email" ngModel>
        </label>
        <label>
          Password
          <input type="password" name="password" ngModel>
        </label>
        <ng-content select="auth-remember"></ng-content>
        <div *ngIf="showMessage">
          You will be logged in for 30 days
        </div>
        <ng-content select="button"></ng-content>
      </form>
    </div>
  `
})
export class AuthFormComponent implements AfterContentInit {

  showMessage: boolean;

  @ContentChild(AuthRememberComponent) remember: AuthRememberComponent;//passing the component to access it.
  //checking the register of the component
  @Output() submitted: EventEmitter<User> = new EventEmitter<User>();

  ngAfterContentInit() {
    //here you get the checked event
    if (this.remember) {//if we have access the particular element
      this.remember.checked.subscribe((checked: boolean) => this.showMessage = checked); // you can subscribe to the changes of an output
    }
  }

  onSubmit(value: User) {
    this.submitted.emit(value);
  }

}
