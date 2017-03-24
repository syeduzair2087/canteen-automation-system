import { Component, Input, OnInit } from '@angular/core';
import { FoodItem } from '../../../../models/food.model';
import { FoodPreference } from '../../../../models/preference.model';
import { FoodService } from '../../../../services/food-service'

@Component({
    selector: 'food-modal',
    templateUrl: 'food-modal.component.html'
})

export class FoodModalComponent {
    constructor() { }

    ////////INPUTS////////

    @Input() foodService: FoodService;
    @Input() foodItem: FoodItem;

    ////////DECLARATIONS////////

    prefObject: FoodPreference;

    ////////EVENTS////////

    receivePrefObject(newPrefObject: FoodPreference) {
        if ('index' in newPrefObject) {
            console.log('edit hai');
            console.log(newPrefObject);
            let index = newPrefObject.index;
            delete newPrefObject.index;
            this.foodItem.food_prefs[index] = newPrefObject;
        }

        else {
            console.log('add hai');
            if(!(this.foodItem.food_prefs)) {
                this.foodItem.food_prefs = []
            }

            this.foodItem.food_prefs.push(newPrefObject);
            console.log(newPrefObject);
        }
    }

    ngOnInit() {
        this.nullFoodItem();
        this.nullPreference();
    }

    ////////BUTTONS////////

    clickConfirm() {
        if (this.foodItem.$key) {
            let key: string = this.foodItem.$key;
            delete this.foodItem.$key;
            this.foodService.editFoodItem(key, this.foodItem).then(() => {
                this.nullFoodItem();
            }).catch((error) => {
                console.log(error);
            })
        }

        else {
            this.foodService.addFoodItem(this.foodItem).then(() => {
                this.nullFoodItem();
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    clickEdit(foodPref: FoodPreference, prefIndex: number) {
        this.prefObject = Object.assign({}, foodPref);
        this.prefObject.index = prefIndex;
    }

    clickRemove(prefIndex: any) {
        this.foodItem.food_prefs.splice(prefIndex, 1);
    }

    ////////METHODS////////

    nullFoodItem() {
        this.foodItem = {
            food_title: '',
            food_price: null,
            food_prefs: []
        }
    }

    nullPreference() {
        this.prefObject = {
            pref_title: '',
            pref_type: '',
            pref_values: []
        }
    }
}