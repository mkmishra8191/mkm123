import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {environment} from '../environments/environment.prod'
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {ItemComponent} from './components/item/item.component'
import {ItemsService} from './services/items.service';


import { AutofocusFixModule } from 'ngx-autofocus-fix';




 
@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
  
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'angularfs'),
    AngularFirestoreModule,
    FormsModule,

      AutofocusFixModule.forRoot(),

      
    
  ],
  providers: [ItemsService],
  bootstrap: [AppComponent]
})
export class AppModule { }