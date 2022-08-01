import { Injectable } from "@angular/core";

declare var gtag: any;

@Injectable()
export class GtagAnalyticsService {
  constructor() {}

  public trackPage(pagePath: string) {
    this.gTag("set", "page_path", pagePath);
    this.trackEvent("page_view");
  }

  public trackEvent(eventName: string, eventData: any = null) {
    if (eventData) {
      this.gTag("event", eventName, eventData);
      return;
    }

    this.gTag("event", eventName);
  }

  gTag(...args) {
    if (!gtag) {
      console.error("gtag.js is not loaded!");
      return;
    }

    gtag(...args);
  }
}
