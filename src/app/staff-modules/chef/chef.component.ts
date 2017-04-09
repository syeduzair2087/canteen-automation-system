import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { Staff } from '../../models/staff.model';
import { StaffService } from "../../services/staff-service";
import { StaffNameFilter } from '../../pipes/staff-filter.pipe';

@Component({
    selector: 'chef-component',
    templateUrl: 'chef.component.html'
})

export class ChefComponent {
    filterChefName: string;
    ChefDetails: FirebaseListObservable<Array<Staff>>;

    selectedChef: Staff = {
        $key: '',
        name: '',
        email: '',
        address: '',
        cnic: '',
        contact: '',
        status: ''
    };
    constructor(private staffService: StaffService) { }

    ngOnInit() {
        this.ChefDetails = this.staffService.fetchChefDetails();
    }


    clickAddChef() {
        if ('$key' in this.selectedChef)
            delete this.selectedChef.$key;

        this.selectedChef = {
            name: '',
            email: '',
            cnic: '',
            contact: '',
            address: '',
            status: 'Active'
        }
    }


    clickEditChef(chef: Staff) {
        this.selectedChef = {
            $key: chef.$key,
            name: chef.name,
            email: chef.email,
            cnic: chef.cnic,
            contact: chef.contact,
            address: chef.address,
            status: 'Active'
        }
    }

    RemoveChef(key) {
        this.staffService.removeChef(key).then((success) => {
        }).catch((error) => {
            console.log(error);
        });        
    }

}