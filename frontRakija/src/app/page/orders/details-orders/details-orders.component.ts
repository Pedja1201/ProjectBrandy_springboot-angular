import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from 'src/app/service/orders/orders.service';

@Component({
  selector: 'app-details-orders',
  templateUrl: './details-orders.component.html',
  styleUrls: ['./details-orders.component.css']
})
export class DetailsOrdersComponent implements OnInit {

  order: any = {};

  constructor(private porudzbineService: OrdersService, private route: ActivatedRoute, private router: Router, private location: Location) { }

  ngOnInit(): void {
    let orderId = Number(this.route.snapshot.paramMap.get("id"));
    this.porudzbineService.getOne(orderId).subscribe((value: any) => {
      this.order = value;
    }, (error) => {
      console.log(error);
      this.router.navigate(["orders"]);
    });
  }

  back() {
    this.location.back();
  }

}
