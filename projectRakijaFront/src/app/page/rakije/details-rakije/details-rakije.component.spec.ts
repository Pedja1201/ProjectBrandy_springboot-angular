import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRakijeComponent } from './details-rakije.component';

describe('DetailsRakijeComponent', () => {
  let component: DetailsRakijeComponent;
  let fixture: ComponentFixture<DetailsRakijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsRakijeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsRakijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
