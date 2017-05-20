import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FoodItem } from '../../../../models/food.model';
import { FoodPreference } from '../../../../models/preference.model';
import { FoodService } from '../../../../services/food-service';
import { Item } from '../../../../models/inventory.model';
import { ToastService } from '../../../../services/toast-service';
declare var $: any;
@Component({
    selector: 'food-modal',
    templateUrl: 'food-modal.component.html',
    styles: [
        `.text-font{
            padding: 5px;
    font-size: 1.2em;
    }`]
})

export class FoodModalComponent {
    constructor(private toastService: ToastService) { }
    ////////INPUTS////////


    @Input() foodService: FoodService;
    @Input() foodItem: FoodItem;

    ////////DECLARATIONS////////

    prefObject: FoodPreference;
    item: Item;
    inventoryItem: Array<Item> = [];

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
            if (!(this.foodItem.food_prefs)) {
                this.foodItem.food_prefs = []
            }

            this.foodItem.food_prefs.push(newPrefObject);
            console.log(newPrefObject);
        }
        this.setScroll();
    }

    recivedInventoryItem(newItem: Item) {
        //  this.inventoryItem.push(newItem);
        // console.log(this.inventoryItem);
        // document.getElementById('foodModal').classList.remove('modal-open');
        // setTimeout(function() {
        // document.getElementById('foodModal').classList.add('modal-open');    
        // }, 5);

        this.foodItem.inventory_item.push(newItem);
        console.log(this.foodItem.inventory_item);
        this.nullItem();
        this.setScroll();
    }

    ngOnInit() {
        this.nullFoodItem();
        this.nullPreference();
        this.nullItem();
    }

    ////////BUTTONS////////

    clickConfirm() {
        if (this.foodItem.$key) {
            let key: string = this.foodItem.$key;
            delete this.foodItem.$key;
            console.log(key);
            this.foodService.editFoodItem(key, this.foodItem).then(() => {
                this.nullFoodItem();
            }).catch((error) => {
                console.log(error);
                this.toastService.showToast('Food', error, 'error');
            })
            console.log(this.foodItem);

        }

        else {
            this.foodService.addFoodItem(this.foodItem).then(() => {
                this.nullFoodItem();
            }).catch((error) => {
                console.log(error);
                this.toastService.showToast('Food', error, 'error');
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


    clickEditItem(inventoryItem: Item, itemIndex: number) {
        this.foodItem.inventory_item[itemIndex] = inventoryItem;
    }

    clickRemoveItem(itemIndex: any) {
        this.foodItem.inventory_item.splice(itemIndex, 1)
    }


    ////////METHODS////////

    nullFoodItem() {
        this.foodItem = {
            food_title: '',
            food_price: null,
            food_prefs: [],
            inventory_item: []
        }
    }

    nullPreference() {
        this.prefObject = {
            pref_title: '',
            pref_type: '',
            pref_values: []
        }
    }

    nullItem() {
        this.item = {
            name: '',
            quantity: '',
            id: '',
            unit: ''
        }
    }
    cancelModal(cancelString) {
        this.setScroll();
        console.log(cancelString);

    }

    setScroll() {
        $('.modal').on('hidden.bs.modal', function (e) {
            if ($('.modal').hasClass('in')) {
                $('body').addClass('modal-open');
            }
        });
    }
}