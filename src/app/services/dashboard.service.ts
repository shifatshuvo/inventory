import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { category, product } from '../shared/interfaces/data-type';

const BASE_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  // Get Total Products
  getTotalProducts() {
    return this.http.get<any>(BASE_URL + '/products/count');
  }

  // Get Total Category
  getTotalCategory() {
    return this.http.get<any>(BASE_URL + '/categories/count');
  }

  // Get Total users
  getTotalUsers() {
    return this.http.get<any>(BASE_URL + '/users/count');
  }
}
