import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

  private _hideModal: boolean = true;
  public id: number = 0;
  public img: string | undefined = "";

  public newImg : EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  get hideModal(){
     return this._hideModal;
  }

  openModal(id: number, img: string | undefined){
    this._hideModal = false;
    this.id = id;   
    this.img = img;
  }

  closeModal(){
    this._hideModal = true;
  }


}