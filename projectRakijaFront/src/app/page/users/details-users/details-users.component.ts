import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/service/users/users.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-details-users',
  templateUrl: './details-users.component.html',
  styleUrls: ['./details-users.component.css']
})
export class DetailsUsersComponent implements OnInit {

  user: any = {};
  constructor(private service: UsersService, private route: ActivatedRoute, private router: Router, private location: Location) { }

  ngOnInit(): void {
    let userId = Number(this.route.snapshot.paramMap.get("id"));
    this.service.getOne(userId).subscribe((value: any) => {
      this.user = value;
    }, (error) => {
      console.log(error);
      this.router.navigate(["users"]);
    });
  }

  back() {
    this.location.back();
  }

}
