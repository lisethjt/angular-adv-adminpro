import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

declare const google: any

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private _userService : UserService,
              private _router: Router){};

  logout(){
    this._userService.logout();
    google.accounts.id.revoke(
      'lisethcluodtraining@gmail.com', ()=>{
        this._router.navigateByUrl('/login');
      }
   );
    
  }
}
