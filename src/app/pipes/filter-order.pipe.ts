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


@Pipe({
    name: 'filterOrderById',
})
export class FilterOrdersByIdPipe implements PipeTransform {
    result: Array<Order> = [];
    transform(inputArray: Array<Order>, filterId: string): any {
        if(inputArray == null){
            return null;
        }
        if(filterId == null || filterId == ''){
            return inputArray;
        }
        this.result.length = 0;
        this.result.push(...inputArray.filter((order) => order.orderId == parseInt(filterId)));
        return this.result;
    }
}

@Pipe({
    name: 'filterOrderByEmail',
})
export class FilterOrdersByEmailPipe implements PipeTransform {
    result: Array<Order> = [];
    transform(inputArray: Array<Order>, filterString: string): any {
         if(inputArray == null){
            return null;
        }
        if(filterString == null || filterString == ''){
            return inputArray;
        }
        this.result.length = 0;
        this.result.push(...inputArray.filter((order) => order.user.email.toLocaleLowerCase().includes(filterString.toLowerCase())));
        return this.result;
    }
}


@Pipe({
    name: 'filterOrderByContact',
})
export class FilterOrdersByContactPipe implements PipeTransform {
    result: Array<Order> = [];
    transform(inputArray: Array<Order>, filterString: string): any {
        if(inputArray == null){
            return null;
        }
        if(filterString == null || filterString == ''){
            return inputArray;
        }
        this.result.length = 0;
        this.result.push(...inputArray.filter((order) => order.user.contact.toLocaleLowerCase().includes(filterString.toLowerCase())));
        return this.result;
    }
}



@Pipe({
    name: 'filterOrderByAmount',
})
export class FilterOrdersByAmountPipe implements PipeTransform {
    result: Array<Order> = [];
    transform(inputArray: Array<Order>, filterString: string): any {
        if(inputArray == null){
            return null;
        }
        if(filterString == null || filterString == ''){
            return inputArray;
        }
        this.result.length = 0;
        this.result.push(...inputArray.filter((order) => order.amount.toString().toLocaleLowerCase().includes(filterString.toLowerCase())));
        return this.result;
    }
}

@Pipe({
    name: 'filterOrderByCabin',
})
export class FilterOrdersByCabinPipe implements PipeTransform {
    result: Array<Order> = [];
    transform(inputArray: Array<Order>, filterString: string): any {
        if(inputArray == null){
            return null;
        }
        if(filterString == null || filterString == ''){
            return inputArray;
        }
        this.result.length = 0;
         this.result.push(...inputArray.filter((order) => order.user.cabin.toString().toLocaleLowerCase().includes(filterString.toLowerCase())));
        return this.result;
    }
}


@Pipe({
    name: 'filterOrderByDate',
})
export class FilterOrdersByDatePipe implements PipeTransform {
    result: Array<Order> = [];
    transform(inputArray: Array<Order>, filterString: string): any {

        if(inputArray == null){
            return null;
        }
        if(filterString == null || filterString == ''){
            return inputArray;
        }
        this.result.length = 0;
        this.result.push(...inputArray.filter((order) => new Date(order.orderTime).getDate().toString().includes( new Date(filterString).getDate().toString())));
        return this.result;
    }
}


@Pipe({
    name: 'filterOrderByName',
})
export class FilterOrdersByNamePipe implements PipeTransform {
    result: Array<Order> = [];
    transform(inputArray: Array<Order>, filterString: string): any {
        if(inputArray == null){
            return null;
        }
        if(filterString == null || filterString == ''){
            return inputArray;
        }
        this.result.length = 0;
        this.result.push(...inputArray.filter((order) => order.user.name.toLocaleLowerCase().includes(filterString.toLowerCase())));
        return this.result;
    }
}



@Pipe({
    name: 'filterOrderByTime',
})
export class FilterOrdersByTimePipe implements PipeTransform {
    result: Array<Order> = [];
    transform(inputArray: Array<Order>, filterString: string): any {
        if(inputArray == null){
            return null;
        }
        if(filterString == null || filterString == ''){
            return inputArray;
        }
        this.result.length = 0;
        this.result.push(...inputArray.filter((order) => (new Date(order.orderTime).getHours() + ':' + new Date(order.orderTime).getMinutes()).toString().includes(filterString.toString())))   ;
        return this.result;
    }
}