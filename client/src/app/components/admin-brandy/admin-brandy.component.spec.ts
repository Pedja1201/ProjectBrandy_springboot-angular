import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBrandyComponent } from './admin-brandy.component';

describe('AdminBrandyComponent', () => {
  let component: AdminBrandyComponent;
  let fixture: ComponentFixture<AdminBrandyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBrandyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBrandyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
