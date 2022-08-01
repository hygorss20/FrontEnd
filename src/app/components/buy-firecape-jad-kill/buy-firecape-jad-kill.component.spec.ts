import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BuyFirecapeJadKillComponent } from "./buy-firecape-jad-kill.component";

describe("MoreInfoFirecapeComponent", () => {
  let component: BuyFirecapeJadKillComponent;
  let fixture: ComponentFixture<BuyFirecapeJadKillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BuyFirecapeJadKillComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyFirecapeJadKillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
