import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { AccountService } from './account.service';
import { Account } from './account';

@Component({
  templateUrl: './account-detail.component.html'
})
export class AccountDetailComponent implements OnInit {
  account: Account;
  originalAccount: Account;

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private location: Location) {
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.createOrLoadCustomer(id);
  }

  private createOrLoadCustomer(id: number) {
    if (id === -1) {
      this.initAccount();
    } else {
      this.accountService.getAccount(id)
        .subscribe(account => {
          this.account = account;
          this.originalAccount = Object.assign({}, this.account);
        });
    }
  }

  private initAccount(): void {
    this.account = new Account();
    this.originalAccount = Object.assign({}, this.account);
  }

  saveData(): void {
    if (this.account.id) {
      this.accountService.updateAccount(1, this.account)
        .subscribe(account => { this.account = account; },
          () => null,
          () => this.dataSaved());
    } else {
      this.accountService.addAccount(1, this.account)
        .subscribe(account => { this.account = account; },
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
