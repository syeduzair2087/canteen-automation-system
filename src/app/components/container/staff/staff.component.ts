import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2'
import { StaffService } from '../../../services/staff-service';
import { Staff } from '../../../models/staff.model';
import { StaffNameFilter } from '../../../pipes/staff-filter.pipe'
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  adminName: string;
  chefName: string;
  deliveryBoyName: string;

  adminDetails: FirebaseListObservable<Array<Staff>>;
  ChefDetails: FirebaseListObservable<Array<Staff>>;
  deliveryBoyDetails: FirebaseListObservable<Array<Staff>>;

  selectedAdmin: Staff = {
    $key: '',
    name: '',
    email: '',
    address: '',
    cnic: '',
    contact: '',
  };

  selectedChef: Staff = {
    $key: '',
    name: '',
    email: '',
    address: '',
    cnic: '',
    contact: '',
  };


  selectedDeliveryBoy: Staff = {
    $key: '',
    name: '',
    email: '',
    address: '',
    cnic: '',
    contact: '',
  };

  constructor(private staffService: StaffService) { }

  ngOnInit() {
    this.adminDetails = this.staffService.fetchAdminDetails();

    this.ChefDetails = this.staffService.fetchChefDetails();

    this.deliveryBoyDetails = this.staffService.fetchDeliveryBoyDetails();

    console.log(this.ChefDetails);


  }

  clickAddAdmin() {
    if ('$key' in this.selectedAdmin)
      delete this.selectedAdmin.$key;

    this.selectedAdmin = {
      name: '',
      email: '',
      cnic: '',
      contact: '',
      address: ''
    }


  }

  clickAddChef() {
    if ('$key' in this.selectedChef)
      delete this.selectedChef.$key;

    this.selectedChef = {
      name: '',
      email: '',
      cnic: '',
      contact: '',
      address: ''
    }
  }

  clickAddDeliveryBoy() {
    if ('$key' in this.selectedDeliveryBoy)
      delete this.selectedDeliveryBoy.$key;

    this.selectedDeliveryBoy = {
      name: '',
      email: '',
      cnic: '',
      contact: '',
      address: ''
    }
  }

  clickEditAdmin(admin: Staff) {
    this.selectedAdmin = {
      $key: admin.$key,
      name: admin.name,
      email: admin.email,
      cnic: admin.cnic,
      contact: admin.contact,
      address: admin.address
    }
  }

  clickEditChef(chef: Staff) {
    this.selectedChef = {
      $key: chef.$key,
      name: chef.name,
      email: chef.email,
      cnic: chef.cnic,
      contact: chef.contact,
      address: chef.address
    }
  }

  clickEditDeliveryBoy(deliveryBoy: Staff) {
    this.selectedDeliveryBoy = {
      $key: deliveryBoy.$key,
      name: deliveryBoy.name,
      email: deliveryBoy.email,
      cnic: deliveryBoy.cnic,
      contact: deliveryBoy.contact,
      address: deliveryBoy.address
    }
  }

}
