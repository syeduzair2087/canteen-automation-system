import { Route, Routes, RouterModule } from '@angular/router';
import { FoodComponent } from './components/container/food/food.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LoginComponent } from './components/login/login.component';

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
                component: FoodComponent,
                outlet: 'container'
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    fallbackRoute,
    baseRoute
];

export const RoutingModule = RouterModule.forRoot(routes, { useHash: true });