import { Component, OnInit, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseListObservable } from 'angularfire2';
import { UserService } from '../../../services/user-service';
import { User } from '../../../models/user.model';
import loadTheme = require('../../../../js/admin');
import { FilterUserByNamePipe, FilterUserByEmailPipe, FilterUserByContactPipe, FilterUserByCabinPipe } from '../../../pipes/filter-user.pipe';

@Component({
    selector: 'user-component',
    templateUrl: 'user.component.html'
})

export class UserComponent {
    users: Array<User> = [];
    filterUserName: string = '';
    filterEmail: string = '';
    filterContact: string = '';
    filterCabin: string = '';
    filterBy: string = 'name';

    constructor(private userService: UserService, private router: Router) { }
    ngOnInit(){
        this.userService.fetchUserDetails().then( (data: Array<User>) =>{
            this.users = data;
            //  console.log(this.userData);
        });

        setTimeout(() => {
            loadTheme();
        }, 10);
    }

    onFilterTypeChange() {
        this.filterUserName = '';
        this.filterEmail = '';
        this.filterContact = '';
        this.filterCabin = '';
    }

    clickUser(user) {
        this.router.navigate(['/home/users/' + user.$key + '/' + user.name]);
    }
}