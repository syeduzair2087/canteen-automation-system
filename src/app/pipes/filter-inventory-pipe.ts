import { Pipe, PipeTransform } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { Item } from '../models/inventory.model';

@Pipe({
    name: 'filterInventoryByName'
})
export class InventoryFilterByName implements PipeTransform {
    transform(inputArray: FirebaseListObservable<Array<Item>>, filterString: string) {
        if (inputArray == null) {
            return null;
        }
        if (filterString == '' || filterString == null) {
            return inputArray;
        }

        return inputArray.filter((item: Item) => item.name.toLocaleLowerCase().includes(filterString.toLocaleLowerCase()));
    }
}

@Pipe({
    name: 'filterInventoryByQuantity'
})
export class InventoryFilterByQuantity implements PipeTransform {
    transform(inputArray: FirebaseListObservable<Array<Item>>, filterString: string) {
        if (inputArray == null) {
            return null;
        }
        if (filterString == '' || filterString == null) {
            return inputArray;
        }

        return inputArray.filter((item: Item) => item.quantity.toLocaleLowerCase().includes(filterString.toLocaleLowerCase()));
    }
}
