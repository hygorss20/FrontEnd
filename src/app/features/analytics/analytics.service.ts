import { Injectable } from "@angular/core";
import { Payment } from "src/app/model/payment";
import { Product } from "src/app/model/product-model";
import { Purchase } from "src/app/model/purchase";
import { GtagAnalyticsService } from "./gtag-analytics.service";

@Injectable()
export class AnalyticsService {
  constructor(private gtagAnalyticsService: GtagAnalyticsService) {}

  public trackPage(pagePath: string) {
    this.gtagAnalyticsService.trackPage(pagePath);
  }

  public trackEvent(eventName: string, eventData: any) {
    this.gtagAnalyticsService.trackEvent(eventName, eventData);
  }

  public sendViewItemEvent(product: Product) {
    const unitPrice = product.sellPrice;

    this.trackEvent("view_item", {
      currency: "USD",
      value: unitPrice,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.type,
          price: unitPrice,
          quantity: 1,
        },
      ],
    });
  }

  public sendBeginCheckoutEvent(product: Product, quantity: number) {
    const unitPrice = product.sellPrice;

    this.trackEvent("begin_checkout", {
      currency: "USD",
      value: quantity * unitPrice,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.type,
          price: unitPrice,
          quantity: quantity,
        },
      ],
    });
  }

  public sendAddPaymentInfoEvent(
    product: Product,
    quantity: number,
    payment: Payment
  ) {
    const unitPrice = product.sellPrice;

    this.trackEvent("add_payment_info", {
      currency: "USD",
      payment_type: payment.id,
      value: quantity * unitPrice,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.type,
          price: unitPrice,
          quantity: quantity,
        },
      ],
    });
  }

  public sendPurchaseEvent(purchase: Purchase) {
    this.trackEvent("purchase", {
      transaction_id: purchase.id,
      currency: "USD",
      value: purchase.total,
      tax: 0,
      shipping: 0,
      items: purchase.items.map((purchaseItem) => ({
        item_id: purchaseItem.item.id,
        item_name: purchaseItem.item.name,
        item_category: purchaseItem.item.type,
        price: purchaseItem.item.sellPrice,
        quantity: purchaseItem.quantity,
      })),
    });
  }
}
