import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AnalyticsService } from "./analytics.service";
import { GtagAnalyticsService } from "./gtag-analytics.service";

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [AnalyticsService, GtagAnalyticsService],
})
export class AnalyticsModule {}
