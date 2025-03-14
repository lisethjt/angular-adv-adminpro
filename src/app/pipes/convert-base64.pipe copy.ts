import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertBase64Copy'
})
export class ConvertBase64PipeCopy implements PipeTransform {

  public transform(value: any, contentType: string): any {
    var base64Content = `data:${contentType};base64,${value}`;
    return base64Content;
  }
}