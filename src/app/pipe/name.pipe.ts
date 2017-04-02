import { Pipe, PipeTransform } from '@angular/core';
import { UserDetail } from '../models/userDetail.model';

@Pipe({
  name: 'sortByName',
  pure: false
})

export class UserNameFilter implements PipeTransform {
  filterUser: Array<UserDetail> = [];
  transform(UserDetails: Array<UserDetail>, name: string): any {
    this.filterUser.length = 0;
    this.filterUser.push(...UserDetails.filter((userDetail) => userDetail.name.toLocaleLowerCase().indexOf(name.toLowerCase()) !== -1 ));
    // this.filterUser.push(...UserDetails.filter((userDetail) => userDetail.name.toLocaleLowerCase().includes(name.toLowerCase()) ));
    return this.filterUser;
  }
}