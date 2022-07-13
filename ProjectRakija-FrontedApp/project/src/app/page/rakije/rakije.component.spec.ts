import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RakijeComponent } from './rakije.component';

describe('RakijeComponent', () => {
  let component: RakijeComponent;
  let fixture: ComponentFixture<RakijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RakijeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RakijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
