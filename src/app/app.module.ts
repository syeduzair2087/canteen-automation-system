import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

// PIPES
import { FilterUserByNamePipe, FilterUserByEmailPipe, FilterUserByContactPipe, FilterUserByCabinPipe } from './pipes/filter-user.pipe';
import { FilterFoodByNamePipe } from './pipes/filter-food.pipe';
import { FilterOrdersByStatusPipe } from './pipes/filter-order.pipe';
import { ReversePipe } from './pipes/reverse.pipe';
import { InventoryFilterByName, InventoryFilterByQuantity } from './pipes/filter-inventory-pipe';

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
import { ProfileComponent } from './components/container/profile/profile.component';
import { InventoryComponent } from './components/container/inventory/inventory.component';
import { InventoryModalComponent } from './components/container/inventory/inventory-modal/inventory-modal.component';
import { InventoryItemConponent } from './components/container/food/food-modal/inventory-item-modal/inventory-item-modal.component';
//MODULES
import { RoutingModule } from './app.routes';
import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';
import { TagInputModule } from 'ng2-tag-input';
import { StaffModule } from './modules/staff/staff.module';
import { staffRouteModule } from './modules/staff/staff.routes';

//SERVICES
import { FoodService } from './services/food-service';
import { AccountService } from './services/account-service';
import { UserService } from './services/user-service';
import { StaffService } from './services/staff-service';
import { OrderService } from './services/order-service';
import { LoginGuard, LogoutGuard } from './services/guard-service';
import { InventoryService } from './services/inventory-service'


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
    FilterFoodByNamePipe,
    UserDetailsComponent,
    OrderDetailsComponent,
    FilterUserByNamePipe,
    FilterUserByEmailPipe,
    FilterUserByContactPipe,
    FilterUserByCabinPipe,
    FilterOrdersByStatusPipe,
    ReversePipe,
    StaffComponent,
    ProfileComponent,
    InventoryComponent,
    InventoryModalComponent,
    InventoryFilterByName,
    InventoryFilterByQuantity,
    InventoryItemConponent
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
    LogoutGuard,
    InventoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
