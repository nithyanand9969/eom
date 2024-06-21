import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  products: any = [];
  searchText: string = '';
  

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getProducts()
    this.apiService.currentProduct.subscribe((data:any) => {
      this.products = data.products;
     
    });
  }


}
