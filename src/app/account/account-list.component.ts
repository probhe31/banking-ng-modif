import { Component, OnInit } from '@angular/core';
import { Account } from './account';
import { AccountService } from './account.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './account-list.component.html'
})
export class AccountListComponent implements OnInit {
  accounts: Account[];

  constructor(private accountService: AccountService,
    private router: Router) {
  }

  ngOnInit() {
    this.getAccounts();
  }

  private getAccounts(): void {
    this.accountService.getAccounts(1).subscribe(
      accounts => this.accounts = accounts
    );
  }

  addAccount(): void {
    this.router.navigate(['/accountDetail', -1]);
  }
}
