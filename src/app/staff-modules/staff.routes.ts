import { Route, Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ChefComponent } from './chef/chef.component';
import { DeliveryBoyComponent } from './delivery-boy/delivery-boy.component';

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