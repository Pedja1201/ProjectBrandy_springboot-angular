import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrdersAdminComponent } from './user-orders-admin.component';

describe('UserOrdersAdminComponent', () => {
  let component: UserOrdersAdminComponent;
  let fixture: ComponentFixture<UserOrdersAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserOrdersAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserOrdersAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
