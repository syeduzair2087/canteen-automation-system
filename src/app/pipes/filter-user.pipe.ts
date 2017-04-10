import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model';

@Pipe({
  name: 'filterUserByName',
  pure: false
})

export class FilterUserByNamePipe implements PipeTransform {
  result: Array<User> = [];
  transform(inputArray: Array<User>, filterString: string): any {
    this.result.length = 0;
    this.result.push(...inputArray.filter((inputValue) => inputValue.name.toLocaleLowerCase().includes(filterString.toLowerCase())));
    // this.filterUser.push(...UserDetails.filter((userDetail) => userDetail.name.toLocaleLowerCase().includes(name.toLowerCase()) ));
    return this.result;
  }
}

@Pipe({
  name: 'filterUserByEmail',
  pure: false
})

export class FilterUserByEmailPipe implements PipeTransform {
  result: Array<User> = [];
  transform(inputArray: Array<User>, filterString: string): any {
    this.result.length = 0;
    this.result.push(...inputArray.filter((inputValue) => inputValue.email.toLocaleLowerCase().includes(filterString.toLowerCase())));
    // this.filterUser.push(...UserDetails.filter((userDetail) => userDetail.name.toLocaleLowerCase().includes(name.toLowerCase()) ));
    return this.result;
  }
}

@Pipe({
  name: 'filterUserByContact',
  pure: false
})

export class FilterUserByContactPipe implements PipeTransform {
  result: Array<User> = [];
  transform(inputArray: Array<User>, filterString: string): any {
    this.result.length = 0;
    this.result.push(...inputArray.filter((inputValue) => inputValue.contact.includes(filterString.toLowerCase())));
    // this.filterUser.push(...UserDetails.filter((userDetail) => userDetail.name.toLocaleLowerCase().includes(name.toLowerCase()) ));
    return this.result;
  }
}

@Pipe({
  name: 'filterUserByCabin',
  pure: false
})

export class FilterUserByCabinPipe implements PipeTransform {
  result: Array<User> = [];
  transform(inputArray: Array<User>, filterString: string): any {
    this.result.length = 0;
    this.result.push(...inputArray.filter((inputValue) => inputValue.cabin.toString().includes(filterString.toLowerCase())));
    // this.filterUser.push(...UserDetails.filter((userDetail) => userDetail.name.toLocaleLowerCase().includes(name.toLowerCase()) ));
    return this.result;
  }
}