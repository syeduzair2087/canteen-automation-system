import { BucketItem } from './bucketItem.model';
import { User } from './user.model';

export interface Order {
    userId: string,
    orderTime: string,
    status: string,
    amount: number,
    items: Array<BucketItem>,
    user?: User
}