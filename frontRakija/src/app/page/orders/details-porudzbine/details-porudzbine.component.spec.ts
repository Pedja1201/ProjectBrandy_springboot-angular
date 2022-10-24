import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPorudzbineComponent } from './details-porudzbine.component';

describe('DetailsPorudzbineComponent', () => {
  let component: DetailsPorudzbineComponent;
  let fixture: ComponentFixture<DetailsPorudzbineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsPorudzbineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPorudzbineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
