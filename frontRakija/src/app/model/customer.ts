export class CustomerPage<Customer> {
    content: Customer[];

    constructor(){
      this.content=[]
    }
  }

export class Customer {
    id:number;
    username:String;
    password:String;
    firstName:String;
    lastName:String;
    email:String;

    constructor(){
      this.id=0;
      this.username='';
      this.password='',
      this.firstName='',
      this.lastName='',
      this.email=''
    }
}
