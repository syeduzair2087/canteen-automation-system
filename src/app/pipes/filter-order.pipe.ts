import { Pipe, PipeTransform } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { Order } from '../models/order.model';

@Pipe({
    name: 'filterOrderByStatus',
    pure: false
})
export class FilterOrdersByStatusPipe implements PipeTransform {
    // transform(inputArray: FirebaseListObservable<Array<Order>>, filterString: string) {
    //     if (inputArray == null) {
    //         return null;
    //     }
    //     if (filterString == '' || filterString == null) {
    //         return inputArray;
    //     }

    //     return inputArray.filter((order: Order) => order.status.state == filterString);
    // }
    result: Array<Order> = [];
    transform(inputArray: Array<Order>, filterString: string): any {
        this.result.length = 0;
        this.result.push(...inputArray.filter((order: Order) => order.status.state == filterString));
        // this.filterUser.push(...UserDetails.filter((userDetail) => userDetail.name.toLocaleLowerCase().includes(name.toLowerCase()) ));
        return this.result;
    }
}