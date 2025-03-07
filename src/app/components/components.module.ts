import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { ModalImageComponent } from './modal-image/modal-image.component';


@NgModule({
  declarations: [
    IncrementadorComponent,
    ModalImageComponent
  ],
  exports: [
    IncrementadorComponent,
    ModalImageComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ComponentsModule { }
