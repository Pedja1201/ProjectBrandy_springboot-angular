import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/home/login/login.component';
import { RegisterComponent } from './components/home/register/register.component';
import { AboutBrandyComponent } from './components/about-brandy/about-brandy.component';
import { OrderComponent } from './components/order/order.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'aboutBrandy', component: AboutBrandyComponent },
  { path: 'order', component: OrderComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
