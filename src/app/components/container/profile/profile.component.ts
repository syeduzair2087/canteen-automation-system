import { Component } from '@angular/core';
import loadTheme = require('../../../../js/admin');
import { AccountService } from '../../../services/account-service';
import { StaffService } from '../../../services/staff-service';
import { StaffMember } from '../../../models/staff-member.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'profile-component',
    templateUrl: 'profile.component.html'
})

export class ProfileComponent {
    staffMember: StaffMember = {
        name: '',
        email: '',
        address: '',
        contact: '',
        cnic: '',
        status: ''
    }
    constructor(private accountService: AccountService, private staffService: StaffService) { }

    ngOnInit() {
        this.loadAdminData();
    }

    UpdateAdminInfo() {
        let key = this.staffMember.$key;
        delete this.staffMember.$key;
        this.staffService.editStaffMember('admins', key, this.staffMember).then((success) => {
            this.loadAdminData();
        }).catch((error) => {
            console.log(error);
        })
    }

    loadAdminData() {
        this.accountService.getStaffDetail().then((data: StaffMember) => {
            this.staffMember = data;
        })
    }
}