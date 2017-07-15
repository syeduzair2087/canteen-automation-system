import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { StaffMember } from '../../../../models/staff-member.model';
import { StaffService } from '../../../../services/staff-service';
import { ToastService } from '../../../../services/toast-service';
import { LoaderService } from '../../../../services/loader-service';
import loadTheme = require('../../../../../js/admin');
import * as staffFilters from '../../../../pipes/filter-staff.pipe';
// declare var $: any;
@Component({
    selector: 'chef-component',
    templateUrl: 'chef.component.html'
})

export class ChefComponent {
    filterStaffName: string = '';
    filterStaffEmail: string = '';
    filterStaffContact: string = '';
    filterStaffCnic: string = '';
    filterStaffAddress: string = '';
    filterBy: string = 'name';
    chefStatus: string = 'active';

    ChefDetails: FirebaseListObservable<Array<StaffMember>>;

    // loader: boolean = false;

    selectedChef: StaffMember = {
        $key: '',
        name: '',
        email: '',
        address: '',
        cnic: '',
        contact: '',
        status: '',
        job_count: 0
    };
    constructor(private staffService: StaffService, private toastService: ToastService, private loaderService: LoaderService) { }

    ngOnInit() {
        this.ChefDetails = this.staffService.fetchChefs();

        setTimeout(() => {
            loadTheme();
        }, 10);
    }


    clickAddChef() {
        if ('$key' in this.selectedChef)
            delete this.selectedChef.$key;

        this.selectedChef = {
            name: '',
            email: '',
            cnic: '',
            contact: '',
            address: '',
            status: 'active',
            job_count: 0
        }
    }


    clickEditChef(chef: StaffMember) {
        this.selectedChef = {
            $key: chef.$key,
            name: chef.name,
            email: chef.email,
            cnic: chef.cnic,
            contact: chef.contact,
            address: chef.address,
            status: 'active',
            job_count: chef.job_count
        }
    }

    RemoveChef(key) {
        // this.loader = true;
        // $('<div class="backdropClass" ></div>').appendTo(document.body);
        this.loaderService.showLoader();
        this.staffService.removeStaffMember('chefs', key).then((success) => {
            this.loaderService.hideLoader();
            // this.loader = false;
            // $('.backdropClass').remove();
            this.toastService.showToast('Chef', 'Chef remove successfully!', 'success');
        }).catch((error) => {
            this.loaderService.hideLoader();
            // this.loader = false;
            // $('.backdropClass').remove();
            console.log(error);
            this.toastService.showToast('Chef', error, 'error');
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
        }, 10)
    }

    onChefStatusChange() {
        if (this.chefStatus == 'active')
            this.chefStatus = 'removed';
        else
            this.chefStatus = 'active';
    }
}