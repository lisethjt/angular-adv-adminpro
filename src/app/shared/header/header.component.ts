import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

import { UserService } from '../../services/user.service';

declare const google: any

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  public user: User;

  constructor(private _userService: UserService,
    private _router: Router) {
   // this._userService.renew().subscribe();  
    this.user = this._userService.user;  
  };

  logout() {
    this._userService.logout();
    google.accounts.id.revoke(
      'lisethcluodtraining@gmail.com', () => {
        this._router.navigateByUrl('/login');
      }
    );
  }
}
