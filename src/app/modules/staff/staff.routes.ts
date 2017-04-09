import { Route, Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { ChefComponent } from './components/chef/chef.component';
import { DeliveryBoyComponent } from './components/delivery-boy/delivery-boy.component';

export const staffRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent
    },
    {
        path: 'chef',
        component: ChefComponent
    },
    {
        path: 'delivery_boy',
        component: DeliveryBoyComponent
    },
    {
        path: '',
        redirectTo: 'admin',
        pathMatch: 'full'
    }
];

export const staffRouteModule = RouterModule.forChild(staffRoutes);