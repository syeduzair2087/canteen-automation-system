import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Injectable()
export class UserService {
    constructor(private angularFire: AngularFire) { }
}