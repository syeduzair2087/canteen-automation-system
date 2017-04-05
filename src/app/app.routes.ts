import { Route, Routes, RouterModule } from '@angular/router';
import { FoodComponent } from './components/container/food/food.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/container/user/user.component';
import { StaffComponent } from './components/container/staff/staff.component';
import { LoginGuard, LogoutGuard } from './services/guard-service';

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
        // canActivate: [LogoutGuard]
    },
    {
        path: 'home',
        component: NavigationComponent,
        // canActivate: [LoginGuard],
        children: [
            {
                path: 'food',
                component: FoodComponent
                // outlet: 'container'
            },
            {
                path: 'staff',
                component: StaffComponent
                // outlet: 'container'
            },
            {
                path: 'users',
                component: UserComponent
                // outlet: 'container'
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