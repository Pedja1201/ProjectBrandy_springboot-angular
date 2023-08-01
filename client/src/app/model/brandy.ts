export class BrandyPage<Brandy> {
    content: Brandy[];
    totalPages:number;
  
    constructor(){
      this.content=[];
      this.totalPages=0;
    }
    }
    export class Brandy {
        id:number;
        name:String;
        type:String;
        price:number;
        year:number;
        strength:String;
        quantity:boolean;
        url:String;
    
        constructor(){
          this.id=0;
          this.name='';
          this.type='',
          this.price=0,
          this.year= 0,
          this.strength=''
          this.quantity= true
          this.url=''
        }
    }
    