import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account-service';

@Component({
    selector: 'navigation-component',
    templateUrl: 'navigation.component.html'
})

export class NavigationComponent {
    constructor(private accountService: AccountService, private router: Router) { }

    clickLogout() {
        this.accountService.logoutAdmin().then(() => {
            this.router.navigate(['/login']);
        }).catch((error) => console.log(error));
    }
}