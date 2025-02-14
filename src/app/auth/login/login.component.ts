import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'


import { UserService } from '../../services/user.service';
import { Login } from '../../models/login.model';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent {

  @ViewChild('googleBtn') googleBtn: ElementRef  = new ElementRef(null);;
  public loginForm: FormGroup;
  public auth2: any;

  constructor(private formBuilder: FormBuilder,
    private _userService: UserService,
    private _router: Router) {
    this.loginForm = this.formBuilder.group({
      email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [false]
    });
  }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id: "846387433693-vs4r6ddv2s1adqkt65catlkgfcirijkt.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse(response: any) {
    console.log("Encoded JWT ID token: " + response.credential);
    this._userService.loginGoogle(response.credential)
    .subscribe((resp: any)=>{
      localStorage.setItem("token", resp.accessToken);      
      this._router.navigateByUrl('/');
    },
    (error:any)=>{
      console.log("Error....");
    });
  }

  login() {   
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