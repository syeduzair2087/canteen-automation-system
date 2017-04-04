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

    createUser(email: string, password: string, name: string) {
        console.log(email + " " + password + " " + name );
        
        return new Promise((res, rej) => {
            this.angularFire.auth.createUser({
                email: email,
                password: password
            }).then((user: FirebaseAuthState) => {
                user.auth.updateProfile({
                    displayName: name,
                    photoURL: 'https://firebasestorage.googleapis.com/v0/b/canteenautomationsystem.appspot.com/o/assets%2Fno-image.jpg?alt=media&token=ee3b6fc2-8906-4dac-abea-43f728190f22'
                }).then((success) => {
                    res();
                }).catch((error) => {
                    rej(error.message);
                });
            }).catch((error) => {
                rej(error.message);
            });
        });
    }
}