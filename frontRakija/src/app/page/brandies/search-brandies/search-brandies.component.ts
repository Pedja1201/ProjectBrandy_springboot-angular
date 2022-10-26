import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-brandies',
  templateUrl: './search-brandies.component.html',
  styleUrls: ['./search-brandies.component.css']
})
export class SearchBrandiesComponent implements OnInit {
  title="Search Brandy";

  @Output()
  searched: EventEmitter<any> = new EventEmitter<any>();

  parameters : FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    priceFor: new FormControl(),
    priceTo: new FormControl(),
    yearFor: new FormControl(),
    yearTo: new FormControl(),

  });

  constructor() { }

  ngOnInit(): void {
  }

  search() {
    this.searched.emit(this.parameters.value);
  }

}
