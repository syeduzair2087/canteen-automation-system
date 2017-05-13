import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuthState } from 'angularfire2';
import { StaffMember } from '../models/staff-member.model';

@Injectable()
export class AccountService {
    constructor(private angularFire: AngularFire) { }

    loginAdmin(email: string, password: string) {
        return new Promise((res, rej) => {

            let adminSubscription = this.angularFire.database.list('/roles/admins/', {
                query: {
                    orderByChild: 'email',
                    equalTo: email
                }
            }).subscribe((admin) => {
                if (admin.length == 1) {
                    this.angularFire.auth.login({ email: email, password: password }).then((user: FirebaseAuthState) => {
                        localStorage.setItem('uid', user.uid);
                        res(user);
                        adminSubscription.unsubscribe();
                    }).catch((error) => {
                        rej(error);
                        adminSubscription.unsubscribe();
                    })
                }
                else {
                    rej('User not found. Please check your credentials and try again');
                    adminSubscription.unsubscribe();
                }
            });
        })
    }

    logoutAdmin() {
        return new Promise((res, rej) => {
            this.angularFire.auth.logout().then(() => {
                localStorage.removeItem('uid');
                res();
            }).catch((error) => {
                rej(error);
            })
        })
    }

    createUser(email: string, password: string, name: string) {
        console.log(email + " " + password + " " + name);

        return new Promise((res, rej) => {
            this.angularFire.auth.createUser({
                email: email,
                password: password
            }).then((user: FirebaseAuthState) => {
                user.auth.updateProfile({
                    displayName: name,
                    photoURL: 'https://firebasestorage.googleapis.com/v0/b/canteenautomationsystem.appspot.com/o/assets%2Fno-image.jpg?alt=media&token=ee3b6fc2-8906-4dac-abea-43f728190f22'
                }).then((success) => {
                    res(user.uid);
                }).catch((error) => {
                    rej(error.message);
                });
            }).catch((error) => {
                rej(error.message);
            });
        });
    }

    isLoggedIn() {
        if (localStorage.getItem('uid')) {
            return true;
        }

        else {
            return false;
        }
    }

    getData() {
        return new Promise((res, rej) => {
            let userDataSubscription = this.angularFire.database.object('/roles/admins/' + localStorage.getItem('uid')).subscribe((data: StaffMember) => {
                res(data);
                userDataSubscription.unsubscribe();
            });
        })
    }

    getStaffDetail() {
        return new Promise((res, rej) => {
            let staffAuth = this.angularFire.auth;
            let staffAuthSubscription = staffAuth.subscribe((data: FirebaseAuthState) => {
                if (data) {
                    let staffDataSubscription = this.angularFire.database.object('roles/admins/' + localStorage.getItem('uid')).subscribe((staffInfo: any) => {
                        let staffData: StaffMember = {
                            name: data.auth.displayName,
                            email: data.auth.email,
                            address: staffInfo.address,
                            cnic: staffInfo.cnic,
                            contact: staffInfo.contact,
                            status: staffInfo.status,
                            $key: data.auth.uid
                        }
                        res(staffData);
                        staffDataSubscription.unsubscribe();
                        staffAuthSubscription.unsubscribe();
                    })
                }
                else {
                    rej("Error while fetching user data!");
                    staffAuthSubscription.unsubscribe();
                }
            })
        }).catch((error) => {
            console.log(error.message);
        })
    }

    addNotificationToken(token: string) {
        return new Promise((res, rej) => {
            this.angularFire.database.object('notificationTokens/admins/' + localStorage.getItem('uid') + '/id').set(token).then(() => {
                console.log('Token added sucessfully!');
                res('')
            }).catch((error) => {
                console.log(error);
            })
        })
    }
}