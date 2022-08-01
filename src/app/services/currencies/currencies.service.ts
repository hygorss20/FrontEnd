import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { CurrencyEnum } from "src/app/utils/currencies/currencies.enum";
import { Currency } from "src/app/model/currency";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { retry } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CurrenciesService {
  private current$: BehaviorSubject<Currency>;

  private availables$: BehaviorSubject<Array<Currency>>;

  constructor(private http: HttpClient) {
    const availables = [
      { id: CurrencyEnum.USD, symbol: "$", conversionToUSDValue: 1 },
    ];
    this.current$ = new BehaviorSubject(availables[0]);
    this.availables$ = new BehaviorSubject(availables);

    this.http
      .get<Array<Currency>>(`${environment.apiUrl}/currencies`)
      .pipe(retry(2))
      .subscribe((currencies) => {
        this.availables$.next(currencies);
      });
  }

  setCurrency(currency: CurrencyEnum): void {
    this.availables$.subscribe((currencies) => {
      this.current$.next(currencies.find((c) => c.id === currency));
    });
  }

  getCurrency(): BehaviorSubject<Currency> {
    return this.current$;
  }

  getAvailable(): Observable<Array<Currency>> {
    return this.availables$;
  }

  convertToUSD(price: number, currency: Currency): number {
    return price / currency.conversionToUSDValue;
  }

  convertFromUSD(price: number, currency: Currency): number {
    return price * currency.conversionToUSDValue;
  }
}
