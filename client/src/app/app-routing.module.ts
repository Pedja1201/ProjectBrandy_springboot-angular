import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/home/login/login.component';
import { RegisterComponent } from './components/home/register/register.component';
import { AboutBrandyComponent } from './components/about-brandy/about-brandy.component';
import { OrderComponent } from './components/order/order.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserOrdersAdminComponent } from './components/orders-admin/user-orders-admin.component';
import { UsersAdminComponent } from './components/users-admin/users-admin.component';
import { AdminBrandyComponent } from './components/admin-brandy/admin-brandy.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'aboutBrandy', component: AboutBrandyComponent },
  { path: 'order', component: OrderComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'editUsersOrdersAdmin', component: UserOrdersAdminComponent },
  { path: 'usersAdmin', component: UsersAdminComponent },
  { path: 'adminBrandy', component: AdminBrandyComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
