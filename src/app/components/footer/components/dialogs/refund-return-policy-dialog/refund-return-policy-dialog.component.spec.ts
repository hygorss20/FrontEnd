import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RefundReturnPolicyDialogComponent } from "./refund-return-policy-dialog.component";

describe("RefundReturnPolicyDialogComponent", () => {
  let component: RefundReturnPolicyDialogComponent;
  let fixture: ComponentFixture<RefundReturnPolicyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RefundReturnPolicyDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundReturnPolicyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
