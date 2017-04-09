import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

// COMPONENTS

import { AdminComponent } from './components/admin/admin.component';
import { ChefComponent } from './components/chef/chef.component';
import { DeliveryBoyComponent } from './components/delivery-boy/delivery-boy.component';
import { AdminModalComponent } from './components/admin/admin-modal/admin-modal.component';
import { ChefModalComponent } from './components/chef/chef-modal/chef-modal.component';
import { DeliveryBoyModalComponent } from './components/delivery-boy/delivery-boy-modal/delivery-boy-modal.component';

// PIPE
import { StaffMemberFilterByName, StaffMemberFilterByEmail, StaffMemberFilterByContact, StaffMemberFilterByCnic, StaffMemberFilterByAddress } from '../../pipes/filter-staff.pipe';

// SERVICE
import { StaffService } from '../../services/staff-service';

// ROUTE
// import { staffRouteModule } from './staff.routes';

@NgModule({
    declarations: [
        AdminComponent,
        ChefComponent,
        DeliveryBoyComponent,
        StaffMemberFilterByName,
        StaffMemberFilterByEmail,
        StaffMemberFilterByContact,
        StaffMemberFilterByCnic,
        StaffMemberFilterByAddress,
        AdminModalComponent,
        ChefModalComponent,
        DeliveryBoyModalComponent
    ],
    imports: [
        HttpModule,
        CommonModule,
        FormsModule,
        // staffRouteModule
    ],
    providers: [
        StaffService
    ]
})
export class StaffModule {
}