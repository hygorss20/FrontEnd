import { TestBed } from "@angular/core/testing";

import { SpinWheelCongratsDialogService } from "./spin-wheel-congrats-dialog.service";

describe("SpinWheelCongratsDialogService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: SpinWheelCongratsDialogService = TestBed.get(
      SpinWheelCongratsDialogService
    );
    expect(service).toBeTruthy();
  });
});
