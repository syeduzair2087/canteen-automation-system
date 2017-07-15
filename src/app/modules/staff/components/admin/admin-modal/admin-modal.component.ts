import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FirebaseListObservable } from 'angularfire2';
import loadTheme = require('../../../../../../js/admin');
import { StaffMember } from '../../../../../models/staff-member.model';
import { AccountService } from '../../../../../services/account-service';
import { StaffService } from '../../../../../services/staff-service';
import { ToastService } from '../../../../../services/toast-service';
import { LoaderService } from '../../../../../services/loader-service';
declare var $: any;
@Component({
    selector: 'admin-modal',
    templateUrl: 'admin-modal.component.html',
    styles: [
        `.onerror{
    border: 1px solid red;}
    .font-setting{
            padding: 5px;
    font-size: 1.2em;
    }`]
})

export class AdminModalComponent {
    // loader: boolean = false;
    constructor(private accountService: AccountService, private loaderService: LoaderService) {
    }

    ////////INPUT////////

    @Input() selectedAdmin: StaffMember;
    @Input() staffService: StaffService;
    @Input() toastService: ToastService;

    ////////EVENTS////////

    ngOnInit() {
        console.log('click');
        setTimeout(() => {
            loadTheme();
        }, 10)
    }

    ////////BUTTONS////////


    clickConfirm() {
        // this.loader = true;
        //  $('<div class="backdropClass" ></div>').appendTo(document.body);
        this.loaderService.showLoader();
        if ('$key' in this.selectedAdmin) {
            let key = this.selectedAdmin.$key;
            delete this.selectedAdmin.$key
            this.staffService.editStaffMember('admins', key, this.selectedAdmin).then((success) => {
                // this.loader = false;
                // $('.backdropClass').remove();
                this.loaderService.hideLoader();
                $('#adminModal').modal('hide');
                this.toastService.showToast('Administrator', 'Admin edit successfully!', 'success');
            }).catch((error) => {
                console.log(error);
                this.loaderService.hideLoader();
                $('#adminModal').modal('hide');
                this.toastService.showToast('Administrator', error, 'error');
            });
        }
        else {
            this.accountService.createUser(this.selectedAdmin.email, "u123456", this.selectedAdmin.name).then((userId: string) => {
                console.log(userId);
                this.staffService.addStaffMember('admins', userId, this.selectedAdmin).then((success) => {
                    this.loaderService.hideLoader();
                    $('#adminModal').modal('hide');
                    this.toastService.showToast('Administrator', 'Admin added successfully!', 'success');
                }).catch((error) => {
                    this.loaderService.hideLoader();
                    $('#adminModal').modal('hide');
                    console.log(error);
                    this.toastService.showToast('Administrator', error, 'error');
                });
            }).catch((error) => {
                this.loaderService.hideLoader();
                $('#adminModal').modal('hide');
                console.log(error);
                this.toastService.showToast('Administrator', error, 'error');
            });
        }
    }
    submitForm() { }
}