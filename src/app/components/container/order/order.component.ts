import { Component } from '@angular/core';
import { Router } from '@angular/router';
import loadTheme = require('../../../../js/admin');
import { OrderService } from '../../../services/order-service';
import { UserService } from '../../../services/user-service';
import { ToastService } from '../../../services/toast-service';
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
    printClick: boolean = false;

    constructor(private orderService: OrderService, private userService: UserService, private router: Router, private toastService: ToastService) { }

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
        this.orderService.assignToChef(orderId).then((data) => {
            this.toastService.showToast('Order', 'Order assigned to chef.', 'success');
        }).catch((error) => {
            this.toastService.showToast('Order', error, 'error');
        });
    }

    clickAssignToDeliveryBoy(orderId: string) {
        this.orderService.assignToDeliveryBoy(orderId).then((data) => {
            console.log('ok');
            this.toastService.showToast('Order', 'Order assigned to delivery boy.', 'success');
        }).catch((error) => {
            console.log('error');
            this.toastService.showToast('Order', error, 'error');
        });
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

    print() {
        this.printClick = true;

        setTimeout(() => {
            let printContents, popupWin;
            printContents = document.getElementById('print-section').innerHTML;
            // printContents.
            popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
            popupWin.document.open();
            popupWin.document.write(`
          <html>
            <head>
<!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css">

  <!-- Bootstrap Core Css -->
  <link href="https://firebasestorage.googleapis.com/v0/b/canteen-admin.appspot.com/o/plugins%2Fbootstrap.css?alt=media&token=0b2a81e0-c9cf-4a8e-a12a-9bbfdafe358d"
    rel="stylesheet">
  <!-- Custom Css -->
  <link href="https://firebasestorage.googleapis.com/v0/b/canteen-admin.appspot.com/o/plugins%2Fstyle.css?alt=media&token=2dc90b2f-e28e-4896-990c-1b72d344e10e"
    rel="stylesheet">   
      <!-- AdminBSB Themes. You can choose a theme from css/themes instead of get all themes -->
  <link href="https://firebasestorage.googleapis.com/v0/b/canteen-admin.appspot.com/o/plugins%2Fall-themes.css?alt=media&token=ff8f92d3-b25f-42b4-91c3-58df66a88991"
    rel="stylesheet" />
            </head>
        <body onload="window.print();window.close()">
         <h3 class='align-center'>Order Report<h3>
        ${printContents}
        </body>
          </html>`
            );
            popupWin.document.close();
        }, 5);

        setTimeout(() => {
            this.printClick = false;
        }, 10);
    }
}