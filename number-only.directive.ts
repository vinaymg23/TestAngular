import { Directive, Renderer, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appNumberOnly]'
})
export class NumberOnlyDirective {
@Input() datatype: string;
  constructor(private el: ElementRef,
    private renderer: Renderer) { }

  @HostListener('keyup') onkeyup() {
    const numRegex = /[^0-9]/g
    const decimalRegex = /[^$0-9.]/g
    let transformedInput;
    const enteredText = this.el.nativeElement.value

    if (this.datatype === 'number') {
       transformedInput = this.el.nativeElement.value.replace(numRegex, '');
    }else if (this.datatype === 'decimal') {
      transformedInput = this.el.nativeElement.value.replace(decimalRegex, '');
    }

    if (enteredText === undefined) {
      return '';
    }

    if (transformedInput !== enteredText) {
      this.renderer.setElementProperty(this.el.nativeElement, 'value', transformedInput);
    }
    return enteredText;
  }

}
