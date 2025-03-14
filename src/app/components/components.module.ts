import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { ModalImageComponent } from './modal-image/modal-image.component';
import { ConvertBase64PipeCopy } from '../pipes/convert-base64.pipe copy';


@NgModule({
  declarations: [
    IncrementadorComponent,
    ModalImageComponent,
    ConvertBase64PipeCopy
  ],
  exports: [
    IncrementadorComponent,
    ModalImageComponent,
    ConvertBase64PipeCopy
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ComponentsModule { }
