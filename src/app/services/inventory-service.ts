import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Item } from '../models/inventory.model';
@Injectable()
export class InventoryService {
    public constructor(private angularFire: AngularFire) { }

    addInventoryItem(item: Item) {

        return new Promise((res, rej) => {

            this.angularFire.database.list('/inventory').push(item).then((success) => {
                res('Insert successfully!');
            }).catch((error) => {
                rej(error.message);
                console.log(error.message);
            })
        })
    }


    editInventoryItem(key: string, item: Item) {
        return new Promise((res, rej) => {
            this.angularFire.database.object('/inventory/' + key + '/').update(item).then((success) => {
                res("item updated successfully!");
            }).catch((error) => {
                rej(error.message);
                console.log(error.message);
            })
        })
    }

    getInventoryData() {
        return this.angularFire.database.list('inventory');
    }

}