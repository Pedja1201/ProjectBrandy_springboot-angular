import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Brandy, BrandyPage } from 'src/app/model/brandy';
import { Order } from 'src/app/model/order';
import { BrandyServiceService } from 'src/app/service/brandies/brandy-service.service';
import { OrderService } from 'src/app/service/order/order.service';

@Component({
  selector: 'app-admin-brandy',
  templateUrl: './admin-brandy.component.html',
  styleUrls: ['./admin-brandy.component.css']
})

export class AdminBrandyComponent implements OnInit{

  brandyPage: BrandyPage<Brandy> = new BrandyPage<Brandy>();
  filtered: Brandy [] = [];
  buttons = true;
  notes = false;
  createForm=false
  updateForm=false
  messageForNoteTitle = ''
  messageBody = ''

  form : FormGroup = new FormGroup({
    "id" : new FormControl(null),
    "name" : new FormControl(null, [Validators.required]),
    "type" : new FormControl(null, [Validators.required]),
    "price" : new FormControl(null, [Validators.required, Validators.pattern("^[0-9]+$")]),
    "year" : new FormControl(null, [Validators.required, Validators.pattern("^[0-9]+$")]),
    "strength" : new FormControl(null, [Validators.required]),
    "quantity" : new FormControl(null),
    "url" : new FormControl(null)
  });

  constructor(private b:BrandyServiceService, private o:OrderService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.b.getAll().subscribe(
      brandy => {
        this.brandyPage = brandy
        this.filtered = this.brandyPage.content
      });
  }

  create(){
    if(this.form.valid){
      this.b.create(this.form.value).subscribe(x=>{
        this.messageForNoteTitle = "Create successful!"
        this.messageBody = "Brandy created succsefully."
        this.note()
        this.buttons = false;
        this.getAll();
        this.closeDialogCreate();
      });
    }
  }
  
  edit(){
    if(this.form.valid){
      this.b.update(this.form.value.id, this.form.value).subscribe(x=>{
        this.messageForNoteTitle = "Update successful!"
        this.messageBody = "Brandy updated succsefully."
        this.note()
        this.buttons = false;
        this.getAll();
        if(this.form.value.quantity=true){
          this.o.getOrderByBrandyId(this.form.value.id).subscribe((orders:Order[])=>{
            for(let r of orders){
              r.confirm = true;
              this.o.update(r.id, r).subscribe(x=>{
                console.log("Updated orders list!")
              })
            }
          })
        }
        this.closeDialogUpdate();
      })
    }
  }

  deleteLogical(brandy:Brandy){
    if(brandy.quantity = true){
      brandy.quantity = false;
      this.b.update(brandy.id, brandy).subscribe(x=>{
        this.getAll();
        this.o.getOrderByBrandyId(brandy.id).subscribe((orders:Order[])=>{
          for(let r of orders){
            r.confirm = false;
            this.o.update(r.id, r).subscribe(x=>{
              console.log("Updated orders list!")
            })
          }
        })
      })
    }
  }

  deletePhysical(id:number){
    this.b.delete(id).subscribe(x=>{
      this.getAll();
    })
  }

  openDialogCreate(){
    this.form.reset();
    this.createForm = true;
  }

  closeDialogCreate(){
    this.form.reset();
    this.createForm = false;
  }

  openDialogUpdate(id:number){
    this.form.reset();
    this.b.getOne(id).subscribe((x:Brandy)=>{
      this.form.patchValue(x);
    })
    this.updateForm = true;
  }

  closeDialogUpdate(){
    this.form.reset();
    this.updateForm = false;
  }

  // closeNote(){
  //   this.notes =false;
  //   this.buttons = true;
  // }

  note(){
    const obavestenje = document.getElementById('obavestenje');
    setTimeout(() => {
      obavestenje!.classList.add('prikazi');
      
      // setTimeout(() => {
      //   obavestenje!.classList.remove('prikazi');
      // }, 3000);
    }, 500);
    this.buttons = false
  }

  closeNote(){
    const obavestenje = document.getElementById('obavestenje');
    setTimeout(() => {
         obavestenje!.classList.remove('prikazi');
       }, 10);
    this.buttons = true
  }

}
