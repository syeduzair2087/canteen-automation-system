import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../services/order-service';
import { BucketItem } from '../../../models/bucketItem.model';
// import { FoodPreference } from '../../../models/preference.model';

@Component({
    selector: 'order-details-component',
    templateUrl: 'order-details.component.html'
})

export class OrderDetailsComponent {
    foodList: Array<BucketItem> = [];
    // binaryPrefs: Array<FoodPreference> = [];
    // singlePrefs: Array<FoodPreference> = [];
    // multiPrefs: Array<FoodPreference> = [];

    constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        let orderId: string = this.activatedRoute.snapshot.params['orderId'];
        this.orderService.fetchOrderItems(orderId).then((data: Array<BucketItem>) => {
            this.foodList = data;
        });
    }
}