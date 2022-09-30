import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { AboutComponent } from './page/about/about.component';
import { DetailsKupciComponent } from './page/kupci/details-kupci/details-kupci.component';
import { KupciComponent } from './page/kupci/kupci.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { DetailsPorudzbineComponent } from './page/porudzbine/details-porudzbine/details-porudzbine.component';
import { PorudzbineComponent } from './page/porudzbine/porudzbine.component';
import { DetailsRakijeComponent } from './page/rakije/details-rakije/details-rakije.component';
import { RakijeComponent } from './page/rakije/rakije.component';
import { DetailsUsersComponent } from './page/users/details-users/details-users.component';
import { FormUsersComponent } from './page/users/form-users/form-users.component';
import { TableUsersComponent } from './page/users/table-users/table-users.component';
import { UsersComponent } from './page/users/users.component';
import { WelcomeComponent } from './page/welcome/welcome.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: "", component: WelcomeComponent},
  {path:"", redirectTo: "", pathMatch:"full"}, ///Vraca na korensku rutu
    //Users
    {path: 'korisnici',component: UsersComponent, data: { allowedRoles: ['ROLE_ADMIN']}, canActivate: [AuthGuard],
    children: [
        {component: TableUsersComponent, path: '', data: {allowedRoles: ['ROLE_ADMIN']}, canActivate: [AuthGuard]},
        {component: FormUsersComponent, path: 'create', data: {allowedRoles: ['ROLE_ADMIN']}, canActivate: [AuthGuard]},
        {component: FormUsersComponent, path: ':id/update', data: {allowedRoles: ['ROLE_ADMIN']}, canActivate: [AuthGuard]},
      ]},{path: 'users/:id',component: DetailsUsersComponent},
      
  //Kupci
  {path: "kupci", component: KupciComponent, 
        data: { allowedRoles: ['ROLE_ADMIN']},canActivate: [AuthGuard]}, //Login pre otvaranja
  {path: "kupci/:id", component: DetailsKupciComponent},

  //Rakije
  {path: 'rakije', component: RakijeComponent, 
        data: {allowedRoles: ['ROLE_ADMIN', 'ROLE_KUPAC']},canActivate: [AuthGuard]},//Login pre otvaranja
  {path: "rakije/:id", component: DetailsRakijeComponent},

  //Porudzbine
  {path: 'porudzbine', component: PorudzbineComponent, 
        data: {allowedRoles: ['ROLE_ADMIN','ROLE_KUPAC']}},//Login pre otvaranja
  {path: "porudzbine/:id", component: DetailsPorudzbineComponent},


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
