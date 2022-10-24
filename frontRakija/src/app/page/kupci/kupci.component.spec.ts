import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KupciComponent } from './kupci.component';

describe('KupciComponent', () => {
  let component: KupciComponent;
  let fixture: ComponentFixture<KupciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KupciComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KupciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
