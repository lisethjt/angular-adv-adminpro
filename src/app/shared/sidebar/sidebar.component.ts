import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  menuItems: any[];

  constructor(private _sidebarService: SidebarService){
    this.menuItems = _sidebarService.menu;
    console.log(this.menuItems);
  }
}