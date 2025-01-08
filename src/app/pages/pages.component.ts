import { Component } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare function customInitFunction(): any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: ``
})
export class PagesComponent {

  constructor(
    private _settingsService : SettingsService
  ){}

  ngOnInit(): void {
    customInitFunction();    
  }
}