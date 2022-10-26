import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBrandiesComponent } from './search-brandies.component';

describe('SearchBrandiesComponent', () => {
  let component: SearchBrandiesComponent;
  let fixture: ComponentFixture<SearchBrandiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBrandiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBrandiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
