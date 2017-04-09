import { Component } from '@angular/core';
import loadTheme = require('../../../../js/admin');
import { OrderService } from '../../../services/order-service';
import { UserService } from '../../../services/user-service';
import { Order } from '../../../models/order.model';
import { User } from '../../../models/user.model';

@Component({
    selector: 'order-component',
    templateUrl: 'order.component.html'
})

export class OrderComponent {
    orders: Array<Order> = [];
    users: Array<User> = [];

    constructor(private orderService: OrderService, private userService: UserService) { }

    ngOnInit() {
        this.orderService.fetchAllOrders().then((ordersData: Array<Order>) => {
            this.userService.fetchUserDetails().then((usersData: Array<User>) => {
                ordersData.forEach((order, index) => {
                    order.user = usersData.filter(user => user.$key == order.userId)[0];
                    if (index == ordersData.length - 1) {
                        this.orders = ordersData;
                    }
                });
            });
        });


        setTimeout(() => {
            loadTheme();
        }, 10)
    }
}