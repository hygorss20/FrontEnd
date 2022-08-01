import { isPlatformBrowser } from "@angular/common";
import { Component, Inject, PLATFORM_ID } from "@angular/core";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { filter } from "rxjs/operators";
import { AnalyticsService } from "./features/analytics/analytics.service";
import { horizontalSlideAnimation } from "./utils/animations/animations";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [horizontalSlideAnimation],
})
export class AppComponent {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private analyticsService: AnalyticsService
  ) {
    this.listenRouteChange();
  }

  getHorizontalState(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData["animation"]
    );
  }

  onActivate() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  listenRouteChange() {
    this.router.events
      .pipe(filter((event) => event !== null && event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.analyticsService.trackPage(event.url);
      });
  }
}
