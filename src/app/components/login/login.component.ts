import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseApp } from 'angularfire2';
import { AccountService } from '../../services/account-service';
import * as firebase from 'firebase';

@Component({
    selector: 'login-component',
    templateUrl: 'login.component.html'
})

export class LoginComponent {
    messaging: firebase.messaging.Messaging;
    constructor( @Inject(FirebaseApp) private firebaseApp, private accountService: AccountService, private router: Router) { }

    clickLogin(email: string, password: string) {
        this.accountService.loginAdmin(email, password).then(() => {
             this.messaging = firebase.messaging(this.firebaseApp);
            this.registerNotificationToken();
            this.router.navigate(['/home']);
        }).catch((error) => console.log(error));
    }

    ngOnInit() {
    }

    registerNotificationToken() {
        this.messaging.requestPermission().then(() => {
            return this.messaging.getToken();
        }).then((token) => {
            this.accountService.addNotificationToken(token).then(() => {
                // this.GetNotification();
            })
        }).catch((error) => {
        })
    }

    // GetNotification() {
    //     this.messaging.onMessage((payload) => {
    //         console.log('Message Recived: ');
    //         console.log(payload);
    //     })
    // }
}