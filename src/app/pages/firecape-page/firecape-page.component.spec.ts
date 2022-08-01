import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FirecapePageComponent } from "./firecape-page.component";

describe("FirecapePageComponent", () => {
  let component: FirecapePageComponent;
  let fixture: ComponentFixture<FirecapePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FirecapePageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirecapePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
