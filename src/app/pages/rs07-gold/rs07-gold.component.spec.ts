import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { Rs07GoldComponent } from "./rs07-gold.component";

describe("Rs07GoldComponent", () => {
  let component: Rs07GoldComponent;
  let fixture: ComponentFixture<Rs07GoldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Rs07GoldComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Rs07GoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
