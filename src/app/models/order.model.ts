import { BucketItem } from './bucketItem.model';
import { User } from './user.model';
import { OrderStatus } from './status.model';

export interface Order {
    userId: string,
    orderTime: string,
    status: OrderStatus,
    amount: number,
    items: Array<BucketItem>,
    user?: User
}