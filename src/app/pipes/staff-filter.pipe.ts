import { Pipe, PipeTransform } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { Staff } from '../models/staff.model';
@Pipe({
    name: 'sortStaffByName'
})
export class StaffNameFilter  {
    transform(value: Array<Staff>, name: string) {
        if (value == null) {
            return null;
        }
        // return value.map(staffDetails => staffDetails.filter(staff => staff.name.indexOf(name) != -1));
        
        return value.filter((staff : Staff) => staff.name.includes(name));
    }
}