import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FirecapeUserInfoFormComponent } from "./firecape-user-info-form.component";

describe("FirecapeUserInfoFormComponent", () => {
  let component: FirecapeUserInfoFormComponent;
  let fixture: ComponentFixture<FirecapeUserInfoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FirecapeUserInfoFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirecapeUserInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
