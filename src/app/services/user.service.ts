import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { Login } from '../models/login.model';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.url_register;
  url_login = environment.url_login;
  public user: User;

  constructor(
    private _http: HttpClient) {
    this.user = new User(0, '', '', '', false, '', '');
  }

  addUser(user: User) {
    return this._http.post(`${this.url}/add`, user);
  }

  login(login: Login) {
    return this._http.post(`${this.url_login}/login`, login)
  }

  loginGoogle(token: String) {
    return this._http.post(`${this.url_login}/google`, { token });
  }

  logout() {
    localStorage.removeItem('token');
  }

  renew(): Observable<boolean> {
    const headers = new HttpHeaders({
      'token': this.token,
    });

    return this._http.get(`${this.url_login}/renew`, { headers })
      .pipe(
        map((resp: any) => {
          const { id, email, google, name, role, image } = resp.user;
          this.user = new User(id, name, email, '', google, role, image);
          localStorage.setItem('token', resp.token);
          return true;
        }),
        catchError((error: any) => {
          console.error('Error en renew:', error);
          return of(false); // ✅ Devuelve false si falla
        })
      );
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): number {
    return this.user.id || 0;
  }

  updateUser(data: { email: string, name: string, role: string }) {
    const headers = new HttpHeaders({
      'token': this.token,
    });

    return this._http.put(`${this.url}/update/${this.uid}`, data, { headers });
  }


  uploadImage(data: { image: string | undefined }) {
    const headers = new HttpHeaders({
      'token': this.token,
    });

    return this._http.put(`${this.url}/uploadImage/${this.uid}`, data, { headers });
  }

  getUsers(page: number = 0) {
    const headers = new HttpHeaders({
      'token': this.token,
    });

    let size = 10;
    return this._http.get(`${this.url}/all/${page}/${size}`, { headers });
  }

  search(name: string) {
    const headers = new HttpHeaders({
      'token': this.token,
    });

    return this._http.get<any[]>(`${this.url}/getByName/${name}`, { headers })
      .pipe(
        map((resp: any) => resp.users)
      );
  }

  delete(user:User){
    const headers = new HttpHeaders({
      'token': this.token,
    });

    return this._http.delete<any>(`${this.url}/delete/${user.id}`, { headers });
  }

  updateRoleUser(data: User) {
    const headers = new HttpHeaders({
      'token': this.token,
    });

    return this._http.put(`${this.url}/update/${data.id}`, data, { headers });
  }
}