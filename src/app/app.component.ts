import { Component, Inject } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import { AccountService } from './services/account-service'
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  // messaging: firebase.messaging.Messaging;
  // constructor( @Inject(FirebaseApp) private firebaseApp: firebase.app.App, private accountService: AccountService) {
    // this.messaging = firebase.messaging(this.firebaseApp);
    // this.messaging.requestPermission().then(() => {
    //   console.log("permission");
    //   return this.messaging.getToken();
    // }).then((token) => {
    //   console.log(token);
    //   this.accountService.addNotificationToken(token).then(() => {
    //   }).catch((error) => {

    //   })
    // })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  // }
}
