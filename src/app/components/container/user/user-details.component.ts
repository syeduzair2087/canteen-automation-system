import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Order } from '../../../models/order.model';
import { OrderService } from '../../../services/order-service';
import { ReversePipe } from '../../../pipes/reverse.pipe';

@Component({
    selector: 'user-details-component',
    templateUrl: 'user-details.component.html'
})

export class UserDetailsComponent {
    orders: Array<Order> = [];
    userName: string = 'demo name'

    constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.userName = (this.activatedRoute.snapshot.params['userName']).toLocaleUpperCase();

        let userId: string = this.activatedRoute.snapshot.params['userId'];
        console.log(userId);
        this.orderService.fetchOrders(userId).then((data: Array<Order>) => {
            console.log(data);
            this.orders = data;
        }).catch((error) => console.log(error));
    }

    clickOrder(orderId: string) {
        // console.log(order);
        this.router.navigate(['home/orders/' + orderId]);
    }
}