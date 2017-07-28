import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseApp } from 'angularfire2';
import { StaffMember } from '../../models/staff-member.model';
import { AccountService } from '../../services/account-service';
import { ToastService } from '../../services/toast-service';
import { LoaderService } from '../../services/loader-service';
import * as firebase from 'firebase';
import { Subscription } from 'rxjs';
@Component({
    selector: 'navigation-component',
    templateUrl: 'navigation.component.html',
})

export class NavigationComponent {
    orderArrive: number = 0;
    userName: string = '';
    userEmail: string = '';
    userSubscription: Subscription;
    messaging: firebase.messaging.Messaging;
    constructor( @Inject(FirebaseApp) private firebaseApp, private accountService: AccountService, private router: Router, private toastService: ToastService, private loaderService: LoaderService) {
        // this.toastService.showToast('asdad', 'asdadasda', 'success')
    }

    clickLogout() {
        this.loaderService.showLoader();
        this.userSubscription.unsubscribe();
        this.accountService.logoutAdmin().then(() => {
            this.loaderService.hideLoader();
            this.router.navigate(['/login']);
        }).catch((error) => {
            this.loaderService.hideLoader();
            console.log(error)
        });
    }

    ngOnInit() {
        // this.accountService.getData().then((data: StaffMember) => {
        //     this.userName = data.name;
        //     this.userEmail = data.email;
        // }).catch(() => { });

        this.userSubscription = this.accountService.getData().subscribe((data: StaffMember) => {
            this.userEmail = data.email;
            this.userName = data.name;
            console.log(data)
        });

        

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

    resetOrderNumber() {
        this.orderArrive = 0;
    }
}