import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, empty } from "rxjs";
import { PurchaseItem, Purchase } from "src/app/model/purchase";
import { Product } from "src/app/model/product-model";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { CurrencyEnum } from "src/app/utils/currencies/currencies.enum";
import { tap } from "rxjs/operators";
import { AnalyticsService } from "src/app/features/analytics/analytics.service";
import { ProductType } from "src/app/model/product-type.model";

@Injectable({
  providedIn: "root",
})
export class CartService {
  cart: Array<PurchaseItem>;
  cart$: BehaviorSubject<Array<PurchaseItem>>;

  constructor(
    private http: HttpClient,
    private analyticsService: AnalyticsService
  ) {
    this.cart = [];
    this.cart$ = new BehaviorSubject(this.cart);
  }

  addToCart(item: PurchaseItem) {
    this.cart.push(item);
    this.cart$.next(this.cart);
  }

  removeFromCart(item: Product) {
    this.cart = this.cart.filter((i) => i.item.id !== item.id);
    this.cart$.next(this.cart);
  }

  clearCart() {
    this.cart = [];
    this.cart$.next(this.cart);
  }

  getCart() {
    return this.cart;
  }

  checkout(purchase: PurchaseRequest): Observable<Purchase> {
    purchase.items = this.cart.map((item) => {
      const product: Product = item.item;

      if (product.type === ProductType.NEW_WORLD_GOLD) {
        return {
          product: product.type,
          newWorldGoldId: product.id,
          quantity: item.quantity,
        };
      }

      return { product: product.id, quantity: item.quantity };
    });

    return this.http
      .post<Purchase>(`${environment.apiUrl}/orders`, purchase)
      .pipe(tap(this.sendPurchaseEvent.bind(this)));
  }

  checkoutAccount(purchase: PurchaseRequest): Observable<Purchase> {
    purchase.items = this.cart.map((item) => {
      return { product: item.item.id, quantity: item.quantity };
    });

    return this.http
      .post<Purchase>(`${environment.apiUrl}/orders/account`, purchase)
      .pipe(tap(this.sendPurchaseEvent.bind(this)));
  }

  private sendPurchaseEvent(purchase: Purchase) {
    if (purchase.type === "BUY") {
      this.analyticsService.sendPurchaseEvent(purchase);
    }
  }
}

export interface PurchaseRequest {
  currency: CurrencyEnum;
  type: string;
  paymentMethod: string;
  customer: { email: string; nickname: string; password: string };
  customerNote?: string;
  items?: Array<{ product; quantity }>;
  userGameNameLabel?: string;
}
