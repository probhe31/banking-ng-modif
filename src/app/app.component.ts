import { Component } from '@angular/core';
import { SecurityService } from './security/security.service';

@Component({
  selector: 'banking-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Banking';

  constructor(public securityService: SecurityService) {
  }

  logout(): void {
    this.securityService.logout();
  }
}
