import { Route, Routes, RouterModule } from '@angular/router';
import { FoodComponent } from './components/container/food/food.component';
import { NavigationComponent } from './components/navigation/navigation.component';

const baseRoute: Route = {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
};

const fallbackRoute: Route = {
    path: '**',
    redirectTo: 'home',
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
    }
];

export const RoutingModule = RouterModule.forRoot(routes, {useHash: true});