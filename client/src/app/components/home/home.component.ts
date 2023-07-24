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
  page!:number;
  previous = true;
  next = true;
  minPrice!:number;
  maxPrice!:number;
  totalPagesOfB = 0;

  constructor(private router: Router, private brandy: BrandyServiceService, private tokenStorageService: TokenStorageService){
    this.page = 0
  }

  ngOnInit(): void {
    this.loadBrandyList(this.page);
    this.getAll();
  }

  loadBrandyList(pageNumber:number): void {
    this.brandy.searchBrandy(this.name, this.minPrice, this.maxPrice, pageNumber, undefined).subscribe(
      brandy => {
        this.brandyPage = brandy
        this.totalPagesOfB = this.brandyPage.totalPages - 1;
        this.filtered = this.brandyPage.content
        console.log(this.brandyPage)
      },
      error => {
        console.log('Error occurred while fetching brandy list:', error);
      }
    );
  }

  getAll(){
    this.brandy.getAll().subscribe(x=>{
      this.filtered = x.content
      let niz =  this.getPriceOfBrandies(this.filtered)
      let max = 0
      let min = niz[0];
      for(let f of this.filtered){
        if(f.price < min){
          min = f.price
          this.minPrice = min;
        }
        if(f.price > max){
          max = f.price
          this.maxPrice = max;
        }
      }
      console.log(this.minPrice)
      console.log(this.maxPrice)
    })
  }

  getPriceOfBrandies(brandy:Brandy[]){
    let niz = []
    for(let b of brandy){
      niz.push(b.price)
    }
    return niz
  }

  nextPage(name: string){
    if(name.length > 0){
      this.page += 1;
      console.log(this.page)
      this.search(name!, this.page!)
    }else{
      if(this.totalPagesOfB != this.page){
        this.page += 1;
        this.loadBrandyList(this.page)
      }else{
        console.log("No pages")
      }
    }
  }

  previousPage(name: string) {
      if(name.length > 0) {
          this.search(name, this.page - 0);
      } else {
        if(this.page > 0){
          this.page -= 1;
          this.loadBrandyList(this.page);
        }
      }
  }
  
  about(brandy : Brandy){
    this.router.navigate(['/aboutBrandy', {objDetails: JSON.stringify(brandy)}], { queryParams:  brandy , skipLocationChange: true});
  }

  search(name: string, page:number){
    if(name.length > 0){
      this.page = 0;
      this.brandy.searchBrandy(name, this.minPrice, this.maxPrice, page, 5).subscribe(
        x =>{
          this.brandyPage = x
          console.log(this.brandyPage)
      })
    }else{
      this.loadBrandyList(this.page)
    }
  }

  clearInput() {
    this.name = '';
    this.loadBrandyList(this.page);
  }
}
