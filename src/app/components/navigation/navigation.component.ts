import { Component } from '@angular/core';
import { AccountService } from '../../services/account-service';

@Component({
    selector: 'navigation-component',
    templateUrl: 'navigation.component.html'
})

export class NavigationComponent {
    constructor(private accountService: AccountService) { }

    clickLogout() {
        this.accountService.logoutAdmin().then(() => {}).catch((error) => console.log(error));
    }
}