import { Component } from '@angular/core';
import { Router } from '@angular/router';
import loadTheme = require('../../../../js/admin');
import { OrderService } from '../../../services/order-service';
import { UserService } from '../../../services/user-service';
import { Order } from '../../../models/order.model';
import { User } from '../../../models/user.model';
import * as orderFilters from '../../../pipes/filter-order.pipe';
import { Subscription } from 'rxjs';

@Component({
    selector: 'order-component',
    templateUrl: 'order.component.html'
})

export class OrderComponent {
    orderSubscription: Subscription;
    orders: Array<Order> = [];
    users: Array<User> = [];
    filterBy: string = 'Pending';
    filterOrderBy: string = 'name';
    filterUserName: string = '';
    filterEmail: string = '';
    filterContact: string = '';
    filterCabin: number = null;
    filterTime: string = '';
    filterDate: string = '';
    filterAmount: number = null;
    filterId: number = null;


    constructor(private orderService: OrderService, private userService: UserService, private router: Router) { }

    ngOnInit() {
        this.orderSubscription = this.orderService.getOrderSubscription().subscribe((ordersData: Array<Order>) => {
            this.userService.fetchUserDetails().then((usersData: Array<User>) => {
                ordersData.forEach((order, index) => {
                    order.user = usersData.filter(user => user.$key == order.userId)[0];
                    if (index == ordersData.length - 1) {
                        this.orders = ordersData;
                    }
                });
            });
        });

        // this.orderService.fetchAllOrders().then((ordersData: Array<Order>) => {
        //     this.userService.fetchUserDetails().then((usersData: Array<User>) => {
        //         ordersData.forEach((order, index) => {
        //             order.user = usersData.filter(user => user.$key == order.userId)[0];
        //             if (index == ordersData.length - 1) {
        //                 this.orders = ordersData;
        //             }
        //         });
        //     });
        // });

        setTimeout(() => {
            loadTheme();
        }, 10);
    }

    ngOnDestroy() {
        this.orderSubscription.unsubscribe();
    }

    clickAssignToChef(orderId: string) {
        this.orderService.assignToChef(orderId).then((data) => { }).catch(() => { });
    }

    clickAssignToDeliveryBoy(orderId: string) {
        this.orderService.assignToDeliveryBoy(orderId).then((data) => { }).catch(() => { });
    }

    clickOrder(orderId: string) {
        // console.log(order);
        this.router.navigate(['home/orders/' + orderId]);
    }

    onFilterTypeChange() {
        this.filterAmount = null;
        this.filterCabin = null;
        this.filterContact = '';
        this.filterDate = '';
        this.filterEmail = '';
        this.filterId = null;
        this.filterTime = '';
        this.filterUserName = '';

        setTimeout(() => {
            loadTheme();
        }, 10);


    }
}