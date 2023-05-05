import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './shared/menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { FlexLayoutModule } from "@angular/flex-layout";
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { FIREBASE_OPTIONS } from "@angular/fire/compat";
import { DatePipe } from './shared/pipes/date.pipe';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatListModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    FlexLayoutModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
