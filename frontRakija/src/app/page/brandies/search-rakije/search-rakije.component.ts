import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-rakije',
  templateUrl: './search-rakije.component.html',
  styleUrls: ['./search-rakije.component.css']
})
export class SearchRakijeComponent implements OnInit {
  title="Pretraga Rakije";

  @Output()
  pretraga: EventEmitter<any> = new EventEmitter<any>();

  parametri : FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    priceFor: new FormControl(),
    cenaTo: new FormControl(),
    godinaFor: new FormControl(),
    godinaTo: new FormControl(),

  });

  constructor() { }

  ngOnInit(): void {
  }

  pretrazi() {
    this.pretraga.emit(this.parametri.value);
  }

}
