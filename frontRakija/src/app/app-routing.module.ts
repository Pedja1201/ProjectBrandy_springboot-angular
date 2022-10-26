import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { AboutComponent } from './page/about/about.component';
import { DetailsCustomersComponent } from './page/customers/details-customers/details-customers.component';
import { CustomersComponent } from './page/customers/customers.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { DetailsOrdersComponent } from './page/orders/details-orders/details-orders.component';
import { OrdersComponent } from './page/orders/orders.component';
import { DetailsBrandiesComponent } from './page/brandies/details-brandies/details-brandies.component';
import { BrandiesComponent } from './page/brandies/brandies.component';
import { DetailsUsersComponent } from './page/users/details-users/details-users.component';
import { UsersComponent } from './page/users/users.component';
import { WelcomeComponent } from './page/welcome/welcome.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormBrandiesComponent } from './page/brandies/form-brandies/form-brandies.component';

const routes: Routes = [
  {path: "", component: WelcomeComponent},
  {path:"", redirectTo: "", pathMatch:"full"}, ///Vraca na korensku rutu
    //Users
    {path: 'users',component: UsersComponent, canActivate: [AuthGuard]},
       {path: 'users/:id',component: DetailsUsersComponent},
      
  //Kupci
  {path: "customers", component: CustomersComponent, canActivate: [AuthGuard]}, //Login pre otvaranja
  {path: "customers/:id", component: DetailsCustomersComponent},

  //Rakije
  {path: 'brandies', component: BrandiesComponent,   canActivate: [AuthGuard]},//Login pre otvaranja
  {path: "brandies/:id", component: DetailsBrandiesComponent},
  {path: 'add-brandy', component: FormBrandiesComponent}, 

  //Porudzbine
  {path: 'orders', component: OrdersComponent},
  {path: "orders/:id", component: DetailsOrdersComponent},


  //About
  {path:"about", component:AboutComponent},

  //Login
  {path:"login", component:LoginComponent},

    //Register
   {path:"register", component:RegisterComponent},
  
  //Prazna stranica
  {path: '**', component: NotFoundComponent,},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
