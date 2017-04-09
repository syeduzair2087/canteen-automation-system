import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { StaffMember } from '../models/staff-member.model';
@Injectable()
export class StaffService {
    constructor(private angularFire: AngularFire) { }

    fetchAdmins() {
        // return new Promise((res, rej) => {
        return this.angularFire.database.list('roles/admins')
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

    addAdmin(admin: StaffMember) {
        return new Promise((res, rej) => {
            this.angularFire.database.list('roles/admins').push(admin).then((success) => {
                res(success)
            }).catch((error) => {
                rej(error.message);
            });
        });
    }

    addChef(chef: StaffMember) {
        return new Promise((res, rej) => {
            this.angularFire.database.list('roles/chefs').push(chef).then((success) => {
                res()
            }).catch((error) => {
                rej(error.message);
            });
        });
    }

    addDeliveryBoy(deliveryBoy: StaffMember) {
        return new Promise((res, rej) => {
            this.angularFire.database.list('roles/delivery_boys').push(deliveryBoy).then((success) => {
                res(success)
            }).catch((error) => {
                rej(error.message);
            });
        });
    }

    editAdmin(key: string, admin: StaffMember) {
        return new Promise((res, rej) => {
            this.angularFire.database.object('roles/admins/' + key + '/').update(admin).then((success) => {
                res();
            }).catch((error) => {
                rej(error.message);
            });
        });
    }

    editChef(key: string, chef: StaffMember) {
        return new Promise((res, rej) => {
            this.angularFire.database.object('roles/chefs/' + key + '/').update(chef).then((success) => {
                res();
            }).catch((error) => {
                rej(error.message);
            });
        });
    }


    editDeliveryBoy(key: string, deliveryBoy: StaffMember) {
        return new Promise((res, rej) => {
            this.angularFire.database.object('roles/delivery_boys/' + key + '/').update(deliveryBoy).then((success) => {
                res();
            }).catch((error) => {
                rej(error.message);
            });
        });
    }

    removeAdmin(key: string) {
        return new Promise((res, rej) => {
            this.angularFire.database.object('roles/admins/' + key).update({ status: "Remove" }).then((success) => {
                res();
            }).catch((error) => {
                rej(error.message);
            });
        });
    }

    removeChef(key: string) {
        return new Promise((res, rej) => {
            this.angularFire.database.object('roles/chefs/' + key).update({ status: "Remove" }).then((success) => {
                res();
            }).catch((error) => {
                rej(error.message);
            });
        });
    }

    removeDeliveryBoy(key: string) {
        return new Promise((res, rej) => {
            this.angularFire.database.object('roles/delivery_boys/' + key).update({ status: "Remove" }).then((success) => {
                res();
            }).catch((error) => {
                rej(error.message);
            });
        });
    }

}