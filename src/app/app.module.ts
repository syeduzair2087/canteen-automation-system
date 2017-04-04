import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

// PIPE
import { UserNameFilter } from './pipe/name.pipe'

//COMPONENTS
import { NavigationComponent } from './components/navigation/navigation.component';
import { ContainerComponent } from './components/container/container.component';
import { FoodComponent } from './components/container/food/food.component';
import { FoodModalComponent } from './components/container/food/food-modal/food-modal.component';
import { PreferenceModalComponent } from './components/container/food/food-modal/preference-modal/preference-modal.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/container/user/user.component';
import { StaffComponent } from './components/container/staff/staff.component';
import { AdminModalComponent } from './components/container/staff/admin-modal/admin-modal.component';
import { ChefModalComponent } from './components/container/staff/chef-modal/chef-modal.component';
import { DeliveryBoyModalComponent } from './components/container/staff/delivery-boy-modal/delivery-boy-modal.component';

//MODULES
import { RoutingModule } from './app.routes';
import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';
import { TagInputModule } from 'ng2-tag-input';

//SERVICES
import { FoodService } from './services/food-service';
import { AccountService } from './services/account-service';
import { UserService } from './services/user-service';
import { StaffService } from './services/staff-service';

//CONFIG
const config = {
  apiKey: "AIzaSyCL9zQkpCE5Hfv15Lb_O6Ih98KFchCG0Ok",
  authDomain: "canteenautomationsystem.firebaseapp.com",
  databaseURL: "https://canteenautomationsystem.firebaseio.com",
  storageBucket: "canteenautomationsystem.appspot.com",
  messagingSenderId: "490551661425"
};

const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password,
};

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ContainerComponent,
    FoodComponent,
    FoodModalComponent,
    PreferenceModalComponent,
    LoginComponent,
    UserComponent,
    UserNameFilter,
    StaffComponent,
    StaffComponent,
    AdminModalComponent,
    ChefModalComponent,
    DeliveryBoyModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule,
    TagInputModule,
    AngularFireModule.initializeApp(config, firebaseAuthConfig)
  ],
  providers: [
    FoodService,
    AccountService,
    UserService,
    StaffService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
