import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FirebaseListObservable } from 'angularfire2';
import { StaffMember } from '../../../../../models/staff-member.model';
import { AccountService } from '../../../../../services/account-service';
import { StaffService } from '../../../../../services/staff-service';
@Component({
    selector: 'delivery-boy-modal',
    templateUrl: 'delivery-boy-modal.component.html',
     styles: [
        `.text-font{
            padding: 5px;
    font-size: 1.2em;
    }`]
})

export class DeliveryBoyModalComponent {
    constructor(private accountService: AccountService) { }

    ////////INPUT////////

    @Input() selectedDeliveryBoy: StaffMember;
    @Input() staffService: StaffService;

    ////////EVENTS////////

    ngOnInit() {

    }

    ////////BUTTONS////////
    clickConfirm() {
        if (this.selectedDeliveryBoy.$key) {
            let key = this.selectedDeliveryBoy.$key;
            delete this.selectedDeliveryBoy.$key;
            this.staffService.editStaffMember('delivery_boys', key, this.selectedDeliveryBoy).then((success) => {

            }).catch((error) => {
                console.log(error);
            })
        }
        else {
            this.accountService.createUser(this.selectedDeliveryBoy.email, "u123456", this.selectedDeliveryBoy.name).then((userId: string) => {
                this.staffService.addStaffMember('delivery_boys', userId, this.selectedDeliveryBoy).then((success) => { }).catch((error) => { });
            }).catch((error) => { });
        }
    }
}