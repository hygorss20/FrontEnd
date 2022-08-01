import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PaymentMethodsOptionsFirecapeComponent } from "./payment-methods-options-firecape.component";

describe("PaymentMethodsOptionsComponent", () => {
  let component: PaymentMethodsOptionsFirecapeComponent;
  let fixture: ComponentFixture<PaymentMethodsOptionsFirecapeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentMethodsOptionsFirecapeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentMethodsOptionsFirecapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
