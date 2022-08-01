import { TestBed } from "@angular/core/testing";

import { PaymentMethodsRepositoryService } from "./payment-methods-repository.service";

describe("PaymentMethodsRepositoryService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: PaymentMethodsRepositoryService = TestBed.get(
      PaymentMethodsRepositoryService
    );
    expect(service).toBeTruthy();
  });
});
