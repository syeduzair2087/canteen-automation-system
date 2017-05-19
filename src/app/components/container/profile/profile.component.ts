import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import loadTheme = require('../../../../js/admin');
import { AccountService } from '../../../services/account-service';
import { StaffService } from '../../../services/staff-service';
import { ToastService } from '../../../services/toast-service';
import { StaffMember } from '../../../models/staff-member.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'profile-component',
    templateUrl: 'profile.component.html',
      styles: [
        `.onerror{
    border: 1px solid red;}
    .font-setting{
            padding: 5px;
    font-size: 1.2em;
    }`]
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
    constructor(private accountService: AccountService, private staffService: StaffService, private toastService: ToastService) { }

    ngOnInit() {
        this.loadAdminData();
    }

    UpdateAdminInfo() {
        let key = this.staffMember.$key;
        delete this.staffMember.$key;
        this.staffService.editStaffMember('admins', key, this.staffMember).then((success) => {
            this.toastService.showToast('Profile', 'Profile updated successfully!', 'success');
            this.loadAdminData();
        }).catch((error) => {
            console.log(error);
            this.toastService.showToast('Profile', error, 'error');
        })
    }

    loadAdminData() {
        this.accountService.getStaffDetail().then((data: StaffMember) => {
            this.staffMember = data;
            console.log(this.staffMember)
        })
    }
}