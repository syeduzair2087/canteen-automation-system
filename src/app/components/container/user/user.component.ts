import { Component, OnInit, PipeTransform } from '@angular/core';
import {FirebaseListObservable} from 'angularfire2';
import {UserService} from '../../../services/user-service';
import {UserDetail} from '../../../models/userDetail.model';
import {UserNameFilter} from '../../../pipes/name.pipe';
@Component({
    selector: 'user-component',
    templateUrl: 'user.component.html'
})

export class UserComponent {
    userDetails: Array<UserDetail> = [];
    userName:string = '';
    constructor(private userService: UserService) { }
    ngOnInit(){
        this.userService.fetchUserDetails().then( (success: Array<UserDetail>) =>{
            this.userDetails = success;
            //  console.log(this.userData);
        });
    }
}