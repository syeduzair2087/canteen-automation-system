import { Component, OnInit } from '@angular/core';
import { StaffService } from '../../../../services/staff-service';
import { StaffMember } from '../../../../models/staff-member.model';
import { FirebaseListObservable } from 'angularfire2';
import loadTheme = require('../../../../../js/admin');
import * as staffFilters from '../../../../pipes/filter-staff.pipe';
import { ToastService } from '../../../../services/toast-service';

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

    adminStatus: string = 'active';
    adminId: string;

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

    constructor(private staffService: StaffService, private toastService: ToastService) { }

    ngOnInit() {
        this.adminDetails = this.staffService.fetchAdmins();
        
        this.adminDetails.forEach(element => {
            console.log(element);
        });

        this.adminId = localStorage.getItem('uid');

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
            status: 'active'
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
            status: 'active'
        }
    }

    RemoveAdmin(key) {
        console.log(key);
        this.staffService.removeStaffMember('admins', key).then((success) => {
            this.toastService.showToast('Administrator', 'Admin removed successfully!', 'success');
        }).catch((error) => {
            console.log(error);
            this.toastService.showToast('Administrator', error.message,'error');
        });
    }

    onFilterTypeChange() {
        this.filterStaffName = '';
        this.filterStaffEmail = '';
        this.filterStaffContact = '';
        this.filterStaffCnic = '';
        this.filterStaffAddress = '';

        setTimeout(() => {
            loadTheme();
        }, 10);
    }

    onAdminStatusChange() {
        if (this.adminStatus == 'active')
            this.adminStatus = 'removed';
        else
            this.adminStatus = 'active';
    }
}