import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeniComponent } from './meni.component';

describe('MeniComponent', () => {
  let component: MeniComponent;
  let fixture: ComponentFixture<MeniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
