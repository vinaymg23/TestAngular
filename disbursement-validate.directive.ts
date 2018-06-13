import { Directive, HostListener, ElementRef, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDisbursementValidate]'
})
export class DisbursementValidateDirective {
  @Input() disbursementAttribute: string;
  private el: any;

  constructor(private elementRef: ElementRef) {
    this.el = this.elementRef.nativeElement;
  }

  @HostListener('keydown', ['$event']) onkeydown(event: any) {
    // For 'Disbursement Indicator'
    if (this.disbursementAttribute === 'D') {
      if (event && event.keyCode !== 78 && event.keyCode !== 89 && event.keyCode !== 8 &&
        event.keyCode !== 9 && event.keyCode !== 13) {
        event.preventDefault();
      }
    }
    // For 'Mail To'
    if (this.disbursementAttribute === 'mailTo') {
      if (event && event.keyCode !== 73 && event.keyCode !== 76 && event.keyCode !== 77 &&
        event.keyCode !== 79 && event.keyCode !== 8 && event.keyCode !== 9 && event.keyCode !== 13) {
        event.preventDefault();
      }
    }
    // For 'Delivery Indicator'
    if (this.disbursementAttribute === 'DI') {
      if (event && event.keyCode !== 82 && event.keyCode !== 84 && event.keyCode !== 79 &&
        event.keyCode !== 8 && event.keyCode !== 9 && event.keyCode !== 13) {
        event.preventDefault();
      }
    }
  }

  @HostListener('keyup', ['$event']) onkeyup(event: any) {
    const disburseRegex = /^[ynYN]{1}$/;
    const mailToRegex = /^[mMiIlLoO]{1}$/;
    const deliveryIndicatorRegex = /^[rRtToO]{1}$/;

    if (this.disbursementAttribute === 'D') {
      if (!disburseRegex.test(this.el.value)) {
        this.el.value = '';
      }
    }
    // For 'Mail To'
    if (this.disbursementAttribute === 'mailTo') {
      if (!mailToRegex.test(this.el.value)) {
        this.el.value = '';
      }
    }
    // For 'Delivery Indicator'
    if (this.disbursementAttribute === 'DI') {
      if (!deliveryIndicatorRegex.test(this.el.value)) {
        this.el.value = '';
      }
    }
  }
}
