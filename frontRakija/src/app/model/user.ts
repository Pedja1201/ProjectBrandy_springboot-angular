export interface UserPage<User> {
    content: User[];
  }
export class User {
    id:number;
    korisnickoIme:String;
    lozinka:String;

    constructor(){
      this.id=0;
      this.korisnickoIme='';
      this.lozinka=''
    }
}
