export class BrandyPage<Brandy> {
  content: Brandy[];

  constructor(){
    this.content=[]
  }
  }
export class Brandy {
    id:number;
    name:String;
    type:String;
    price:number;
    year:number
    strength:String;

    constructor(){
      this.id=0;
      this.name='';
      this.type='',
      this.price=0,
      this.year= 0,
      this.strength=''
    }
}
