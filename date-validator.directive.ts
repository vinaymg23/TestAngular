import { Directive, HostListener, ElementRef, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Directive({
  selector: '[appDateValidator]'
})
export class DateValidatorDirective implements OnInit {
  @Input() validateMaxDate: string;
  @Output() resetDate = new EventEmitter<boolean>()
  private el: any;

  constructor(private elementRef: ElementRef) {
    this.el = this.elementRef.nativeElement;
  }
  ngOnInit() {}

  @HostListener('blur', ['$event.target.value'])
  onblur(value, $event) {
    // console.log(new Date(value), new Date(this.validateMaxDate), this.elementRef);
    const inputDate = new Date(value);
    if (inputDate > new Date(this.validateMaxDate)) {
      this.el.value = null;
      this.resetDate.emit(true);
    }else {
      this.el.value = value;
      this.resetDate.emit(false);
    }
  }
}
