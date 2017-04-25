import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Order } from '../models/order.model';
var querybase = require('querybase');
var firebase = require('firebase');
@Injectable()
export class OrderService {

    public constructor(private angularFire: AngularFire) { }

    // placeOrder(order: Order) {
    //     let loading = this.LoadingCtrl.create({
    //         content: 'Placing order...'
    //     });
    //     loading.present();
    //     return new Promise((res, rej) => {
    //         this.angularFire.database.list('/orders').push(order).then(() => {
    //             this.toastCtrl.create({
    //                 message: 'Order placed successfully.',
    //                 duration: 4500
    //             }).present();
    //             loading.dismiss();
    //             res();
    //         }).catch((error) => {
    //             console.log(error);
    //             this.toastCtrl.create({
    //                 message: 'Failed to place order. Please try again.',
    //                 duration: 4500
    //             }).present();
    //             loading.dismiss();
    //             rej();
    //         })
    //     })
    // }

    fetchOrders(userId: string) {
        return new Promise((res, rej) => {
            this.angularFire.database.list('/orders/', {
                query: {
                    orderByChild: 'userId',
                    equalTo: userId
                }
            }).subscribe((data: Array<Order>) => {
                res(data);
            });
        });
    }

    fetchAllOrders() {
        return new Promise((res, rej) => {
            this.angularFire.database.list('/orders/').subscribe((data: Array<Order>) => {
                res(data);
            });
        });
    }

    getOrderSubscription() {
        return this.angularFire.database.list('/orders/');
    }

    fetchOrderItems(orderId: string) {
        return new Promise((res, rej) => {
            let orderSubscription = this.angularFire.database.object('/orders/' + orderId).subscribe((data: Order) => {
                res(data.items);
                orderSubscription.unsubscribe();
            });
        });
    }

    getLeastJobCount(role: string) {
        return new Promise((res, rej) => {
            let countSubscription = this.angularFire.database.list('/roles/' + role, {
                query: {
                    orderByChild: 'job_count',
                    limitToFirst: 1

                }
            }).subscribe((data: any) => {
                countSubscription.unsubscribe();
                res(data[0].job_count);
            });
        });
    }

    getStaffMemberToAssign(role: string) {
        return new Promise((res, rej) => {
            this.getLeastJobCount(role).then((data: number) => {
                let staffsSubscription = this.angularFire.database.list('/roles/' + role, {
                    query: {
                        orderByChild: 'job_count',
                        equalTo: data
                    }
                }).subscribe((datalist: Array<any>) => {
                    staffsSubscription.unsubscribe();;
                    datalist.filter
                    res(datalist[Math.floor(Math.random() * datalist.length)]);
                });
            }).catch(() => rej());
        });
    }

    assignToChef(orderId: string) {
        return new Promise((res, rej) => {
            this.getStaffMemberToAssign('chefs').then((data: any) => {
                this.angularFire.database.object('/orders/' + orderId).update({
                    status: {
                        state: 'Assigned to Chef',
                        staffMemberId: data.$key
                    }
                }).then(() => {
                    this.angularFire.database.object('roles/chefs/' + data.$key).update({
                        job_count: <number>data.job_count + 1
                    }).then(() => {
                        res();
                    }).catch(() => {
                        rej();
                    });
                }).catch(() => {
                    rej();
                });
            });
        });
    }

    assignToDeliveryBoy(orderId: string) {
        return new Promise((res, rej) => {
            this.getStaffMemberToAssign('delivery_boys').then((data: any) => {
                this.angularFire.database.object('/orders/' + orderId).update({
                    status: {
                        state: 'Assigned to Delivery Boy',
                        staffMemberId: data.$key
                    }
                }).then(() => {
                    this.angularFire.database.object('roles/delivery_boys/' + data.$key).update({
                        job_count: <number>data.job_count + 1
                    }).then(() => {
                        res();
                    }).catch(() => {
                        rej();
                    });
                }).catch(() => {
                    rej();
                });
            });
        });
    }

    getOrderStatus(orderId: string) {
        return new Promise((res, rej) => {
            let statusSubscription = this.angularFire.database.object('/orders/' + orderId + '/status').subscribe((data) => {
                res(data);
                statusSubscription.unsubscribe();
            });
        });
    }

    getActiveLeastCount(staff: string) {
        //     // let databaseRef = firebase.database().ref().child('roles/' + staff);
        //     // let queryBaseRef = querybase.ref(databaseRef);
        //     // let result = queryBaseRef.where('job_count').greaterThan(0);
        //     //     result.on('value', snap => console.log(snap))

        //     let databaseRef = firebase.database().ref().child('roles/   chefs');
        //     let querybaseRef = querybase.ref(databaseRef, ['job_count', 'status']);
        // //     let result = querybaseRef.where({status : 'active',
        // // job_count : });

        //     // result.on('value', snap => console.log(snap.val()));
        //     // console.log(result)
        // this.getActiveStaff('chefs');
    }

    // getActiveStaff(role: string) {
    //     let activeStaffSubscription = this.angularFire.database.list('roles/' + role, {
    //         query: {
    //             orderByChild: 'status',
    //             equalTo: 'active'
    //         }
    //     }).subscribe((dataList) => {
    //         console.log(dataList.sort((staff1 , staff2) => staff1.job_count - staff2.job_count))
    //     })
    // }
}
