import { Component, OnInit, Output } from '@angular/core';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currUser?: User; 

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    
  }

  loggedIn(){
    this.authService.isUserLoggedIn().subscribe((user: any) => {
      if (user !== null || user !== undefined) {
        this.currUser = user;
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
