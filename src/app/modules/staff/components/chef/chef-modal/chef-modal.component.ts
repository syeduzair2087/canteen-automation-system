import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FirebaseListObservable } from 'angularfire2';
import { StaffMember } from '../../../../../models/staff-member.model';
import { AccountService } from '../../../../../services/account-service';
import { StaffService } from '../../../../../services/staff-service';
import { ToastService } from '../../../../../services/toast-service';
@Component({
    selector: 'chef-modal',
    templateUrl: 'chef-modal.component.html',
     styles: [
        `.text-font{
            padding: 5px;
    font-size: 1.2em;
    }`]
})

export class ChefModalComponent {
    constructor(private accountService: AccountService) {}

    ////////INPUT////////

    @Input() selectedChef: StaffMember;
    @Input() staffService: StaffService;
    @Input() toastService: ToastService;  

    ////////EVENTS////////

    ngOnInit() { }

    ////////BUTTONS////////

    clickConfirm() {
        if (this.selectedChef.$key) {
            let key = this.selectedChef.$key;
            delete this.selectedChef.$key
            this.staffService.editStaffMember('chefs', key, this.selectedChef).then((success) => {
                this.toastService.showToast('Chef', 'Chef edit successfully!', 'success');
            }).catch((error) => {
                console.log(error);
                this.toastService.showToast('Chef', error, 'error');
            })
        }
        else {
            this.accountService.createUser(this.selectedChef.email, 'u123456', this.selectedChef.name).then((userId: string) => {
                this.staffService.addStaffMember('chefs', userId, this.selectedChef).then((success) => {
                    this.toastService.showToast('Chef', 'Chef added successfully!', 'success');
                }).catch((error) => {
                    console.log(error);
                    this.toastService.showToast('Chef', error, 'error');
                });
            }).catch((error) => {
                console.log(error);
                this.toastService.showToast('Chef', error, 'error');
            });

        }
    }
}