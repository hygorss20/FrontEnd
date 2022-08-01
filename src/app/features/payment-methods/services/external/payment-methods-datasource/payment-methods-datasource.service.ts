import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { retry, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { PaymentMethod } from "../../../domain/entities/payment-method.type";

@Injectable({
  providedIn: "root",
})
export class PaymentMethodsDatasourceService {
  cachedItens: PaymentMethod[];

  constructor(private http: HttpClient) {}

  findAll(): Observable<PaymentMethod[]> {
    if (this.cachedItens) {
      return of(this.cachedItens);
    }

    return this.http
      .get<PaymentMethod[]>(`${environment.apiUrl}/payment-methods`)
      .pipe(
        retry(3),
        tap((itens) => {
          this.cachedItens = itens;
        })
      );
  }
}
