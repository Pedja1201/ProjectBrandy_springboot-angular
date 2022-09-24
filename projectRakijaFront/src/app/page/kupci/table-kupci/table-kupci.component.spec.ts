import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableKupciComponent } from './table-kupci.component';

describe('TableKupciComponent', () => {
  let component: TableKupciComponent;
  let fixture: ComponentFixture<TableKupciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableKupciComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableKupciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
