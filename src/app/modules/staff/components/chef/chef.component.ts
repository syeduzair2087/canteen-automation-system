import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { StaffMember } from '../../../../models/staff-member.model';
import { StaffService } from '../../../../services/staff-service';
import loadTheme = require('../../../../../js/admin');
import * as staffFilters from '../../../../pipes/filter-staff.pipe';

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

    ChefDetails: FirebaseListObservable<Array<StaffMember>>;

    selectedChef: StaffMember = {
        $key: '',
        name: '',
        email: '',
        address: '',
        cnic: '',
        contact: '',
        status: ''
    };
    constructor(private staffService: StaffService) { }

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
            status: 'active'
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
            status: 'active'
        }
    }

    RemoveChef(key) {
        this.staffService.removeStaffMember('chefs', key).then((success) => {
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
        }, 10)
    }
}