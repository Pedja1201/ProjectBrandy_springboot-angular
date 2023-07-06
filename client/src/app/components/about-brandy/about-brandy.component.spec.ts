import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutBrandyComponent } from './about-brandy.component';

describe('AboutBrandyComponent', () => {
  let component: AboutBrandyComponent;
  let fixture: ComponentFixture<AboutBrandyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutBrandyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutBrandyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
