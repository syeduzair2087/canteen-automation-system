import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { StaffMember } from '../models/staff-member.model';
@Injectable()
export class StaffService {
    constructor(private angularFire: AngularFire) { }

    fetchAdmins() {
        // return new Promise((res, rej) => {
        return this.angularFire.database.list('roles/admins');
        //     .subscribe((data: Array<Staff>) => {
        //         res(data);
        //     });
        // });
    }

    fetchChefs() {
        // return new Promise((res, rej) => {
        return this.angularFire.database.list('roles/chefs')
        //     .subscribe((data: Array<Staff>) => {
        //         res(data);
        //     });
        // });
    }

    fetchDeliveryBoys() {
        // return new Promise((res, rej) => {
        return this.angularFire.database.list('roles/delivery_boys')
        //     .subscribe((data: Array<Staff>) => {
        //         res(data);
        //     });
        // });
    }

    // addAdmin(userId: string, admin: StaffMember) {
    //     return new Promise((res, rej) => {
    //         this.angularFire.database.object('roles/admins/' + userId).set(admin).then(() => {
    //             res();
    //         }).catch((error) => {
    //             rej(error.message);
    //         });
    //     });
    // }

    // addChef(userId: string, chef: StaffMember) {
    //     return new Promise((res, rej) => {
    //         this.angularFire.database.object('roles/chefs/' + userId).set(chef).then(() => {
    //             res();
    //         }).catch((error) => {
    //             rej(error.message);
    //         });
    //     });
    // }

    // addDeliveryBoy(userId: string, deliveryBoy: StaffMember) {
    //     return new Promise((res, rej) => {
    //         this.angularFire.database.object('roles/delivery_boys/' + userId).set(deliveryBoy).then((success) => {
    //             res();
    //         }).catch((error) => {
    //             rej(error.message);
    //         });
    //     });
    // }

    addStaffMember(role: string, userId: string, member: StaffMember) {
        return new Promise((res, rej) => {
            this.angularFire.database.object('roles/' + role + '/' + userId).set(member).then((success) => {
                res();
            }).catch((error) => {
                rej(error.message);
            });
        });
    }

    // editAdmin(key: string, admin: StaffMember) {
    //     return new Promise((res, rej) => {
    //         this.angularFire.database.object('roles/admins/' + key).update(admin).then((success) => {
    //             res();
    //         }).catch((error) => {
    //             rej(error.message);
    //         });
    //     });
    // }

    // editChef(key: string, chef: StaffMember) {
    //     return new Promise((res, rej) => {
    //         this.angularFire.database.object('roles/chefs/' + key).update(chef).then((success) => {
    //             res();
    //         }).catch((error) => {
    //             rej(error.message);
    //         });
    //     });
    // }

    // editDeliveryBoy(key: string, deliveryBoy: StaffMember) {
    //     return new Promise((res, rej) => {
    //         this.angularFire.database.object('roles/delivery_boys/' + key).update(deliveryBoy).then((success) => {
    //             res();
    //         }).catch((error) => {
    //             rej(error.message);
    //         });
    //     });
    // }

    editStaffMember(role: string, userId: string, member: StaffMember) {
        return new Promise((res, rej) => {
            this.angularFire.database.object('roles/' + role + '/' + userId).update(member).then(() => {
                res();
            }).catch((error) => {
                rej(error.message);
            });
        });
    }

    // removeAdmin(key: string) {
    //     return new Promise((res, rej) => {
    //         this.angularFire.database.object('roles/admins/' + key).update({ status: "Remove" }).then((success) => {
    //             res();
    //         }).catch((error) => {
    //             rej(error.message);
    //         });
    //     });
    // }

    // removeChef(key: string) {
    //     return new Promise((res, rej) => {
    //         this.angularFire.database.object('roles/chefs/' + key).update({ status: "Remove" }).then((success) => {
    //             res();
    //         }).catch((error) => {
    //             rej(error.message);
    //         });
    //     });
    // }

    // removeDeliveryBoy(key: string) {
    //     return new Promise((res, rej) => {
    //         this.angularFire.database.object('roles/delivery_boys/' + key).update({ status: "Remove" }).then((success) => {
    //             res();
    //         }).catch((error) => {
    //             rej(error.message);
    //         });
    //     });
    // }

    removeStaffMember(role: string, userId: string) {
        return new Promise((res, rej) => {
            this.angularFire.database.object('roles/' + role + '/' + userId).update({ status: 'removed' }).then(() => {
                res();
            }).catch((error) => {
                rej(error);
            });
        });
    }

    getStaffMemberDetails(staffMemberId: string, state: string) {
        return new Promise((res, rej) => {
            let role = '';

            console.log('state is :' + state);

            if (state === 'Assigned to Chef' || state === 'Accepted by Chef' || state === 'Order Ready') {
                role = 'chefs';
            }
                                                                        
            else if (state === 'Assigned to Delivery Boy' || state === 'Received by Delivery Boy' || state === 'Order Delivered') {
                role = 'delivery_boys';
            }

            else {
                return rej();
            }

            let staffMemberSubscription = this.angularFire.database.object('/roles/' + role + '/' + staffMemberId).subscribe((data) => {
                res(data);
                staffMemberSubscription.unsubscribe();
            });
        });
    }

}