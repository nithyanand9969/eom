import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { subscribe } from 'diagnostics_channel';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  productsSource = new BehaviorSubject([]);
  currentProduct = this.productsSource.asObservable();
  productTemp = [];

  getProducts() {
    this.http
      .get(environment.apiUrl + '/api/v1/products')
      .subscribe((data: any) => {
        this.productsSource.next(data);
      });
  }

  searchProducts(searchText: string) {
    return this.http
      .get(environment.apiUrl + '/api/v1/products', {
        params: { keyword: searchText },
      })
      .subscribe((data: any) => {
        this.productsSource.next(data);
        this.productTemp = data;
      });
  }

  clearSearch(searchText: string) {
    if (searchText == '') {
      this.productsSource.next(this.productTemp);
    }
  }
  getSingleProduct(id:string){
    return this.http
      .get(environment.apiUrl + '/api/v1/products/'+id)
      
  }
  orderCreate(order:any){
   return this.http.post(environment.apiUrl + '/api/v1/order',order)
  }
}
