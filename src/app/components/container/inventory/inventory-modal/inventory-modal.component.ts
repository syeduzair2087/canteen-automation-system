import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { InventoryService } from '../../../../services/inventory-service';
import { ToastService } from '../../../../services/toast-service';
import { Item } from '../../../../models/inventory.model';
@Component({
    selector: 'inventory-modal',
    templateUrl: 'inventory-modal.component.html',
    styles: [
        `.font-setting{
            padding: 5px;
    font-size: 1.2em;
    }`]
})
export class InventoryModalComponent {

    ///// INPUT
    @Input() item: Item;
    @Input() inventoryService: InventoryService;

    // item: Item = {
    //     name: '',
    //     quantity: ''
    // }
    constructor(private toastService: ToastService) { }

    clickConfirm() {

        if (this.item.id != '') {
            let key = this.item.id;
            delete this.item.id;
            this.inventoryService.editInventoryItem(key, this.item).then(() => {
                this.toastService.showToast('Inventory', 'Inventory edit successfully!', 'success');
                this.nullItem();
            }).catch((error) => {
                console.log(error);
                this.toastService.showToast('Inventory', error, 'error');
            })
        }
        else {
            delete this.item.id;
            this.inventoryService.addInventoryItem(this.item).then((success) => {
                this.toastService.showToast('Inventory', 'Inventory added successfully!', 'success');
                this.nullItem();
            }).catch((error) => {
                console.log(error);
                this.toastService.showToast('Inventory', error, 'error');
            })
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

    clickCancel() {
        this.nullItem();
    }

}