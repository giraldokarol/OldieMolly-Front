import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../entities/category.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceGetCategoryService {
  
  private baseUrl:string="https://oldie-molly.herokuapp.com/category";
  
  constructor(private http: HttpClient) { }
  
  getAllCategories():Observable<Category[]>{
    return this.http.get<Category[]>(this.baseUrl + '/read.php');
  }
}
