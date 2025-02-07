import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent {

  public formSubmitted = false;
  public registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private _userService: UserService,
              private _router: Router) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password2: ['', Validators.required],
      terms: [false, Validators.required]
    }, {
      validators: this.passwordsIguales('password', 'password2')
    });   
  }


  addUser() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if ( this.registerForm.invalid ) {
      console.log("Formulario no es correcto"); 
      return;
    }
    
    console.log("Posteando formulario"); 
    const user = new User(this.registerForm.controls['name'].value, this.registerForm.controls['email'].value, this.registerForm.controls['password'].value, false,'','');
    this._userService.addUser(user).subscribe(
      (result: any)=>{
        if(result.message.code === 400){
          this.showAlert();
        }else{ 
          console.log("user" + result.user);
          localStorage.setItem('token', result.token );
          this._router.navigateByUrl('/');
        }              
      },
      (error: any)=>{
       this.showAlert();
      }
    );    
  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.controls[campo].invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  contrasenasNoValidas() {
    const pass1 = this.registerForm.controls['password'].value;
    const pass2 = this.registerForm.controls['password2'].value;

    if ((pass1 !== pass2) && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  aceptaTerminos() {
    return !this.registerForm.controls['terms'].value && this.formSubmitted;
  }

  passwordsIguales(pass1Name: string, pass2Name: string) {

    return (formGroup: FormGroup) => {

      const pass1Control = formGroup.controls[pass1Name];
      const pass2Control = formGroup.controls[pass2Name];

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null)
      } else {
        pass2Control.setErrors({ noEsIgual: true })
      }
    }
  }

  showAlert() {
    Swal.fire({
      title: 'Error!',
      text: 'Ha ocurrido un error',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }
}