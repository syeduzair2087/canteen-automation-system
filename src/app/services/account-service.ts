import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuthState } from 'angularfire2';

@Injectable()
export class AccountService {
    constructor(private angularFire: AngularFire) { }

    loginAdmin(email: string, password: string) {
        return new Promise((res, rej) => {
            this.angularFire.database.list('/roles/admins/', {
                query: {
                    orderByChild: 'email',
                    equalTo: email
                }
            }).subscribe((client) => {
                if (client.length == 1) {
                    this.angularFire.auth.login({ email: email, password: password }).then((user: FirebaseAuthState) => {
                        localStorage.setItem('uid', user.uid);
                        res(user);
                    }).catch((error) => {
                        rej(error);
                    })
                }
                else {
                    rej('User not found. Please check your credentials and try again');
                }
            });
        })
    }
}