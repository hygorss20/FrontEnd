import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NewWorldComponent } from "./new-world.component";

describe("NewWorldComponent", () => {
  let component: NewWorldComponent;
  let fixture: ComponentFixture<NewWorldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewWorldComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWorldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
