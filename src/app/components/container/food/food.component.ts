import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../../services/food-service';
import { FirebaseListObservable } from 'angularfire2';
import { FoodItem } from '../../../models/food.model';
import { FilterFoodByNamePipe } from '../../../pipes/filter-food.pipe';
import loadTheme = require('../../../../js/admin');

@Component({
    selector: 'food-component',
    templateUrl: 'food.component.html'
})

export class FoodComponent {
    constructor(private foodService: FoodService) { }

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
            food_prefs: []
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
            food_prefs: []
        }
    }

    clickRemove(key: string) {
        this.foodService.deleteFoodItem(key).catch((error) => {
            console.log(error);
        })
    }
}