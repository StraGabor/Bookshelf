import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logIn : FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.logIn = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get email(){
    return this.logIn.get('email');
  }

  get password(){
    return this.logIn.get('password');
  }

  async login(){
    this.authService.login(this.email?.value,this.password?.value).then( cred =>{
      this.router.navigateByUrl('/profile');
    }).catch(error =>{
      console.log('Hiba bejelentkezes kozben: ' + error);
    });
  }

}
