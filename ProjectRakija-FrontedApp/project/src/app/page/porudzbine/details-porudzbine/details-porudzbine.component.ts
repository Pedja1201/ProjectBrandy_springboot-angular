import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PorudzbineService } from 'src/app/service/porudzbine.service';

@Component({
  selector: 'app-details-porudzbine',
  templateUrl: './details-porudzbine.component.html',
  styleUrls: ['./details-porudzbine.component.css']
})
export class DetailsPorudzbineComponent implements OnInit {

  porudzbina: any = {};

  constructor(private porudzbineService: PorudzbineService, private route: ActivatedRoute, private router: Router, private location: Location) { }

  ngOnInit(): void {
    let porudzbinaId = Number(this.route.snapshot.paramMap.get("id"));
    this.porudzbineService.getOne(porudzbinaId).subscribe((value: any) => {
      this.porudzbina = value;
    }, (error) => {
      console.log(error);
      this.router.navigate(["porudzbine"]);
    });
  }

  back() {
    this.location.back();
  }

}
