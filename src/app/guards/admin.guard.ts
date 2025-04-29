import { Observable, of } from 'rxjs';

import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export class AdminGuard implements CanActivate {

  constructor(private usuarioService: UserService,
    private router: Router) { }

  canActivate(): boolean {
    if (this.usuarioService.role === 'ADMIN_ROLE') { return true }
     else {
      this.router.navigateByUrl('/dashboard');
      return false;
    }
  }
}
