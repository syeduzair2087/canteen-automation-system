import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account-service';

@Component({
    selector: 'login-component',
    templateUrl: 'login.component.html'
})

export class LoginComponent {
    constructor(private accountService: AccountService, private router: Router) { }

    clickLogin(email: string, password: string) {
        this.accountService.loginAdmin(email, password).then(() => {
            this.router.navigate(['/home']);
        }).catch((error) => console.log(error));
    }
}