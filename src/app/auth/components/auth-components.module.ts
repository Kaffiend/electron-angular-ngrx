import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from 'app/auth/components/login-form/login-form.component';

const COMPONENTS = [
  LoginFormComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class AuthComponentsModule { }
