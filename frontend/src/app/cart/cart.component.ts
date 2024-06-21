import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../cart.service';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: any = [];

  cartCount = 0;
  subTotal = 0;
  estTotal = 0;

  constructor(private cartservice: CartService,private apiservice:ApiService,private router:Router) {}

  ngOnInit(): void {
    this.cartservice.currentItems.subscribe((data: any) => {
      this.cartItems = data;
    });
    this.calculateCartItem();
  }
  deleteItem(product_id: string) {
    const prevItem: any = this.cartItems.find(
      (item: any) => item.product._id == product_id
    );
    if (prevItem) {
      const filterItem = this.cartItems.filter(
        (item: any) => item.product._id !== product_id
      );
      this.cartItems = filterItem;
      this.cartservice.updateItems(filterItem);
    }
    this.calculateCartItem();
  }
  calculateCartItem() {
    this.cartCount = this.cartItems.length;
    this.subTotal = this.cartItems.reduce((acc: any, current: any) => {
      return acc + current.qty;
    }, 0);
    this.estTotal = this.cartItems.reduce((acc: any, current: any) => {
      return acc + current.product.price * current.qty;
    }, 0);
  }
  decreaseQty(product_id: string) {
    const prevItem: any = this.cartItems.find(
      (item: any) => item.product._id == product_id
    );
    let qty = prevItem.qty;
    if (qty == 1) return;
    qty = qty - 1;
    if (prevItem) {
      this.cartItems = this.cartItems.map((item: any) => {
        if (item.product._id == prevItem.product._id) {
          item.qty = qty;
        }
        return item;
      });
      this.cartservice.updateItems(this.cartItems);
      this.calculateCartItem();
    }
  
  }
  increasedQty(product_id: string) {
    const prevItem: any = this.cartItems.find(
      (item: any) => item.product._id == product_id
    );
    let qty = prevItem.qty;
    if (qty == prevItem.product.stock) {
      return;
    }
    qty = qty + 1;
    if (prevItem) {
      this.cartItems = this.cartItems.map((item: any) => {
        if (item.product._id == prevItem.product._id) {
          item.qty = qty;
        }
        return item;
      });
      this.cartservice.updateItems(this.cartItems);
      this.calculateCartItem();
    }
  }
  orderComplete(){
    const order = this.cartItems;
    this.apiservice.orderCreate(order).subscribe((data:any)=>{
      if(data.success == true){
        const orderId = data.order._id;
        this.router.navigate(['order','success',orderId])
        this.cartservice.updateItems([]);
      }
    });
  }
}
