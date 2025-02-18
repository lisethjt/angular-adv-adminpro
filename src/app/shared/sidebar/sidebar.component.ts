import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { SidebarService } from '../../services/sidebar.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  public menuItems: any[];
  public user: User;

  constructor(private _sidebarService: SidebarService,
    private _userService: UserService){
    this.menuItems = _sidebarService.menu;
   // this._userService.renew().subscribe();
    this.user = this._userService.user;  
  }
}