import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currUser?: User; 

  userForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    username: new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl('')
  });
  formBuilder: any;

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loggedIn();
    
  }

  loggedIn(){
    this.authService.isUserLoggedIn().subscribe((user: any) => {
      if (user !== null || user !== undefined) {
        this.currUser = user;
        console.log(this.currUser?.email);
      }else{
        console.log("Nincs bejelentkezett user!");
      }
    });
  }

  save(){
    
  }

  del(){

  }

}
