import { FoodPreference } from './preference.model'
import { Item } from './inventory.model';
export interface FoodItem{
    $key?: string,
    food_title: string,
    food_price: number,
    food_prefs?: Array<FoodPreference>
    inventory_item: Array<Item>
}