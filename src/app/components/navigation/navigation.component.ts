import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseApp } from 'angularfire2';
import { StaffMember } from '../../models/staff-member.model';
import { AccountService } from '../../services/account-service';
import { ToastService } from '../../services/toast-service';
import * as firebase from 'firebase';
@Component({
    selector: 'navigation-component',
    templateUrl: 'navigation.component.html'
})

export class NavigationComponent {
    orderArrive: number = 0;
    userName: string = '';
    userEmail: string = '';
    messaging: firebase.messaging.Messaging;
    constructor( @Inject(FirebaseApp) private firebaseApp, private accountService: AccountService, private router: Router, private toastService: ToastService) { 
        // this.toastService.showToast('asdad', 'asdadasda', 'success')
    }

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
             console.log(payload.notification.body);
             console.log(payload.notification.title);
             this.orderArrive++;
             console.log(this.orderArrive)
            this.toastService.showToast(payload.notification.title, payload.notification.body, 'success');
        })
    }

    registerRefreshNotificationToken() {
        this.messaging.getToken().then((refreshToken) => {
            this.accountService.addNotificationToken(refreshToken).then(() => { })
        }).catch((error) => {
            console.log(error.message);
        })
    }

    resetOrderNumber(){
        this.orderArrive = 0;
    }
}