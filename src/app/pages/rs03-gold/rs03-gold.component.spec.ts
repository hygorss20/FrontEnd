import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { Rs03GoldComponent } from "./rs03-gold.component";

describe("Rs03GoldComponent", () => {
  let component: Rs03GoldComponent;
  let fixture: ComponentFixture<Rs03GoldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Rs03GoldComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Rs03GoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
