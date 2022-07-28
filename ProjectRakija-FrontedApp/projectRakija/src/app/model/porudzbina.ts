import { Kupac } from "./kupac";
import { Rakija } from "./rakija";

export interface PorudzbinaPage<Porudzbina> {
    content: Porudzbina[];
  }

export interface Porudzbina {
    id:number;
    datumKupovine:Date;
    kolicina:String;
    rakija:Rakija[];
    kupac:Kupac[]
}
