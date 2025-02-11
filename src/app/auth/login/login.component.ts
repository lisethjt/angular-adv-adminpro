import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'


import { UserService } from '../../services/user.service';
import { Login } from '../../models/login.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent {

  public loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private _userService: UserService,
    private _router: Router) {
    this.loginForm = this.formBuilder.group({
      email: [localStorage.getItem('email') || '' , [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [false]
    });
  }

  login() {
    console.log("this.loginForm.value")
    const login = new Login(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value);
    this._userService.login(login).subscribe(
      (result: any) => {
        localStorage.setItem('token', result.accessToken);
        if (this.loginForm.controls['remember'].value) {
          localStorage.setItem('email', this.loginForm.controls['email'].value);
        } else {
          localStorage.removeItem('email');
        }
        this._router.navigateByUrl('/');
      },
      (error: any) => {
        this.showAlert();
      }
    );

  }

  showAlert() {
    Swal.fire({
      title: 'Error!',
      text: 'Email y/o contraseña no encontrado',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }
}