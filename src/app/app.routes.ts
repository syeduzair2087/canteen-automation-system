import { Route, Routes, RouterModule } from '@angular/router';
import { FoodComponent } from './components/container/food/food.component';
import { OrderComponent } from './components/container/order/order.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/container/user/user.component';
import { UserDetailsComponent } from './components/container/user/user-details.component';
import { OrderDetailsComponent } from './components/container/user/order-details.component';
import { StaffComponent } from './components/container/staff/staff.component';
import { LoginGuard, LogoutGuard } from './services/guard-service';
import { staffRoutes, staffRouteModule } from "./staff-modules/staff.routes";
// import { AdminComponent } from './staff-modules/admin/admin.component';
// import { ChefComponent } from './staff-modules/chef/chef.component';
// import { DeliveryBoyComponent } from './staff-modules/delivery-boy/delivery-boy.component';


const baseRoute: Route = {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
};

const fallbackRoute: Route = {
    path: '*',
    redirectTo: 'login',
    pathMatch: 'full'
};

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [LogoutGuard]
    },
    {
        path: 'home',
        component: NavigationComponent,
        canActivate: [LoginGuard],
        children: [
            {
                path: 'food',
                component: FoodComponent
            },
            {
                path: 'orders',
                component: OrderComponent
            },
            {
                path: 'staff',
                component: StaffComponent,
                children: [
                    ...staffRoutes
                ]
            },
            {
                path: 'users',
                component: UserComponent
            },
            {
                path: 'users/:userId/:userName',
                component: UserDetailsComponent
            },
            {
                path: 'orders/:orderId',
                component: OrderDetailsComponent
            },
            {
                path: '',
                redirectTo: 'food',
                pathMatch: 'full'
            }
        ]
    },
    baseRoute,
    fallbackRoute
];

export const RoutingModule = RouterModule.forRoot(routes, { useHash: true });