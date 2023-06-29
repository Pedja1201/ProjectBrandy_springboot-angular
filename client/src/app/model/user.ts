export interface UserPage<User> {
    content: User[];
  }
export interface User{
    id:number;
    username:String;
    password:String
}