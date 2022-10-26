import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOrdersComponent } from './form-orders.component';

describe('FormOrdersComponent', () => {
  let component: FormOrdersComponent;
  let fixture: ComponentFixture<FormOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
