import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BuyFirecapeIronmanComponent } from "./buy-firecape-ironman.component";

describe("MoreInfoFirecapeComponent", () => {
  let component: BuyFirecapeIronmanComponent;
  let fixture: ComponentFixture<BuyFirecapeIronmanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BuyFirecapeIronmanComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyFirecapeIronmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
