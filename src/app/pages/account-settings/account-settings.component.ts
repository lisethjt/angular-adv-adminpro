import { Component } from '@angular/core';
import { elementAt } from '../../../../node_modules/rxjs/dist/types/index';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html'
})
export class AccountSettingsComponent {

  public linkTheme = document.querySelector('#theme');
 

  constructor(private _settingService : SettingsService){ }

  ngOnInit(): void {    
    this._settingService.checkCurrentTheme();    
  }

  changeTheme(theme: string) {
    this._settingService.changeTheme( theme );  
  }  
}