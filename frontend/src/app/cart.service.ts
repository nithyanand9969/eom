import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  itemsSource = new BehaviorSubject([]);
  currentItems = this.itemsSource.asObservable();
  cartItems: any = [];

  constructor() {}

  addItem(newCartItem: any) {
    const precartITme = this.cartItems.find(
      (el: any) => el.product._id == newCartItem.product._id
    );
    if (precartITme) {
      this.cartItems= this.cartItems.map((item:any)=>{
        if(item.product._id == precartITme.product._id){
          item.qty = item.qty+1;

        }
          return item;
      })
    } else {
      this.cartItems.push(newCartItem);
    }

    this.itemsSource.next(this.cartItems);
  }
  updateItems(items:[]){
    this.cartItems =  items;
    this.itemsSource.next(this.cartItems);

  }
}
