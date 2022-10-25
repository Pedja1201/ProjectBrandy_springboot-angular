import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandiesService } from 'src/app/service/brandies/brandies.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-details-rakije',
  templateUrl: './details-rakije.component.html',
  styleUrls: ['./details-rakije.component.css']
})
export class DetailsRakijeComponent implements OnInit {
  brandy: any = {};

  constructor(private rakijeService: BrandiesService, private route: ActivatedRoute, private router: Router, private location: Location) { }

  ngOnInit(): void {
    let brandyId = Number(this.route.snapshot.paramMap.get("id"));
    this.rakijeService.getOne(brandyId).subscribe((value: any) => {
      this.brandy = value;
    }, (error) => {
      console.log(error);
      this.router.navigate(["brandies"]);
    });
  }

  back() {
    this.location.back();
  }

}
