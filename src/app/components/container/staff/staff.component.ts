import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { Router } from "@angular/router";
declare var $: any;
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate(['/home/staff/admin']);
    // $('<div class="backdropClass" ></div>').appendTo(document.body);

    // setTimeout(function() {
    //   console.log('3000');
    //   $('.backdropClass').remove();
    // }, 3000);
  }

  navigateToAdmin() {
    this.router.navigate(['/home/staff/admin']);
  }

  navigateToChef() {
    this.router.navigate(['/home/staff/chef']);
  }
  navigateToDeliveryBoy() {
    this.router.navigate(['/home/staff/delivery_boy']);
  }
}
