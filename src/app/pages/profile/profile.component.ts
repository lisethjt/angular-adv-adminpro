import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent {

  public profileForm: FormGroup;
  public user: User;
  public photoFile: any | undefined;
  public base64textString: string | undefined;

  constructor(private formBuilder: FormBuilder,
    private _userService: UserService) {
    this.user = this._userService.user;
    this.base64textString = this.user.image;
      
    this.profileForm = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      role: [this.user.role],
    });
  }

  ngOnInit(): void {

  }

  updateProfile() {
    this._userService.updateUser(this.profileForm.value)
      .subscribe((result: any) => {      
        if (result.message.code == 200) {
          const { name, email } = this.profileForm.value;
          this.user.name = name;
          this.user.email = email;
          this.showAlert('Guardado!', 'El Usuario se actualizó con éxito', 'success');
        } else {
          this.showAlert('Error!', 'El Usuario no pudo ser actualizado','error');
        }
      },
        (error: any) => {
          this.showAlert('Error!', 'El Usuario no pudo ser actualizado', 'error');
        });
  }

  onFileChange(fileInput: any) {
    let target = fileInput.target as HTMLInputElement;
    if (target.files !== null && target.files.length > 0) {
      this.photoFile = target.files[0];
      var reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(this.photoFile);
    } 

  }

  handleReaderLoaded(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);   
  }

  uploadImage(){
    this._userService.uploadImage({image: this.base64textString})
      .subscribe((result: any) => {      
        if (result.message.code == 200) {
          this.user.image = this.base64textString;
          this.showAlert('Guardado!', 'El Usuario se actualizó con éxito', 'success');
        } else {
          this.showAlert('Error!', 'El Usuario no pudo ser actualizado','error');
        }
      },
        (error: any) => {
          this.showAlert('Error!', 'El Usuario no pudo ser actualizado', 'error');
        });
  }
  showAlert(title:any, text:any, icon:any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: 'Aceptar'
    });
  }
}