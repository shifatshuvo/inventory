import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page, product } from '../shared/interfaces/data-type';

const BASE_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  // Get paginated product data with optional search and sort by category
  getProductData(
    page: number,
    size: number,
    category?: number,
    searchQuery?: string
  ): Observable<Page<product>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (category) {
      params = params.set('catId', category.toString());
    }
    if (searchQuery) {
      params = params.set('txt', searchQuery);
    }

    return this.http.get<Page<product>>(BASE_URL + `/products`, { params });
  }

  addProduct(product: any): Observable<product> {
    return this.http.post<product>(BASE_URL + `/products`, product);
  }

  getAProduct(id: any) {
    return this.http.get<product>(BASE_URL + `/products/${id}`);
  }

  updateAProduct(data: any, id: any) {
    return this.http.put<void>(BASE_URL + `/products/${id}`, data);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(BASE_URL + `/products/${id}`);
  }

  // While inc and dec
  updateProduct(product: product): Observable<product> {
    return this.http.put<product>(`/products/${product.id}`, product);
  }

  // New method to increment product quantity
  incrementProductQuantity(
    productId: number,
    amount: number
  ): Observable<product> {
    return this.http.put<product>(
      `${BASE_URL}/products/${productId}/increment`,
      null,
      { params: { amount: amount.toString() } }
    );
  }

  // New method to decrement product quantity
  decrementProductQuantity(
    productId: number,
    amount: number
  ): Observable<product> {
    return this.http.put<product>(
      `${BASE_URL}/products/${productId}/decrement`,
      null,
      { params: { amount: amount.toString() } }
    );
  }
}


























// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Page, product } from '../shared/interfaces/data-type';
// import { Observable } from 'rxjs';

// const BASE_URL = 'http://localhost:8080';

// @Injectable({
//   providedIn: 'root',
// })
// export class ProductService {
//   constructor(private http: HttpClient) {}

//   // Get paginated product data with optional search and sort by category
//   getProductData(page: number, size: number, category?: number, searchQuery?: string): Observable<Page<product>> {
//     let params = new HttpParams()
//       .set('page', page.toString())
//       .set('size', size.toString());

//     if (category) {
//       params = params.set('category', category.toString());
//     }
//     if (searchQuery) {
//       params = params.set('search', searchQuery);
//     }

//     return this.http.get<Page<product>>(BASE_URL + `/products`, { params });
//   }

//   // add product
//   addProduct(product: any): Observable<product> {
//     return this.http.post<product>(BASE_URL + `/products`, product);
//   }

//   // GET A PRODUCT
//   getAProduct(id: any) {
//       return this.http.get<product>(BASE_URL + `/products/${id}`);
//   }

//   // Update a Product
//   updateAProduct(data: any, id: any) {
//     return this.http.put<void>(BASE_URL + `/products/${id}`, data);
//   }

//   // delete product
//   deleteProduct(id: number): Observable<void> {
//     return this.http.delete<void>(BASE_URL + `/products/${id}`);
//   }
// }
