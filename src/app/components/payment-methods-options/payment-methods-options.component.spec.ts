import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PaymentMethodsOptionsComponent } from "./payment-methods-options.component";

describe("PaymentMethodsOptionsComponent", () => {
  let component: PaymentMethodsOptionsComponent;
  let fixture: ComponentFixture<PaymentMethodsOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentMethodsOptionsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentMethodsOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
