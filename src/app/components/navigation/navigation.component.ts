import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseApp } from 'angularfire2';
import { StaffMember } from '../../models/staff-member.model';
import { AccountService } from '../../services/account-service';
import * as firebase from 'firebase';
@Component({
    selector: 'navigation-component',
    templateUrl: 'navigation.component.html'
})

export class NavigationComponent {
    userName: string = '';
    userEmail: string = '';
    messaging: firebase.messaging.Messaging;
    constructor( @Inject(FirebaseApp) private firebaseApp, private accountService: AccountService, private router: Router) { }

    clickLogout() {
        this.accountService.logoutAdmin().then(() => {
            this.router.navigate(['/login']);
        }).catch((error) => console.log(error));
    }

    ngOnInit() {
        this.accountService.getData().then((data: StaffMember) => {
            this.userName = data.name;
            this.userEmail = data.email;
        }).catch(() => { });
        this.messaging = firebase.messaging(this.firebaseApp);
        this.GetNotification();
            this.messaging.onTokenRefresh(() => {
              this.registerRefreshNotificationToken();
            });
    }

    GetNotification() {
        this.messaging.onMessage((payload) => {
            console.log('Message Recived: ');
            console.log(payload);
        })
    }

    registerRefreshNotificationToken() {
        this.messaging.getToken().then((refreshToken) => {
            this.accountService.addNotificationToken(refreshToken).then(() => { })
        }).catch((error) => {
            console.log(error.message);
        })
    }
}