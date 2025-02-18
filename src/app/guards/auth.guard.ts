import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private usuarioService: UserService,
    private router: Router) { }

  canActivate2(
    ) {

    return this.usuarioService.renew()
      .pipe(
        tap((estaAutenticado: any) => {
          if (!estaAutenticado) {
            this.router.navigateByUrl('/login');
          }
        })
      );
  }

  canActivate(): Observable<boolean> {
    return this.usuarioService.renew().pipe(
      map((isAuthenticated: any) => {
        console.log('Respuesta de renew:', isAuthenticated);
        if(isAuthenticated){
          return true; // ✅ Permite la navegación
        } 
        else{
          this.router.navigateByUrl('/login');
          return false;
        }        
      }),
      catchError(() => {
        console.log('Error en renovación, no autorizado');
        this.router.navigateByUrl('/login');
        return of(false);
      })
    );
  }
}