import { Route, Routes, RouterModule } from '@angular/router';
import { FoodComponent } from './components/container/food/food.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/container/user/user.component';
import { StaffComponent } from './components/container/staff/staff.component';

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
        path: 'home',
        component: NavigationComponent,
        children: [
            {
                path: '',
                component: StaffComponent,
                outlet: 'container'
            }
            // {
            //     path: '',
            //     component: UserComponent,
            //     outlet: 'container'
            // }
            // ,
            // {
            //     path: '',
            //     component: FoodComponent,
            //     outlet: 'container'
            // }
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    // {
    //     path: ':user',
    //     component: UserComponent
    // },
    fallbackRoute,
    baseRoute
];

export const RoutingModule = RouterModule.forRoot(routes, { useHash: true });