import { Component, OnInit, Input } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { Staff } from '../../../models/staff.model';
import { AccountService } from '../../../services/account-service';
import { StaffService } from '../../../services/staff-service';
@Component({
    selector: 'chef-modal',
    templateUrl: 'chef-modal.component.html'
})

export class ChefModalComponent {
    constructor(private accountService: AccountService) { }

    ////////INPUT////////

    @Input() selectedChef: Staff;
    @Input() staffService: StaffService;


    ////////EVENTS////////

    ngOnInit() {
    }

    ////////BUTTONS////////

    clickConfirm() {
        if (this.selectedChef.$key) {
            let key = this.selectedChef.$key;
            delete this.selectedChef.$key
            this.staffService.editChef(key, this.selectedChef).then((success) => {

            }).catch((error) => {
                console.log(error);
            })
        }
        else {
            this.accountService.createUser(this.selectedChef.email, 'u123456', this.selectedChef.name).then((success) => {
                this.staffService.addChef(this.selectedChef).then((success) => {

                }).catch((error) => {
                    console.log(error);
                });
            }).catch((error) => {
                console.log(error);
            });

        }
    }
}