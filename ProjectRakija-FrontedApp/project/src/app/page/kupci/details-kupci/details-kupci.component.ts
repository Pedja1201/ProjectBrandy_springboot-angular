import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KupciService } from 'src/app/service/kupci.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-details-kupci',
  templateUrl: './details-kupci.component.html',
  styleUrls: ['./details-kupci.component.css']
})
export class DetailsKupciComponent implements OnInit {


  kupac: any = {};

  constructor(private service: KupciService, private route: ActivatedRoute, private router: Router, private location: Location) { }

  ngOnInit(): void {
    let kupacId = Number(this.route.snapshot.paramMap.get("id"));
    this.service.getOne(kupacId).subscribe((value: any) => {
      this.kupac = value;
    }, (error) => {
      console.log(error);
      this.router.navigate(["kupci"]);
    });
  }

  back() {
    this.location.back();
  }

}
