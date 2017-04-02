import { Component } from '@angular/core';
import { AccountService } from '../../services/account-service';

@Component({
    selector: 'login-component',
    templateUrl: 'login.component.html'
})

export class LoginComponent {
    constructor(private accountService: AccountService) { }

    clickLogin(email: string, password: string) {
        this.accountService.loginAdmin(email, password).then(() => {}).catch((error) => console.log(error));
    }
}