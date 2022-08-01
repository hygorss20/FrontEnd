import { TestBed } from "@angular/core/testing";

import { IncrementService } from "./increment.service";

describe("IncrementService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: IncrementService = TestBed.get(IncrementService);
    expect(service).toBeTruthy();
  });
});
