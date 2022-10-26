import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsBrandiesComponent } from './details-brandies.component';

describe('DetailsBrandiesComponent', () => {
  let component: DetailsBrandiesComponent;
  let fixture: ComponentFixture<DetailsBrandiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsBrandiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsBrandiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
