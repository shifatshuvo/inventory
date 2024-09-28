import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { category } from '../shared/interfaces/data-type';
import { Observable } from 'rxjs';


const BASE_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }


  // Create Category
  createCategory(category: any): Observable<category> {
    return this.http.post<category>(BASE_URL + `/categories`, category);
  }


  // update category
  updateACategory(id: any, data: any) {
    return this.http.put<void>(BASE_URL + `/categories/${id}`, data);
  }


  getACat(id: any) {
    return this.http.get<category>(BASE_URL + `/categories/${id}`);
  }


  // get all category
  getAllCategory() {
    return this.http.get<category[]>(BASE_URL + '/categories');
  }


  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(BASE_URL + `/categories/${id}`);
  }

}
