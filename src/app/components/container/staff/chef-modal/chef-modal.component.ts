import { Component, OnInit, Input } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { Staff } from '../../../../models/staff.model';
import { AccountService } from '../../../../services/account-service';
import { StaffService } from '../../../../services/staff-service';
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
        // this.foodList = this.foodService.getFoodItems();

        // this.foodItem = {
        //     food_title: '',
        //     food_price: null,
        //     food_prefs: []
        // }
    }

    ////////BUTTONS////////

    // clickEdit(foodItem: FoodItem) {
    //     this.foodItem = {
    //         food_title: foodItem.food_title,
    //         food_price: foodItem.food_price,
    //         food_prefs: foodItem.food_prefs,
    //         $key: foodItem.$key
    //     }
    // }

    // clickAdd() {
    //     if ('$key' in this.foodItem) {
    //         delete this.foodItem.$key;
    //     }

    //     this.foodItem = {
    //         food_title: '',
    //         food_price: null,
    //         food_prefs: []
    //     }
    // }

    // clickRemove(key: string) {
    //     this.foodService.deleteFoodItem(key).catch((error) => {
    //         console.log(error);
    //     })
    // }

    clickConfirm() {
        if (this.selectedChef.$key) {
            let key = this.selectedChef.$key;
            delete this.selectedChef.$key
            this.staffService.editChef(key, this.selectedChef).then((success) => {

            }).catch((error) => {

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