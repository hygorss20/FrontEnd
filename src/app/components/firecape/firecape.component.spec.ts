import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FirecapeComponent } from "./firecape.component";

describe("FirecapeComponent", () => {
  let component: FirecapeComponent;
  let fixture: ComponentFixture<FirecapeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FirecapeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirecapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
