import { TestBed } from "@angular/core/testing";

import { ZopimService } from "./zopim.service";

describe("ZopimService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: ZopimService = TestBed.get(ZopimService);
    expect(service).toBeTruthy();
  });
});
