import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { InventoryFilterByName } from '../.../../../../../../pipes/filter-inventory-pipe';
import { InventoryService } from '../../../../../services/inventory-service';
import { Item } from '../../../../../models/inventory.model';
@Component({
    selector: 'inventoryItem-modal',
    templateUrl: 'inventory-item-modal.component.html'
})
export class InventoryItemConponent {
    inventoryItems: FirebaseListObservable<Array<Item>>;
    filterInventoryName: string = '';
    ////////OUTPUTS////////

    @Output() inventoryItemEvent = new EventEmitter();

    ///////INPUTS//////////

    @Input() item: Item;

    constructor(private inventoryService: InventoryService) { }

    ngOnInit() {
        // this.inventoryService.getInventoryData().subscribe((data) => {
        //     this.inventoryItems = data;
        // }).unsubscribe();
        this.loadOrderData();
    }

    clickConfirm() {
        if (this.item.name != '' || this.item.quantity != '') {
            this.inventoryItemEvent.emit(this.item);
            this.nullInventoryItem();
        }
        else
            console.log('Error while insertion');
    }

    nullInventoryItem() {
        this.item = {
            name: '',
            quantity: '',
            id: ''
        }
    }

    loadOrderData() {
        this.inventoryItems = this.inventoryService.getInventoryData();
    }

    clickCancel(){
        this.nullInventoryItem();
    }

    selectedItem(inventoryItem) {
        this.item.name = inventoryItem.name;
        this.item.id = inventoryItem.$key;
        console.log(inventoryItem.$key);
      
    }
}