import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOrdersComponent } from './table-orders.component';

describe('TableOrdersComponent', () => {
  let component: TableOrdersComponent;
  let fixture: ComponentFixture<TableOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
