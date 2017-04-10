import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StaffMember } from '../../models/staff-member.model';
import { AccountService } from '../../services/account-service';

@Component({
    selector: 'navigation-component',
    templateUrl: 'navigation.component.html'
})

export class NavigationComponent {
    userName: string = '';
    userEmail: string = '';

    constructor(private accountService: AccountService, private router: Router) { }

    clickLogout() {
        this.accountService.logoutAdmin().then(() => {
            this.router.navigate(['/login']);
        }).catch((error) => console.log(error));
    }

    ngOnInit() {
        this.accountService.getData().then((data: StaffMember) => {
            this.userName = data.name;
            this.userEmail = data.email;
        }).catch(() => {});
    }
}