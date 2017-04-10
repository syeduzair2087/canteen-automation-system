import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
    constructor(private angularFire: AngularFire) { }
    fetchUserDetails() {
        return new Promise((res, rej) => {
            this.angularFire.database.list('/roles/clients').subscribe((data: Array<User>) => {
                res(data);
            });
        });
    }
} 