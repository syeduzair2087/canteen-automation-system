import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../../services/food-service';
import { FirebaseListObservable } from 'angularfire2';
import { FoodItem } from '../../../models/food.model';
import { FilterFoodByNamePipe } from '../../../pipes/filter-food.pipe';
import loadTheme = require('../../../../js/admin');
import { ToastService } from '../../../services/toast-service';
import { LoaderService } from '../../../services/loader-service';
// declare var $: any;
@Component({
    selector: 'food-component',
    templateUrl: 'food.component.html'
})

export class FoodComponent {
    // loader: boolean = false;
    constructor(private foodService: FoodService, private toastService: ToastService, private loaderService: LoaderService) { }

    ////////DECLARATIONS////////

    foodList: FirebaseListObservable<Array<FoodItem>>;
    foodItem: FoodItem;
    filterFoodName: string = '';


    ////////EVENTS////////

    ngOnInit() {
        this.foodList = this.foodService.getFoodItems();

        this.foodItem = {
            food_title: '',
            food_price: null,
            food_prefs: [],
            inventory_item: []

        }


        setTimeout(() => {
            loadTheme();
        }, 10)
    }

    ////////BUTTONS////////

    clickEdit(foodItem: FoodItem) {
        this.foodItem = {
            food_title: foodItem.food_title,
            food_price: foodItem.food_price,
            food_prefs: foodItem.food_prefs,
            inventory_item: foodItem.inventory_item,
            $key: foodItem.$key
        }
    }

    clickAdd() {
        if ('$key' in this.foodItem) {
            delete this.foodItem.$key;
        }

        this.foodItem = {
            food_title: '',
            food_price: null,
            food_prefs: [],
            inventory_item: []
        }
    }

    clickRemove(key: string) {
        this.loaderService.showLoader();
        this.foodService.deleteFoodItem(key).then(() => {
            this.loaderService.hideLoader();
            this.toastService.showToast('Food', 'Food Item removed successfully!', 'success');
        }).catch((error) => {
            this.loaderService.hideLoader();
            this.toastService.showToast('Food', error, 'error');
        })
    }
}