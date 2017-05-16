import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FirebaseListObservable } from 'angularfire2';
import loadTheme = require('../../../../../../js/admin');
import { StaffMember } from '../../../../../models/staff-member.model';
import { AccountService } from '../../../../../services/account-service';
import { StaffService } from '../../../../../services/staff-service';

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
    constructor(private accountService: AccountService) {
    }

    ////////INPUT////////

    @Input() selectedAdmin: StaffMember;
    @Input() staffService: StaffService;

    ////////EVENTS////////

    ngOnInit() {
     console.log('click');
        setTimeout(() => {
            loadTheme();
        }, 10)
    }

    ////////BUTTONS////////


    clickConfirm() {
        if ('$key' in this.selectedAdmin) {
            let key = this.selectedAdmin.$key;
            delete this.selectedAdmin.$key
            this.staffService.editStaffMember('admins', key, this.selectedAdmin).then((success) => {

            }).catch((error) => {
                console.log(error);
            });
        }
        else {
            this.accountService.createUser(this.selectedAdmin.email, "u123456", this.selectedAdmin.name).then((userId: string) => {
                console.log(userId);
                this.staffService.addStaffMember('admins', userId, this.selectedAdmin).then((success) => {

                }).catch((error) => {
                    console.log(error);
                });
            }).catch((error) => {
                console.log(error);
            });
        }
    }
    submitForm(){}
}