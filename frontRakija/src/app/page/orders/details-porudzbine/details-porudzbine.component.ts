import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from 'src/app/service/orders/orders.service';

@Component({
  selector: 'app-details-porudzbine',
  templateUrl: './details-porudzbine.component.html',
  styleUrls: ['./details-porudzbine.component.css']
})
export class DetailsPorudzbineComponent implements OnInit {

  porudzbina: any = {};

  constructor(private porudzbineService: OrdersService, private route: ActivatedRoute, private router: Router, private location: Location) { }

  ngOnInit(): void {
    let porudzbinaId = Number(this.route.snapshot.paramMap.get("id"));
    this.porudzbineService.getOne(porudzbinaId).subscribe((value: any) => {
      this.porudzbina = value;
    }, (error) => {
      console.log(error);
      this.router.navigate(["orders"]);
    });
  }

  back() {
    this.location.back();
  }

}
