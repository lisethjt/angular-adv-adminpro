import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.url_register

  constructor(
    private _http: HttpClient) { }

  addUser(user: User){  
      return this._http.post(`${this.url}/add`, user);
  }
}