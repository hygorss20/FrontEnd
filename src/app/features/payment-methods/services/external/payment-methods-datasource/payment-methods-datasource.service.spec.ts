import { TestBed } from "@angular/core/testing";

import { PaymentMethodsDatasourceService } from "./payment-methods-datasource.service";

describe("PaymentMethodsDatasourceService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: PaymentMethodsDatasourceService = TestBed.get(
      PaymentMethodsDatasourceService
    );
    expect(service).toBeTruthy();
  });
});
