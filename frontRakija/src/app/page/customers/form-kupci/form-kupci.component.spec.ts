import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormKupciComponent } from './form-kupci.component';

describe('FormKupciComponent', () => {
  let component: FormKupciComponent;
  let fixture: ComponentFixture<FormKupciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormKupciComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormKupciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
