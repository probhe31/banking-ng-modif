import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Customer } from './customer';
import { CustomerService } from './customer.service';

@Component({
  templateUrl: './customer-list.component.html'
})
export class CustomerListComponent implements OnInit {
  customers: Customer[];

  constructor(private customerService: CustomerService,
    private router: Router) {
  }

  ngOnInit() {
    this.getCustomers();
  }

  private getCustomers(): void {
    this.customerService.getCustomers()
      .subscribe(customers => { this.customers = customers; });
  }

  addCustomer(): void {
    this.router.navigate(['/customerDetail', -1]);
  }

  deleteCustomer(id: number): void {
    if (confirm('Delete this customer?')) {
      this.customerService.deleteCustomer(id)
        .subscribe(() => this.customers = this.customers.filter(c => c.id !== id));
    }
  }
}
