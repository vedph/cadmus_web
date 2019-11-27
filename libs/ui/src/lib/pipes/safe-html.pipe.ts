import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

// https://stackoverflow.com/questions/39628007/angular2-innerhtml-binding-remove-style-attribute

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) {}

  transform(value: any, args?: any): any {
    return this._sanitizer.bypassSecurityTrustHtml(value);
  }
}
