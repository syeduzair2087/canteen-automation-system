import { Pipe, PipeTransform } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { Staff } from '../models/staff.model';
@Pipe({
    name: 'filterStaffByName'
})
export class StaffNameFilter  {
    transform(inputArray: Array<Staff>, filterString: string) {
        if (inputArray == null) {
            return null;
        }
        // return inputArray.map(staffDetails => staffDetails.filter(staff => staff.name.indexOf(filterString) != -1));
        if(filterString == "" || filterString == null){
            return inputArray;
        }

        return inputArray.filter((staff : Staff) => staff.name.toLowerCase().includes(filterString.toLowerCase()));
    }
}