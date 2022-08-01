import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SpinWheelCongratsDialogComponent } from "./spin-wheel-congrats-dialog.component";

describe("SpinWheelCongratsDialogComponent", () => {
  let component: SpinWheelCongratsDialogComponent;
  let fixture: ComponentFixture<SpinWheelCongratsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpinWheelCongratsDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinWheelCongratsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
