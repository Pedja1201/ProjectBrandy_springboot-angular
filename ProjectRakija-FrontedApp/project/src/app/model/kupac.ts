export interface KupacPage<Kupac> {
    content: Kupac[];
  }

export interface Kupac {
    id:number;
    korisnickoIme:String;
    lozinka:String;
    ime:String;
    prezime:String;
    email:String;
}
