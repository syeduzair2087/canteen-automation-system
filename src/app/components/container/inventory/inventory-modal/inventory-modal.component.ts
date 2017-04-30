import { Component, Input } from '@angular/core';
import { InventoryService } from '../../../../services/inventory-service';
import { Item } from '../../../../models/inventory.model';
@Component({
    selector: 'inventory-modal',
    templateUrl: 'inventory-modal.component.html'
})
export class InventoryModalComponent {

    ///// INPUT
    @Input() item: Item;
    @Input() inventoryService: InventoryService;

    // item: Item = {
    //     name: '',
    //     quantity: ''
    // }
    constructor() { }

    clickConfirm() {

        if (this.item.id != '' ) {
            let key = this.item.id;
            delete this.item.id;
            this.inventoryService.editInventoryItem(key, this.item).then(() => {
                this.nullItem();
            }).catch((error) => {
                console.log(error);
            })
        }
        else {
            delete this.item.id;
            this.inventoryService.addInventoryItem(this.item).then((success) => {
                this.nullItem();
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    nullItem() {
        this.item = {
            name: '',
            quantity: '',
            id: ''
        }
    }

    clickCancel() {
        this.nullItem();
    }

}