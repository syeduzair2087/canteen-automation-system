import { Component } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2'
import { StaffService } from '../../services/staff-service';
import { Staff } from '../../models/staff.model';
import { StaffNameFilter } from '../../pipes/staff-filter.pipe';

@Component({
    selector: 'delivery-boy-component',
    templateUrl: 'delivery-boy.component.html'
})
export class DeliveryBoyComponent {
    filterDeliveryBoyName: string;

    deliveryBoyDetails: FirebaseListObservable<Array<Staff>>;

    selectedDeliveryBoy: Staff = {
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
        this.deliveryBoyDetails = this.staffService.fetchDeliveryBoyDetails();
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
            status: 'Active'
        }
    }

    clickEditDeliveryBoy(deliveryBoy: Staff) {
        this.selectedDeliveryBoy = {
            $key: deliveryBoy.$key,
            name: deliveryBoy.name,
            email: deliveryBoy.email,
            cnic: deliveryBoy.cnic,
            contact: deliveryBoy.contact,
            address: deliveryBoy.address,
            status: 'Active'
        }
    }

    RemoveDeliveryBoy(key) {
        this.staffService.removeDeliveryBoy(key).then((success) => {
        }).catch((error) => {
            console.log(error);;
        });
    }
}