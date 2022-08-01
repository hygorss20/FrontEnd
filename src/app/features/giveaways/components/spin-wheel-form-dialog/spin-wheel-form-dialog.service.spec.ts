import { TestBed } from "@angular/core/testing";

import { SpinWheelFormDialogService } from "./spin-wheel-form-dialog.service";

describe("SpinWheelFormDialogService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: SpinWheelFormDialogService = TestBed.get(
      SpinWheelFormDialogService
    );
    expect(service).toBeTruthy();
  });
});
