import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBrandiesComponent } from './form-brandies.component';

describe('FormBrandiesComponent', () => {
  let component: FormBrandiesComponent;
  let fixture: ComponentFixture<FormBrandiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormBrandiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBrandiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
