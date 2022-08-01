import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { delay, map } from "rxjs/operators";
import { PaymentMethod } from "../../../domain/entities/payment-method.type";
import { PaymentMethodsDatasourceService } from "../../external/payment-methods-datasource/payment-methods-datasource.service";

@Injectable({
  providedIn: "root",
})
export class PaymentMethodsRepositoryService {
  constructor(
    private paymentMethodsDatasourceService: PaymentMethodsDatasourceService
  ) {}

  getAvaliableMethods(): Observable<PaymentMethod[]> {
    return this.paymentMethodsDatasourceService
      .findAll()
      .pipe(
        map((paymentMethods) => this.getPaymentMethodsWithIcons(paymentMethods))
      );
  }

  getPaymentMethodsWithIcons(paymentMethods: PaymentMethod[]) {
    const icons = this.getIcons();

    return paymentMethods.map((method) => ({
      icon: icons[method.id] || "",
      ...method,
    }));
  }

  getIcons(): { [key: string]: string } {
    return {
      PAYPAL: "assets/payment-methods/paypal.png",
      BTC: "assets/payment-methods/bitcoin.png",
      ETH: "assets/payment-methods/ethereum.png",
      LTC: "assets/payment-methods/litecoin.png",
      XRP: "assets/payment-methods/ripple.png",
      USDT: "assets/payment-methods/tether.png",
      USDC: "assets/payment-methods/usd-coin.png",
      "western-union": "assets/payment-methods/western-union.png",
      alipay: "assets/payment-methods/alipay.png",
      skrill: "assets/payment-methods/skrill.png",
      tron: "assets/payment-methods/tron.png",
      wechat: "assets/payment-methods/wechat.png",
      webmoney: "assets/payment-methods/webmoney.png",
    };
  }
}
