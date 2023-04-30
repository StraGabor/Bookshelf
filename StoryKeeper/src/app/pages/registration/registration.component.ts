import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  signUp: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    repassword: new FormControl(''),
    username: new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl('')
  });
  formBuilder: any;

  constructor(private authService: AuthService, private userService: UserService){}
  
  ngOnInit(): void {
    this.signUp = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      repassword: ['', Validators.required],
      username: ['', Validators.required]
    });
  }

  get email(){
    return this.signUp.get('email');
  }

  get password(){
    return this.signUp.get('password');
  }

  get repassword(){
    return this.signUp.get('repassword');
  }

  get username(){
    return this.signUp.get('username');
  }



}
