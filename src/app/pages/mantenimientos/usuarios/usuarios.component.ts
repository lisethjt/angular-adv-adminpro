import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { delay } from 'rxjs';

import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

  public users: User[] = [];
  public usersTemp: User[] = [];
  public page: number = 0;
  public totalPages: number = 20;
  public cargando: boolean = true;

  constructor(private _userService: UserService) {

  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.cargando = true;
    this._userService.getUsers(this.page).subscribe(
      (result: any) => {
        this.users = result.users;
        this.usersTemp = this.users;
        this.totalPages = result.pages;
        this.cargando = false;
      },
      (error: any) => {
        this.showAlert('Info!', 'Los usuarios no pudieron ser consultados', 'info')
      }
    );
  }

  changePage(valor: number) {
    this.page += valor;
    if (this.page < 0) {
      this.page = 0;
    }

    if (this.page == this.totalPages) {
      this.page -= valor;
    }

    this.getUsers();
  }

  showAlert(title: any, text: any, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: 'Aceptar'
    });
  }

  search(name: string) {
    if (name.length === 0) {
      this.users = this.usersTemp;
      return;
    }
    this._userService.search(name)
      .subscribe((result: any[]) => {
        this.users = result;
      });
  }
}