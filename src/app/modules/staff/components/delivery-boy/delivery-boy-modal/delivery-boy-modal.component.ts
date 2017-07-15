import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FirebaseListObservable } from 'angularfire2';
import { StaffMember } from '../../../../../models/staff-member.model';
import { AccountService } from '../../../../../services/account-service';
import { StaffService } from '../../../../../services/staff-service';
import { ToastService } from '../../../../../services/toast-service';
import { LoaderService } from '../../../../../services/loader-service';
declare var $: any;
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
    // loader: boolean = false;
    constructor(private accountService: AccountService, private loaderService: LoaderService) { }

    ////////INPUT////////

    @Input() selectedDeliveryBoy: StaffMember;
    @Input() staffService: StaffService;
    @Input() toastService: ToastService;

    ////////EVENTS////////

    ngOnInit() {

    }

    ////////BUTTONS////////
    clickConfirm() {
        // this.loader = true;
        // $('<div class="backdropClass" ></div>').appendTo(document.body);
        this.loaderService.showLoader();
        if (this.selectedDeliveryBoy.$key) {
            let key = this.selectedDeliveryBoy.$key;
            delete this.selectedDeliveryBoy.$key;
            this.staffService.editStaffMember('delivery_boys', key, this.selectedDeliveryBoy).then((success) => {
                this.loaderService.hideLoader();
                $('#deliveryBoyModal').modal('hide');
                this.toastService.showToast('Delivery boy', 'Delivery boy edit successfully!', 'success');
            }).catch((error) => {
                this.loaderService.hideLoader();
                $('#deliveryBoyModal').modal('hide');
                console.log(error);
                this.toastService.showToast('Delivery boy', error, 'error');
            })
        }
        else {
            this.accountService.createUser(this.selectedDeliveryBoy.email, "u123456", this.selectedDeliveryBoy.name).then((userId: string) => {
                this.staffService.addStaffMember('delivery_boys', userId, this.selectedDeliveryBoy).then((success) => {
                    this.loaderService.hideLoader();
                    $('#deliveryBoyModal').modal('hide');
                    this.toastService.showToast('Delivery boy', 'Delivery boy added successfully!', 'success');
                }).catch((error) => {
                    this.loaderService.hideLoader();
                    $('#deliveryBoyModal').modal('hide');
                    this.toastService.showToast('Delivery boy', error, 'error');
                });
            }).catch((error) => {
                this.loaderService.hideLoader();
                $('#deliveryBoyModal').modal('hide');
                this.toastService.showToast('Delivery boy', error, 'error');
            });
        }
    }
}