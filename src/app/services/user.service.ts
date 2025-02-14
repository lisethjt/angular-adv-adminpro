import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { Login } from '../models/login.model';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.url_register;
  url_login = environment.url_login;

  constructor(
    private _http: HttpClient) { }

  addUser(user: User) {
    return this._http.post(`${this.url}/add`, user);
  }

  login(login: Login) {     
    return this._http.post(`${this.url_login}/login`, login)
  }

  loginGoogle(token: String){
    return this._http.post(`${this.url_login}/google`, { token });
  }

  logout(){
    localStorage.removeItem('token');    
  }
}