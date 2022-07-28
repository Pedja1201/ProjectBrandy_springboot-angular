export interface UserPage<User> {
    content: User[];
  }
export interface User {
    id:number;
    korisnickoIme:String;
    lozinka:String
}
