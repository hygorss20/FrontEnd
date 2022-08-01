import { TestBed } from "@angular/core/testing";

import { EncryptUtilService } from "./encrypt-util.service";

describe("SnackbarUtilService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: EncryptUtilService = TestBed.get(EncryptUtilService);
    expect(service).toBeTruthy();
  });
});
