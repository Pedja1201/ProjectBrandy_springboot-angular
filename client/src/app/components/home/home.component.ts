import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  suggestions: string[] = [
    'Prva sugestija',
    'Druga sugestija',
    'Treća sugestija',
    // Dodajte više sugestija ako želite
  ];

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

  search(name: string){
    if(name.length > 0){
      this.brandy.searchBrandy(name).subscribe((x : Brandy [])=>{
        if(x.length < 1){
          this.loadBrandyList();
        }else{
          this.filtered = []
          this.filtered = x
        }
      })
    }else{
      this.loadBrandyList()
    }
  }

  clearInput() {
    this.name = '';
    this.loadBrandyList()
  }
}
