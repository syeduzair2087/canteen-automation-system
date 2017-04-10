import { Pipe, PipeTransform } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { FoodItem } from '../models/food.model';

@Pipe({
    name: 'filterFoodByName',
    pure: false
})

export class FilterFoodByNamePipe implements PipeTransform {
    transform(inputArray: FirebaseListObservable<Array<FoodItem>>, filterString: string) {
        if (inputArray == null) {
            return null;
        }
        if (filterString == '' || filterString == null) {
            return inputArray;
        }

        return inputArray.filter((foodItem: FoodItem) => foodItem.food_title.toLocaleLowerCase().includes(filterString.toLocaleLowerCase()));
    }
}