import { Kupac } from "./kupac";
import { Rakija } from "./rakija";

export class PorudzbinaPage<Porudzbina> {
    content: Porudzbina[];
    constructor(){
      this.content=[]
    }
  }

export class Porudzbina {
    id:number;
    datumKupovine:Date;
    kolicina:String;
    rakija:Rakija[];
    kupac:Kupac[];

    constructor(){
      this.id=0;
      this.datumKupovine=new Date();
      this.kolicina='',
      this.rakija=[],
      this.kupac=[]

    }
}
