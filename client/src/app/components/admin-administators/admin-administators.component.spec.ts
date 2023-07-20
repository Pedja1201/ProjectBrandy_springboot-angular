import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdministatorsComponent } from './admin-administators.component';

describe('AdminAdministatorsComponent', () => {
  let component: AdminAdministatorsComponent;
  let fixture: ComponentFixture<AdminAdministatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAdministatorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAdministatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
