import { Pipe, PipeTransform } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { Staff } from '../models/staff.model';
@Pipe({
    name: 'filterStaffByName'
})
export class StaffNameFilter {
    transform(inputArray: FirebaseListObservable<Array<Staff>>, filterString: string) {
        if (inputArray == null) {
            return null;
        }
        if (filterString == "" || filterString == null) {
            return inputArray;
        }

        return inputArray.filter((staff: Staff) => staff.name.toLocaleLowerCase().includes(filterString.toLocaleLowerCase()));
    }
}