import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './sign-up.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';


@NgModule({
  declarations: [
    SignUpComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    SignUpRoutingModule
  ]
})
export class SignUpModule { }
