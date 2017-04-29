import { Component } from '@angular/core';
import { Item } from '../../../models/inventory.model';
import { FirebaseListObservable } from 'angularfire2';
import loadTheme = require('../../../../js/admin');
import { InventoryService } from '../../../services/inventory-service';
import * as inventoryFilters from '../../../pipes/filter-inventory-pipe';
@Component({
    selector: 'inventory-component',
    templateUrl: 'inventory.component.html'
})
export class InventoryComponent {
    filterBy: string = 'name';
    filterInventoryName: string = '';
    filterInventoryQuantity: string = '';
    inventoryData: FirebaseListObservable<Array<Item>>;
    item: Item = {
        name: '',
        quantity: '',
        id: ''
    }
    constructor(private inventoryService: InventoryService) { }

    ngOnInit() {
        this.loadInventoryData();
    }

    onFilterTypeChange() {
        this.filterInventoryName = '';
        this.filterInventoryQuantity = '';

        setTimeout(() => {
            loadTheme();
        }, 10);
    }

    clickAddInventory() {
        if ('id' in this.item)
            delete this.item.id;

        this.item = {
            name: '',
            quantity: ''
        }
    }

    clickEditInventory(item) {
        this.item = {
            name: item.name,
            quantity: item.quantity,
            id: item.$key
        }
        console.log(item);

    }

    loadInventoryData() {
        this.inventoryData = this.inventoryService.getInventoryData();
    }

}