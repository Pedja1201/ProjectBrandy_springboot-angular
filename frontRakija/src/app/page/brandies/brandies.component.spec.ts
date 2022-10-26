import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandiesComponent } from './brandies.component';

describe('BrandiesComponent', () => {
  let component: BrandiesComponent;
  let fixture: ComponentFixture<BrandiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
