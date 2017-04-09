import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

// COMPONENTS

import { AdminComponent } from './admin/admin.component';
import { ChefComponent } from './chef/chef.component';
import { DeliveryBoyComponent } from './delivery-boy/delivery-boy.component';
import { AdminModalComponent } from './admin/admin-modal/admin-modal.component';
import { ChefModalComponent } from './chef/chef-modal/chef-modal.component';
import { DeliveryBoyModalComponent } from './delivery-boy/delivery-boy-modal/delivery-boy-modal.component';

// PIPE
import { StaffNameFilter } from '../pipes/staff-filter.pipe';

// SERVICE
import { StaffService } from '../services/staff-service';

// ROUTE
import { staffRouteModule } from '../staff-modules/staff.routes';

@NgModule({
    declarations: [
        AdminComponent,
        ChefComponent,
        DeliveryBoyComponent,
        StaffNameFilter,
        AdminModalComponent,
        ChefModalComponent,
        DeliveryBoyModalComponent
    ],
    imports: [
        HttpModule,
        CommonModule,
        FormsModule,
        staffRouteModule
    ],
    providers: [
        StaffService
    ]
})
export class StaffModule {
}