import { Component, OnInit, Input } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { Staff } from '../../../../models/staff.model';
import { AccountService } from '../../../../services/account-service';
import { StaffService } from '../../../../services/staff-service';
@Component({
    selector: 'delivery-boy-modal',
    templateUrl: 'delivery-boy-modal.component.html'
})

export class DeliveryBoyModalComponent {
    constructor(private accountService: AccountService) { }

    ////////INPUT////////

    @Input() selectedDeliveryBoy: Staff;
    @Input() staffService: StaffService;

    ////////EVENTS////////

    ngOnInit() {

    }

    ////////BUTTONS////////
    clickConfirm() {
        if (this.selectedDeliveryBoy.$key) {
            let key = this.selectedDeliveryBoy.$key;
            delete this.selectedDeliveryBoy.$key;
            this.staffService.editDeliveryBoy(key, this.selectedDeliveryBoy).then((success) => {

            }).catch((error) => {

            })
        }
        else {
            this.accountService.createUser(this.selectedDeliveryBoy.email, "u123456", this.selectedDeliveryBoy.name).then((success) => {
                this.staffService.addDeliveryBoy(this.selectedDeliveryBoy).then((success) => {

                }).catch((error) => {

                });
            }).catch((error) => {

            });
        }
    }
}