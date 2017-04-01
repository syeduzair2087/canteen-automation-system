import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

//COMPONENTS
import { NavigationComponent } from './components/navigation/navigation.component';
import { ContainerComponent } from './components/container/container.component';
import { FoodComponent } from './components/container/food/food.component';
import { FoodModalComponent } from './components/container/food/food-modal/food-modal.component';
import { PreferenceModalComponent } from './components/container/food/food-modal/preference-modal/preference-modal.component';
import { LoginComponent } from './components/login/login.component';

//MODULES
import { RoutingModule } from './app.routes';
import { AngularFireModule } from 'angularfire2';
import { TagInputModule } from 'ng2-tag-input';

//SERVICES
import { FoodService } from './services/food-service';

//CONFIG
const config = {
  apiKey: "AIzaSyCL9zQkpCE5Hfv15Lb_O6Ih98KFchCG0Ok",
  authDomain: "canteenautomationsystem.firebaseapp.com",
  databaseURL: "https://canteenautomationsystem.firebaseio.com",
  storageBucket: "canteenautomationsystem.appspot.com",
  messagingSenderId: "490551661425"
};

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ContainerComponent,
    FoodComponent,
    FoodModalComponent,
    PreferenceModalComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule,
    TagInputModule,
    AngularFireModule.initializeApp(config)
  ],
  providers: [
    FoodService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
