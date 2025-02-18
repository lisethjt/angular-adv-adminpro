import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertBase64'
})
export class ConvertBase64Pipe implements PipeTransform {

  public transform(value: any, contentType: string): any {
    var base64Content = `data:${contentType};base64,${value}`;
    return base64Content;
  }
}