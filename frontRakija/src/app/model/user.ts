export interface UserPage<User> {
    content: User[];
  }
export class User {
    id:number;
    username:String;
    password:String;

    constructor(){
      this.id=0;
      this.username='';
      this.password=''
    }
}
