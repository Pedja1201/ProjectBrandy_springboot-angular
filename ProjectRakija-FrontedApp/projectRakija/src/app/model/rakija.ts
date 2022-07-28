export interface RakijaPage<Rakija> {
    content: Rakija[];
  }

export interface Rakija {
    id:number;
    naziv:String;
    sorta:String;
    cena:number;
    godina:number
    jacina:String
}
