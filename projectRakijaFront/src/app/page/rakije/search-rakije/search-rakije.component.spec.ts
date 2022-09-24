import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRakijeComponent } from './search-rakije.component';

describe('SearchRakijeComponent', () => {
  let component: SearchRakijeComponent;
  let fixture: ComponentFixture<SearchRakijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchRakijeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchRakijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
