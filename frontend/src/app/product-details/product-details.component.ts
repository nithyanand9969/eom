import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { CartService } from '../cart.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule,ToastrModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  product: any = null;
  qty: number = 1;

  constructor(private route: ActivatedRoute, private api: ApiService,private cart:CartService,private toaster:ToastrService) {}

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      const id: string = data['id'];
      this.api.getSingleProduct(id).subscribe((data: any) => {
        this.product = data.product;
      });
    });
  }
  decreaseQty() {
    if (this.qty == 1) return;
    this.qty = this.qty - 1;
  }

  increaseQty() {
    if(this.qty == this.product.stock){
      return
    }
    this.qty = this.qty + 1;
  }
  addToCart(){
    const newCartItem = {
      product : this.product,
      qty : this.qty
    }
    if( this.product.stock==0){
      this.toaster.error("cannot add item out of stack","Mini Ecomme")
      return;

    }
    //add the cart itme 
    this.cart.addItem(newCartItem)
    this.toaster.success("product Cart in to cart Itme","Mini Ecomme")
  }
}
