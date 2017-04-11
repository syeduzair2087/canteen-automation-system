import { Component, OnInit } from '@angular/core';
import { StaffService } from '../../../../services/staff-service';
import { StaffMember } from '../../../../models/staff-member.model';
import { FirebaseListObservable } from 'angularfire2';
import loadTheme = require('../../../../../js/admin');
import * as staffFilters from '../../../../pipes/filter-staff.pipe';

@Component({
    selector: 'admin-component',
    templateUrl: 'admin.component.html'
})
export class AdminComponent {
    filterStaffName: string = '';
    filterStaffEmail: string = '';
    filterStaffContact: string = '';
    filterStaffCnic: string = '';
    filterStaffAddress: string = '';
    filterBy: string = 'name';

    adminDetails: FirebaseListObservable<Array<StaffMember>>;

    selectedAdmin: StaffMember = {
        $key: '',
        name: '',
        email: '',
        address: '',
        cnic: '',
        contact: '',
        status: '',
    };

    constructor(private staffService: StaffService) { }

    ngOnInit() {
        this.adminDetails = this.staffService.fetchAdmins();

        setTimeout(() => {
            loadTheme();
        }, 10);
    }

    clickAddAdmin() {
        if ('$key' in this.selectedAdmin)
            delete this.selectedAdmin.$key;

        this.selectedAdmin = {
            name: '',
            email: '',
            cnic: '',
            contact: '',
            address: '',
            status: 'Active'
        }
    }

    clickEditAdmin(admin: StaffMember) {
        this.selectedAdmin = {
            $key: admin.$key,
            name: admin.name,
            email: admin.email,
            cnic: admin.cnic,
            contact: admin.contact,
            address: admin.address,
            status: 'Active'
        }
    }

    RemoveAdmin(key) {
        console.log(key);
        this.staffService.removeStaffMember('admins', key).then((success) => {
        }).catch((error) => {
            console.log(error);
        });
    }

    onFilterTypeChange() {
        this.filterStaffName= '';
        this.filterStaffEmail = '';
        this.filterStaffContact = '';
        this.filterStaffCnic = '';
        this.filterStaffAddress = '';

        setTimeout(() => {
            loadTheme();
        }, 10);
    }
}