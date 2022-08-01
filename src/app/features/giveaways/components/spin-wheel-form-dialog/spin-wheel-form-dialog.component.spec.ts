import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SpinWheelFormDialogComponent } from "./spin-wheel-form-dialog.component";

describe("SpinWheelFormDialogComponent", () => {
  let component: SpinWheelFormDialogComponent;
  let fixture: ComponentFixture<SpinWheelFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpinWheelFormDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinWheelFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
