import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
//import { environment } from '../environments/environment.prod'
import {environment } from '../environments/environment'
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AsyncPipe } from '@angular/common';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { RouteReuseStrategy } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AdminsidebarComponent } from './adminsidebar/adminsidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot({innerHTMLTemplatesEnabled: true}), 
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    NgbModule,
    FormsModule
  ],
  providers: 
  [
    AsyncPipe,
    {
      provide: FIREBASE_OPTIONS, 
      useValue: environment.firebase
    },
    { 
      provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy 
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
