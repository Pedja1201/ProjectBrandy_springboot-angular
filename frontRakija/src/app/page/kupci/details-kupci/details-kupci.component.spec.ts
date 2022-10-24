import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsKupciComponent } from './details-kupci.component';

describe('DetailsKupciComponent', () => {
  let component: DetailsKupciComponent;
  let fixture: ComponentFixture<DetailsKupciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsKupciComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsKupciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
