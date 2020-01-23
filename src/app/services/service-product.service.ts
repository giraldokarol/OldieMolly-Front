import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../entities/product.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceProductService {
  
  baseUrl:string="https://oldie-molly.herokuapp.com/product";

  constructor(private http: HttpClient) { }

  getAllProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl+'/read.php');
  }
}