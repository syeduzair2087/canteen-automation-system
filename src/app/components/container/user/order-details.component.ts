import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../services/order-service';
import { StaffService } from '../../../services/staff-service';
import { BucketItem } from '../../../models/bucketItem.model';
import { OrderStatus } from '../../../models/status.model';
import { StaffMember } from '../../../models/staff-member.model';
// import { FoodPreference } from '../../../models/preference.model';

@Component({
    selector: 'order-details-component',
    templateUrl: 'order-details.component.html'
})

export class OrderDetailsComponent {
    foodList: Array<BucketItem> = [];
    status: OrderStatus;
    staffMember: StaffMember;

    // binaryPrefs: Array<FoodPreference> = [];
    // singlePrefs: Array<FoodPreference> = [];
    // multiPrefs: Array<FoodPreference> = [];

    constructor(private orderService: OrderService, private staffService: StaffService, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        let orderId: string = this.activatedRoute.snapshot.params['orderId'];

        this.orderService.fetchOrderItems(orderId).then((data: Array<BucketItem>) => {
            this.foodList = data;
        });

        this.orderService.getOrderStatus(orderId).then((data: OrderStatus) => {
            this.status = data;
            this.staffService.getStaffMemberDetails(data.staffMemberId, data.state).then((staffMember: StaffMember) => {
                this.staffMember = staffMember;
            }).catch(() => {});
        });
    }
}