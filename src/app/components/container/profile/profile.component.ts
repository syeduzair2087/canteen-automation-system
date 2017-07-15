import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import loadTheme = require('../../../../js/admin');
import { AccountService } from '../../../services/account-service';
import { StaffService } from '../../../services/staff-service';
import { ToastService } from '../../../services/toast-service';
import { LoaderService } from '../../../services/loader-service';
import { StaffMember } from '../../../models/staff-member.model';
import { Subscription } from 'rxjs';
// declare var $: any;
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
    // loader: boolean = false;

    staffMember: StaffMember = {
        name: '',
        email: '',
        address: '',
        contact: '',
        cnic: '',
        status: ''
    }
    constructor(private accountService: AccountService, private staffService: StaffService, private toastService: ToastService, private loaderService: LoaderService) { }

    ngOnInit() {
        this.loadAdminData();
    }

    UpdateAdminInfo() {
        this.loaderService.showLoader();
        let key = this.staffMember.$key;
        delete this.staffMember.$key;
        this.staffService.editStaffMember('admins', key, this.staffMember).then((success) => {
            this.loaderService.hideLoader();
            this.toastService.showToast('Profile', 'Profile updated successfully!', 'success');
            this.loadAdminData();
        }).catch((error) => {
            this.loaderService.hideLoader();
            console.log(error);
            this.toastService.showToast('Profile', error, 'error');
        })
    }

    loadAdminData() {
        this.accountService.getStaffDetail().then((data: StaffMember) => {
            this.staffMember = data;
        })
    }
}