import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerListComponent } from './customer/customer-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerDetailComponent } from './customer/customer-detail.component';
import { LoginComponent } from './security/login.component';
import { AuthGuard } from './security/auth.guard';
import { AccountListComponent } from './account/account-list.component';
import { AccountDetailComponent } from './account/account-detail.component';
import { CustomerNewComponent } from './customer/customer-new/customer-new.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'newcustomer',
    component: CustomerNewComponent
  },
  {
    path: 'customers',
    component: CustomerListComponent,
    canActivate: [AuthGuard],
    data: { claimType: 'accessCustomers' }
  },
  {
    path: 'customerDetail/:id',
    component: CustomerDetailComponent,
    canActivate: [AuthGuard],
    data: { claimType: 'accessCustomers' }
  },
  {
    path: 'accounts',
    component: AccountListComponent,
    canActivate: [AuthGuard],
    data: { claimType: 'accessAccounts' }
  },
  {
    path: 'accountDetail/:id',
    component: AccountDetailComponent,
    canActivate: [AuthGuard],
    data: { claimType: 'accessAccounts' }
  },
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
  },
  {
    path: '**', component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
