import { Component } from '@angular/core';
import loadTheme = require('../../../../js/admin');
import { AccountService } from '../../../services/account-service';
import { StaffMember } from '../../../models/staff-member.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'profile-component',
    templateUrl: 'profile.component.html'
})

export class ProfileComponent {
    staffMember: StaffMember = {
        name: '',
        email: '',
        address: '',
        contact: '',
        cnic: '',
        status: ''
    }
    constructor(private accountService: AccountService) { }

    ngOnInit() {
        this.accountService.getStaffDetail().then((data: StaffMember) => {
            this.staffMember = data;
            console.log(this.staffMember);
        })
    }
}