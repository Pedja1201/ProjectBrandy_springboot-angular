import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponseBrandy } from 'src/app/model/apiResponseBrandy';
import { Brandy, BrandyPage } from 'src/app/model/brandy';
import { BrandyServiceService } from 'src/app/service/brandies/brandy-service.service';
import { TokenStorageService } from 'src/app/service/token-storage/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  brandyPage: BrandyPage<Brandy> = new BrandyPage<Brandy>();
  filtered: Brandy [] = [];
  name:string='';
  searched:any=[];

  constructor(private router: Router, private brandy: BrandyServiceService, private tokenStorageService: TokenStorageService){}

  ngOnInit(): void {
    this.loadBrandyList();
  }

  loadBrandyList(): void {
    this.brandy.getAll().subscribe(
      brandy => {
        this.brandyPage = brandy
        this.filtered = this.brandyPage.content
        //console.log(this.filtered)
      },
      error => {
        console.log('Error occurred while fetching brandy list:', error);
      }
    );
  }

  about(brandy : Brandy){
    this.router.navigate(['/aboutBrandy', {objDetails: JSON.stringify(brandy)}], { queryParams:  brandy , skipLocationChange: true});
  }

  search(name:string){
    console.log(name)
    this.brandy.getAll().subscribe(x=>{
      for(let f of x.content){
        if(f.name == name){
          this.filtered=[]
          this.filtered.push(f)
        }else if(name.length < 1){
          this.loadBrandyList()
        }
      }
    })
  }

}
