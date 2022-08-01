import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AlbionSilverComponent } from "./albion-silver.component";

describe("AlbionSilverComponent", () => {
  let component: AlbionSilverComponent;
  let fixture: ComponentFixture<AlbionSilverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlbionSilverComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbionSilverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
