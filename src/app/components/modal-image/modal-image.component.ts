import { Component } from '@angular/core';
import { ModalImageService } from '../../services/modal-image.service';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrl: './modal-image.component.css'
})
export class ModalImageComponent {

  public photoFile: any | undefined;
  public base64textString: string | undefined;
  
  constructor(public modalService: ModalImageService){

  }

  cerrarModal(){
    this.modalService.closeModal();
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
}