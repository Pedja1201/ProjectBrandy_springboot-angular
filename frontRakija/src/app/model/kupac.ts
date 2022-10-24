export class KupacPage<Kupac> {
    content: Kupac[];

    constructor(){
      this.content=[]
    }
  }

export class Kupac {
    id:number;
    korisnickoIme:String;
    lozinka:String;
    ime:String;
    prezime:String;
    email:String;

    constructor(){
      this.id=0;
      this.korisnickoIme='';
      this.lozinka='',
      this.ime='',
      this.prezime='',
      this.email=''
    }
}
