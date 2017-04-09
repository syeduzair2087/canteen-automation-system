import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

// PIPE
import { FilterUserByNamePipe, FilterUserByEmailPipe, FilterUserByContactPipe, FilterUserByCabinPipe } from './pipes/filter-user.pipe';
import { ReversePipe } from './pipes/reverse.pipe';

//COMPONENTS
import { NavigationComponent } from './components/navigation/navigation.component';
import { ContainerComponent } from './components/container/container.component';
import { FoodComponent } from './components/container/food/food.component';
import { FoodModalComponent } from './components/container/food/food-modal/food-modal.component';
import { PreferenceModalComponent } from './components/container/food/food-modal/preference-modal/preference-modal.component';
import { OrderComponent } from './components/container/order/order.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/container/user/user.component';
import { UserDetailsComponent } from './components/container/user/user-details.component';
import { OrderDetailsComponent } from './components/container/user/order-details.component';
import { StaffComponent } from './components/container/staff/staff.component';

//MODULES
import { RoutingModule } from './app.routes';
import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';
import { TagInputModule } from 'ng2-tag-input';
import { StaffModule } from './staff-modules/staff.module';
 import { staffRouteModule } from './staff-modules/staff.routes';

//SERVICES
import { FoodService } from './services/food-service';
import { AccountService } from './services/account-service';
import { UserService } from './services/user-service';
import { StaffService } from './services/staff-service';
import { OrderService } from './services/order-service';
import { LoginGuard, LogoutGuard } from './services/guard-service';

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
    OrderComponent,
    LoginComponent,
    UserComponent,
    UserDetailsComponent,
    OrderDetailsComponent,
    FilterUserByNamePipe,
    FilterUserByEmailPipe,
    FilterUserByContactPipe,
    FilterUserByCabinPipe,
    ReversePipe,
    StaffComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule,
    TagInputModule,
     StaffModule,
    AngularFireModule.initializeApp(config, firebaseAuthConfig)
  ],
  providers: [
    FoodService,
    AccountService,
    UserService,
    StaffService,
    OrderService,
    LoginGuard,
    LogoutGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
