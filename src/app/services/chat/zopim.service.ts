import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Purchase } from "src/app/model/purchase";
import { environment } from "src/environments/environment";
import { isPlatformBrowser } from "@angular/common";
import { Customer } from "src/app/model/customer";
import { getDefaultMessage } from "./messages-templates/default-message";
import { getAccountMessage } from "./messages-templates/account-message";
import { getFirecapeMessage } from "./messages-templates/firecape-message";
declare var window: any;

@Injectable({
  providedIn: "root",
})
export class ZopimService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  setDefaultLanguage() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    window.$zopim(() => {
      window.$zopim.livechat.setLanguage("en");
    });
  }

  setDefaultColor() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    window.$zopim(() => {
      window.$zopim.livechat.setColor("#823285");
    });
  }

  startPurchaseChatFirecape(purchase: Purchase, totalPrice: string) {
    const message = getFirecapeMessage(purchase, totalPrice);
    this.startChat(purchase.customer, message);
  }

  startPurchaseChat(purchase: Purchase) {
    const message = getDefaultMessage(purchase);
    this.startChat(purchase.customer, message);
  }

  startPurchaseChatAccount(purchase: Purchase, totalPrice: string) {
    const message = getAccountMessage(purchase, totalPrice);
    this.startChat(purchase.customer, message);
  }

  private startChat(customer: Customer, message: string) {
    const email = customer.email;
    const name = customer.nickname;

    message = message.trim();

    if (!environment.production) {
      console.debug(
        "[Zopim service] Chat messages will not be sent in development environment."
      );
      console.debug("[Zopim service] Tried to send this message:");
      console.debug(message);

      console.debug("[Zopim service] Customer info:", { email, name });
      return;
    }

    window.$zopim(() => {
      window.$zopim.livechat.setEmail(email);
      window.$zopim.livechat.setName(name);
      window.$zopim.livechat.window.setSize("large");
      window.$zopim.livechat.theme.reload();

      setTimeout(() => {
        window.$zopim.livechat.say(message);
        window.$zopim.livechat.window.show();
      }, 100);
    });
  }
}
