import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
import { MatSidenav } from "@angular/material/sidenav";
import { filter } from "rxjs";
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'StoryKeeper';

  page = '';
  loggedInUser? : firebase.default.User | null;
  routes: Array<string> = [];

  constructor(private router: Router, private authService: AuthService){

  }

  ngOnInit(){
    this.routes = this.router.config.map(config => config.path) as string[];

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((evts: any) => {
      const currentPage = (evts.urlAfterRedirects as string).split('/')[1] as string;
      if (this.routes.includes(currentPage)) {
        this.page = currentPage;
      }
    });

    this.authService.isUserLoggedIn().subscribe(user => {
      this.loggedInUser = user;
      localStorage.setItem('user',JSON.stringify(this.loggedInUser));
    }), (error: any) => {
      console.log(error);
      localStorage.setItem('user', JSON.stringify('null'));
    };
  }

  changePage(selectedPage: any){
    this.router.navigateByUrl(selectedPage);
  }

  onToggleSidenav(sidenav: MatSidenav){
    sidenav.toggle();
  }

  onClose(event: any, sidenav: MatSidenav){
    if (event === true) {
      sidenav.close();
    }
  }

  logout(){
    this.authService.logout();
  }

}
