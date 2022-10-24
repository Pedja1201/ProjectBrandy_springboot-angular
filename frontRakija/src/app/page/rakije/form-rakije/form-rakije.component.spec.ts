import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRakijeComponent } from './form-rakije.component';

describe('FormRakijeComponent', () => {
  let component: FormRakijeComponent;
  let fixture: ComponentFixture<FormRakijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRakijeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRakijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
