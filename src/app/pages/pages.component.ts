import { Component } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

declare function customInitFunction(): any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: ``
})
export class PagesComponent {

  constructor(
    private _settingsService : SettingsService,
    private _sidebarService : SidebarService
  ){}

  ngOnInit(): void {
   // customInitFunction();    
    this._sidebarService.cargarMenu();
    console.log("Menu:: " + this._sidebarService.menu);
    console.log(this._sidebarService.menu);
  }
}