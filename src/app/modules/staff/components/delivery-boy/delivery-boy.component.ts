import { Component } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2'
import { StaffService } from '../../../../services/staff-service';
import { ToastService } from '../../../../services/toast-service';
import { LoaderService } from '../../../../services/loader-service';
import { StaffMember } from '../../../../models/staff-member.model';
import loadTheme = require('../../../../../js/admin');
import * as staffFilters from '../../../../pipes/filter-staff.pipe';
// declare var $: any;
@Component({
    selector: 'delivery-boy-component',
    templateUrl: 'delivery-boy.component.html'
})
export class DeliveryBoyComponent {
    filterStaffName: string = '';
    filterStaffEmail: string = '';
    filterStaffContact: string = '';
    filterStaffCnic: string = '';
    filterStaffAddress: string = '';
    filterBy: string = 'name';
    deliveryBoyStatus: string = 'active';

    deliveryBoyDetails: FirebaseListObservable<Array<StaffMember>>;

    // loader: boolean = false;

    selectedDeliveryBoy: StaffMember = {
        $key: '',
        name: '',
        email: '',
        address: '',
        cnic: '',
        contact: '',
        status: ''
    };

    constructor(private staffService: StaffService, private toastService: ToastService, private loaderService: LoaderService) { }

    ngOnInit() {
        this.deliveryBoyDetails = this.staffService.fetchDeliveryBoys();

        setTimeout(() => {
            loadTheme();
        }, 10);
    }

    clickAddDeliveryBoy() {
        if ('$key' in this.selectedDeliveryBoy)
            delete this.selectedDeliveryBoy.$key;

        this.selectedDeliveryBoy = {
            name: '',
            email: '',
            cnic: '',
            contact: '',
            address: '',
            status: 'active'
        }
    }

    clickEditDeliveryBoy(deliveryBoy: StaffMember) {
        this.selectedDeliveryBoy = {
            $key: deliveryBoy.$key,
            name: deliveryBoy.name,
            email: deliveryBoy.email,
            cnic: deliveryBoy.cnic,
            contact: deliveryBoy.contact,
            address: deliveryBoy.address,
            status: 'active'
        }
    }

    RemoveDeliveryBoy(key) {
        // this.loader = true;
        // $('<div class="backdropClass" ></div>').appendTo(document.body);
        this.loaderService.showLoader();
        this.staffService.removeStaffMember('delivery_boys', key).then((success) => {
            // this.loader = false;
            // $('.backdropClass').remove();
            this.loaderService.hideLoader();
            this.toastService.showToast('Delivery boy', 'Delivery boy remove successfully!', 'success');
        }).catch((error) => {
            // this.loader = false;
            // $('.backdropClass').remove();
            this.loaderService.hideLoader();
            console.log(error);
            this.toastService.showToast('Delivery boy', error, 'error');
        });
    }

    onFilterTypeChange() {
        this.filterStaffName = '';
        this.filterStaffEmail = '';
        this.filterStaffContact = '';
        this.filterStaffCnic = '';
        this.filterStaffAddress = '';

        setTimeout(() => {
            loadTheme();
        }, 10);
    }

    onDeliveryBoyStatusChange() {
        if (this.deliveryBoyStatus == 'active')
            this.deliveryBoyStatus = 'removed';
        else
            this.deliveryBoyStatus = 'active';
    }
}