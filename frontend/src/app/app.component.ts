import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { CartService } from './cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'frontend';
  searchText: string = '';
  cartCount = 0;

  constructor(private apiService: ApiService,private cart:CartService){

  }

  ngOnInit(): void {
    this.cart.currentItems.subscribe((data)=>{
      this.cartCount =  data.length;
    })
  }

  search() {
    this.apiService.searchProducts(this.searchText);
   }
   clearSearch(){
   this.apiService.clearSearch(this.searchText);
   }
   searchByEnter(){
     this.search()
   }
}
