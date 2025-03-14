import { Component } from '@angular/core';
import { ModalImageService } from '../../services/modal-image.service';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrl: './modal-image.component.css'
})
export class ModalImageComponent {

  public photoFile: any | undefined;
  public base64textString: string | undefined;
  
  constructor(public modalService: ModalImageService,
    private _userService: UserService
  ){
   
  }


  cerrarModal(){
    this.base64textString = "";
    this.photoFile = null;
    this.modalService.closeModal()
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
    const id = this.modalService.id;
      this._userService.uploadImageById({image: this.base64textString}, id)
        .subscribe((result: any) => {      
          if (result.message.code == 200) {
            this.modalService.img = this.base64textString;
            this.showAlert('Guardado!', 'El Usuario se actualizó con éxito', 'success');
            this.modalService.newImg.emit(this.modalService.img);
          } else {
            this.showAlert('Error!', 'El Usuario no pudo ser actualizado','error');
          }
        },
          (error: any) => {
            this.showAlert('Error!', 'El Usuario no pudo ser actualizado', 'error');
          });
          this.cerrarModal();
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