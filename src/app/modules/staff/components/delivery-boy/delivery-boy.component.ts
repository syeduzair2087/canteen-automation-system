import { Component } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2'
import { StaffService } from '../../../../services/staff-service';
import { StaffMember } from '../../../../models/staff-member.model';
import loadTheme = require('../../../../../js/admin');
import * as staffFilters from '../../../../pipes/filter-staff.pipe';

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

    selectedDeliveryBoy: StaffMember = {
        $key: '',
        name: '',
        email: '',
        address: '',
        cnic: '',
        contact: '',
        status: ''
    };

    constructor(private staffService: StaffService) { }

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
        this.staffService.removeStaffMember('delivery_boys', key).then((success) => {
        }).catch((error) => {
            console.log(error);;
        });
    }

       onFilterTypeChange() {
        this.filterStaffName= '';
        this.filterStaffEmail = '';
        this.filterStaffContact = '';
        this.filterStaffCnic = '';
        this.filterStaffAddress = '';

        setTimeout(() => {
            loadTheme();
        }, 10);
    }

    onDeliveryBoyStatusChange(){
        if(this.deliveryBoyStatus == 'active')
        this.deliveryBoyStatus = 'removed';
        else
        this.deliveryBoyStatus = 'active';
    }
}