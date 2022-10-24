import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRakijeComponent } from './table-rakije.component';

describe('TableRakijeComponent', () => {
  let component: TableRakijeComponent;
  let fixture: ComponentFixture<TableRakijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableRakijeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableRakijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
