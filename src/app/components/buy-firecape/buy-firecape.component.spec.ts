import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BuyFirecapeComponent } from "./buy-firecape.component";

describe("MoreInfoFirecapeComponent", () => {
  let component: BuyFirecapeComponent;
  let fixture: ComponentFixture<BuyFirecapeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BuyFirecapeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyFirecapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
