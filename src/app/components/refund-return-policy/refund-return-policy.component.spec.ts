import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RefundReturnPolicyComponent } from "./refund-return-policy.component";

describe("RefundReturnPolicyComponent", () => {
  let component: RefundReturnPolicyComponent;
  let fixture: ComponentFixture<RefundReturnPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RefundReturnPolicyComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundReturnPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
