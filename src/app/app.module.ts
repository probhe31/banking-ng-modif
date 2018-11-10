import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CustomerListComponent } from './customer/customer-list.component';
import { CustomerDetailComponent } from './customer/customer-detail.component';
import { CustomerService } from './customer/customer.service';
import { AccountService } from './account/account.service';
import { AccountListComponent } from './account/account-list.component';
import { AccountDetailComponent } from './account/account-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SecurityService } from './security/security.service';
import { LoginComponent } from './security/login.component';
import { HttpInterceptorModule } from './security/http-interceptor';
import { HasClaimDirective } from './security/has-claim.directive';
import { CustomerNewComponent } from './customer/customer-new/customer-new.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    CustomerDetailComponent,
    AccountListComponent,
    AccountDetailComponent,
    DashboardComponent,
    LoginComponent,
    HasClaimDirective,
    CustomerNewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    HttpInterceptorModule
  ],
  providers: [CustomerService, AccountService, SecurityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
