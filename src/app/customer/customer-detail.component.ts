import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { CustomerService } from './customer.service';
import { Customer } from './customer';

@Component({
  templateUrl: './customer-detail.component.html'
})
export class CustomerDetailComponent implements OnInit {
  customer: Customer;
  originalCustomer: Customer;

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private location: Location) {
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.createOrLoadCustomer(id);
  }

  private createOrLoadCustomer(id: number) {
    if (id === -1) {
      this.initCustomer();
    } else {
      this.customerService.getCustomer(id)
        .subscribe(customer => {
          this.customer = customer;
          this.originalCustomer = Object.assign({}, this.customer);
        });
    }
  }

  private initCustomer(): void {
    this.customer = new Customer();
    this.originalCustomer = Object.assign({}, this.customer);
  }

  saveData(): void {
    if (this.customer.id) {
      this.customerService.updateCustomer(this.customer)
        .subscribe(customer => { this.customer = customer; },
          () => null,
          () => this.dataSaved());
    } else {
      this.customerService.addCustomer(this.customer)
        .subscribe(customer => { this.customer = customer; },
          () => null,
          () => this.dataSaved());
    }
  }

  private dataSaved(): void {
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }

  cancel(): void {
    this.goBack();
  }
}
