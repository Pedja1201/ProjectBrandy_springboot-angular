import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';  
import {MatTableModule} from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core'
import {MatPaginatorModule} from '@angular/material/paginator';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WelcomeComponent } from './page/welcome/welcome.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { MenuComponent } from './menu/menu.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AdminRegisterComponent } from './auth/register/admin-register/admin-register.component';
import { KupacRegisterComponent } from './auth/register/kupac-register/kupac-register.component';
import { UsersComponent } from './page/users/users.component';
import { DetailsUsersComponent } from './page/users/details-users/details-users.component';
import { TableUsersComponent } from './page/users/table-users/table-users.component';
import { FormUsersComponent } from './page/users/form-users/form-users.component';
import { AboutComponent } from './page/about/about.component';
import { BrandiesComponent } from './page/brandies/brandies.component';
import { TableBrandiesComponent } from './page/brandies/table-brandies/table-brandies.component';
import { FormBrandiesComponent } from './page/brandies/form-brandies/form-brandies.component';
import { SearchBrandiesComponent } from './page/brandies/search-brandies/search-brandies.component';
import { DetailsBrandiesComponent } from './page/brandies/details-brandies/details-brandies.component';
import { OrdersComponent } from './page/orders/orders.component';
import { TableOrdersComponent } from './page/orders/table-orders/table-orders.component';
import { FormOrdersComponent } from './page/orders/form-orders/form-orders.component';
import { DetailsOrdersComponent } from './page/orders/details-orders/details-orders.component';
import { CustomersComponent } from './page/customers/customers.component';
import { TableCustomersComponent } from './page/customers/table-customers/table-customers.component';
import { FormCustomersComponent } from './page/customers/form-customers/form-customers.component';
import { DetailsCustomersComponent } from './page/customers/details-customers/details-customers.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    WelcomeComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    AdminRegisterComponent,
    KupacRegisterComponent,
    UsersComponent,
    DetailsUsersComponent,
    TableUsersComponent,
    FormUsersComponent,
    AboutComponent,
    BrandiesComponent,
    TableBrandiesComponent,
    FormBrandiesComponent,
    SearchBrandiesComponent,
    DetailsBrandiesComponent,
    OrdersComponent,
    TableOrdersComponent,
    FormOrdersComponent,
    DetailsOrdersComponent,
    CustomersComponent,
    TableCustomersComponent,
    FormCustomersComponent,
    DetailsCustomersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,  //AngularMaterial forma
    MatButtonModule,
    DragDropModule ,
    MatListModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTabsModule,
    MatChipsModule,
    MatTableModule,
    MatSnackBarModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule ,
    MatPaginatorModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}],//Login[],
  bootstrap: [AppComponent]
})
export class AppModule { }
