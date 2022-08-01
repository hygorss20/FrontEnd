import { TestBed } from "@angular/core/testing";

import { GtagAnalyticsService } from "./gtag-analytics.service";

describe("GtagAnalyticsService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: GtagAnalyticsService = TestBed.get(GtagAnalyticsService);
    expect(service).toBeTruthy();
  });
});
