import { Component, OnInit } from '@angular/core';
import { StaffService } from '../../../../services/staff-service';
import { StaffMember } from '../../../../models/staff-member.model';
import { FirebaseListObservable } from 'angularfire2';
import loadTheme = require('../../../../../js/admin');
import * as staffFilters from '../../../../pipes/filter-staff.pipe';
import { ToastService } from '../../../../services/toast-service';
import { LoaderService } from '../../../../services/loader-service';
// declare var $: any;

@Component({
    selector: 'admin-component',
    templateUrl: 'admin.component.html',
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

    // loader: boolean = false;

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

    constructor(private staffService: StaffService, private toastService: ToastService, private loaderService: LoaderService) { }

    ngOnInit() {
        this.adminDetails = this.staffService.fetchAdmins();
        
        this.adminId = localStorage.getItem('uid');
// $(document.body).modal({ backdrop: 'static', keyboard: false });
// setTimeout(function() {
//     $('.modal-backdrop').remove();
//     console.log('asa');
// }, 5000);

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
        // this.loader = true;
        // $(document.body).modal({ backdrop: 'static', keyboard: false });
        //  $('<div class="backdropClass" ></div>').appendTo(document.body);
        this.loaderService.showLoader();
        console.log(key);
        this.staffService.removeStaffMember('admins', key).then((success) => {
            this.loaderService.hideLoader();
            // this.loader = false;
            // $('.backdropClass').remove();
            this.toastService.showToast('Administrator', 'Admin removed successfully!', 'success');
        }).catch((error) => {
            // this.loader = false;
            // $('.backdropClass').remove();
            this.loaderService.hideLoader();
            console.log(error);
            this.toastService.showToast('Administrator', error.message, 'error');
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