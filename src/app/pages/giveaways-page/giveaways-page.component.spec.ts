import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { GiveawaysPageComponent } from "./giveaways-page.component";

describe("GiveawaysPageComponent", () => {
  let component: GiveawaysPageComponent;
  let fixture: ComponentFixture<GiveawaysPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GiveawaysPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiveawaysPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
