import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePorudzbineComponent } from './table-porudzbine.component';

describe('TablePorudzbineComponent', () => {
  let component: TablePorudzbineComponent;
  let fixture: ComponentFixture<TablePorudzbineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablePorudzbineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePorudzbineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
