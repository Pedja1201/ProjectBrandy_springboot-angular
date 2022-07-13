import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPorudzbineComponent } from './form-porudzbine.component';

describe('FormPorudzbineComponent', () => {
  let component: FormPorudzbineComponent;
  let fixture: ComponentFixture<FormPorudzbineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPorudzbineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPorudzbineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
