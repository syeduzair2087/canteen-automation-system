import { Pipe, PipeTransform } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { StaffMember } from '../models/staff-member.model';

@Pipe({
    name: 'filterStaffByName'
})
export class StaffMemberFilterByName implements PipeTransform {
    transform(inputArray: FirebaseListObservable<Array<StaffMember>>, filterString: string) {
        if (inputArray == null) {
            return null;
        }
        if (filterString == '' || filterString == null) {
            return inputArray;
        }

        return inputArray.filter((staffMember: StaffMember) => staffMember.name.toLocaleLowerCase().includes(filterString.toLocaleLowerCase()));
    }
}

@Pipe({
    name: 'filterStaffByEmail'
})
export class StaffMemberFilterByEmail implements PipeTransform {
    transform(inputArray: FirebaseListObservable<Array<StaffMember>>, filterString: string) {
        if (inputArray == null) {
            return null;
        }
        if (filterString == '' || filterString == null) {
            return inputArray;
        }

        return inputArray.filter((staffMember: StaffMember) => staffMember.email.toLocaleLowerCase().includes(filterString.toLocaleLowerCase()));
    }
}

@Pipe({
    name: 'filterStaffByContact'
})
export class StaffMemberFilterByContact implements PipeTransform {
    transform(inputArray: FirebaseListObservable<Array<StaffMember>>, filterString: string) {
        if (inputArray == null) {
            return null;
        }
        if (filterString == '' || filterString == null) {
            return inputArray;
        }

        return inputArray.filter((staffMember: StaffMember) => staffMember.contact.toString().includes(filterString.toLocaleLowerCase()));
    }
}

@Pipe({
    name: 'filterStaffByCnic'
})
export class StaffMemberFilterByCnic implements PipeTransform {
    transform(inputArray: FirebaseListObservable<Array<StaffMember>>, filterString: string) {
        if (inputArray == null) {
            return null;
        }
        if (filterString == '' || filterString == null) {
            return inputArray;
        }

        return inputArray.filter((staffMember: StaffMember) => staffMember.cnic.toString().includes(filterString));
    }
}

@Pipe({
    name: 'filterStaffByAddress'
})
export class StaffMemberFilterByAddress implements PipeTransform {
    transform(inputArray: FirebaseListObservable<Array<StaffMember>>, filterString: string) {
        if (inputArray == null) {
            return null;
        }
        if (filterString == '' || filterString == null) {
            return inputArray;
        }

        return inputArray.filter((staffMember: StaffMember) => staffMember.address.toLocaleLowerCase().includes(filterString.toLocaleLowerCase()));
    }
}