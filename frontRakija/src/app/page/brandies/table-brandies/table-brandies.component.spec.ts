import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBrandiesComponent } from './table-brandies.component';

describe('TableBrandiesComponent', () => {
  let component: TableBrandiesComponent;
  let fixture: ComponentFixture<TableBrandiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableBrandiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableBrandiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
