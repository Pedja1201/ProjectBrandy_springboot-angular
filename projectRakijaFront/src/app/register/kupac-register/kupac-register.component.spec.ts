import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KupacRegisterComponent } from './kupac-register.component';

describe('KupacRegisterComponent', () => {
  let component: KupacRegisterComponent;
  let fixture: ComponentFixture<KupacRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KupacRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KupacRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
