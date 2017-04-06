import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../../models/order.model';
import { OrderService } from '../../../services/order-service';

@Component({
    selector: 'user-details-component',
    templateUrl: 'user-details.component.html'
})

export class UserDetailsComponent {
    orders: Array<Order> = [];
    userName: string = 'demo name'

    constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.userName = (this.activatedRoute.snapshot.params['userName']).toLocaleUpperCase();

        let userId: string = this.activatedRoute.snapshot.params['userId'];
        console.log(userId);
        this.orderService.fetchOrders(userId).then((data: Array<Order>) => {
            console.log(data);
            this.orders = data;
        }).catch((error) => console.log(error));
    }
}