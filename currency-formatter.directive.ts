import { Directive, HostListener, ElementRef, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CustomCurrencyPipe } from '../pipes/custom-currency.pipe'

@Directive({
  selector: '[appCurrencyFormatter]'
})
export class CurrencyFormatterDirective implements OnInit {
  @Input() validateMaxAmount?: string;
  @Input() validateMinAmount?: string;
  @Input() range?;
  @Output() valueChange?= new EventEmitter();
  private el: any;

  constructor(
    private elementRef: ElementRef,
    private currencyPipe: CustomCurrencyPipe
  ) {
    this.el = this.elementRef.nativeElement;

  }

  ngOnInit() {
    this.el.value = this.el.value ? this.currencyPipe.transform(this.el.value) : '';
  }

  @HostListener('focus', ['$event.target.value'])
  onFocus(value) {
    if (this.range) {
      this.el.value = (parseFloat(value) > parseFloat(this.validateMaxAmount) || parseFloat(value) < parseFloat(this.validateMinAmount))
        ? '' : value;
    } else {
      if (this.validateMaxAmount) {
        this.el.value = parseFloat(value) > parseFloat(this.validateMaxAmount) ? '' : value;
      }
      if (this.validateMinAmount) {
        this.el.value = parseFloat(value) < parseFloat(this.validateMinAmount) ? this.valueChange.emit('') : value;
      }
    }
    this.el.value = this.el.value ? this.currencyPipe.parse(value) : ''; // opposite of transform
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(value) {
    if (this.range) {
      this.el.value = (parseFloat(value) > parseFloat(this.validateMaxAmount) || parseFloat(value) < parseFloat(this.validateMinAmount))
        ? '' : value;
    } else {
      if (this.validateMaxAmount) {
        this.el.value = parseFloat(value) > parseFloat(this.validateMaxAmount) ? '' : value;
      }
      if (this.validateMinAmount) {
        this.el.value = parseFloat(value) < parseFloat(this.validateMinAmount) ? this.valueChange.emit('') : value;
      }
    }
    this.el.value = this.el.value ? this.currencyPipe.transform(value) : '';
  }


  @HostListener('keydown', ['$event']) onkeydown(event) {
    if (event && (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)
      && event.keyCode !== 190 && event.keyCode !== 110 && event.keyCode !== 9 &&
      event.keyCode !== 46 && event.keyCode !== 8 || event.keyCode === 16) {
      event.preventDefault();
      this.valueChange.emit('');
      event.target.value = event.target.value.replace(/[^0-9.]/g, '');
    }
  }

  @HostListener('keyup', ['$event']) onkeyup(event: any) {
    if (/[^0-9.]/.test(event.target.value)) {
      event.preventDefault();
      this.valueChange.emit('');
      event.target.value = event.target.value.replace(/[^0-9.]/g, '');
    }
  }


}
