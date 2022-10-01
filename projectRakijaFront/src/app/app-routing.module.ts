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
import { UsersComponent } from './page/users/users.component';
import { WelcomeComponent } from './page/welcome/welcome.component';
import { RegisterComponent } from './register/register.component';
import { FormRakijeComponent } from './page/rakije/form-rakije/form-rakije.component';

const routes: Routes = [
  {path: "", component: WelcomeComponent},
  {path:"", redirectTo: "", pathMatch:"full"}, ///Vraca na korensku rutu
    //Users
    {path: 'users',component: UsersComponent, canActivate: [AuthGuard]},
       {path: 'users/:id',component: DetailsUsersComponent},
      
  //Kupci
  {path: "kupci", component: KupciComponent, canActivate: [AuthGuard]}, //Login pre otvaranja
  {path: "kupci/:id", component: DetailsKupciComponent},

  //Rakije
  {path: 'rakije', component: RakijeComponent,   canActivate: [AuthGuard]},//Login pre otvaranja
  {path: "rakije/:id", component: DetailsRakijeComponent},
  {path: 'add-rakija', component: FormRakijeComponent}, 

  //Porudzbine
  {path: 'porudzbine', component: PorudzbineComponent},
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
