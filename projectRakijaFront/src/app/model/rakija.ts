export class RakijaPage<Rakija> {
    content: Rakija[];

    constructor(){
      this.content=[]
    }
  }

export class Rakija {
    id:number;
    naziv:String;
    sorta:String;
    cena:number;
    godina:number
    jacina:String;

    constructor(){
      this.id=0;
      this.naziv='';
      this.sorta='',
      this.cena=0,
      this.godina= 0,
      this.jacina=''
    }
}
