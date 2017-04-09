import { Component, OnInit } from '@angular/core';
import { StaffService } from '../../services/staff-service';
import { Staff } from '../../models/staff.model';
import { FirebaseListObservable } from 'angularfire2';
import { StaffNameFilter } from '../../pipes/staff-filter.pipe';

@Component({
    selector: 'admin-component',
    templateUrl: 'admin.component.html'
})
export class AdminComponent {
    filterAdminName: string;

    adminDetails: FirebaseListObservable<Array<Staff>>;

    selectedAdmin: Staff = {
        $key: '',
        name: '',
        email: '',
        address: '',
        cnic: '',
        contact: '',
        status: '',
    };

    constructor(private staffService: StaffService) { }

    ngOnInit() {
        this.adminDetails = this.staffService.fetchAdminDetails();
    }

    clickAddAdmin() {
        if ('$key' in this.selectedAdmin)
            delete this.selectedAdmin.$key;

        this.selectedAdmin = {
            name: '',
            email: '',
            cnic: '',
            contact: '',
            address: '',
            status: 'Active'
        }
    }

    clickEditAdmin(admin: Staff) {
        this.selectedAdmin = {
            $key: admin.$key,
            name: admin.name,
            email: admin.email,
            cnic: admin.cnic,
            contact: admin.contact,
            address: admin.address,
            status: 'Active'
        }
    }

    RemoveAdmin(key) {
        console.log(key);
        this.staffService.removeAdmin(key).then((success) => {
        }).catch((error) => {
            console.log(error);;
        })
    }

    getColor(activeStatus: string): string {
        if (activeStatus == 'Active')
            return "bg-danger";
        else
            return "";
    }
}