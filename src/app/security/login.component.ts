import { Component, OnInit } from '@angular/core';
import { AppUser } from './app-user';
import { LoginResponse } from './app-user-auth';
import { SecurityService } from './security.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'banking-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: AppUser = new AppUser();
  securityObject: LoginResponse = null;
  returnUrl: string;

  constructor(public securityService: SecurityService,
    public accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
  }

  login() {
    /*this.accountService.getAccounts().subscribe(
      resp => {
        console.log(resp);
      }
    );*/
    this.securityService.login(this.user).subscribe(
      resp => {
        this.securityObject = resp;
        if (this.returnUrl) {
          this.router.navigateByUrl(this.returnUrl);
        }
      },
      () => {
        this.securityObject = new LoginResponse();
      }
    );
  }


  newCustomer() {

    

  }
}
