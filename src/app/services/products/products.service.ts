import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Product } from "src/app/model/product-model";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  findById(id: string): Observable<Product> {
    return this.http.get<Product>(`${environment.apiUrl}/products/${id}`);
  }

  findNewWorldGoldProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(
      `${environment.apiUrl}/products/new-world-gold`
    );
  }
}
