import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceGetCategoryService {
  
  private baseUrl:string="https://oldie-molly.herokuapp.com/category/read.php";
  
  constructor(private http: HttpClient) { }

}
