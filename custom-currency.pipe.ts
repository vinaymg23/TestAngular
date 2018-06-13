import { Pipe, PipeTransform } from '@angular/core';

const PADDING = '000000';

@Pipe({ name: 'customCurrency' })
export class CustomCurrencyPipe implements PipeTransform {

  private PREFIX: string
  private DECIMAL_SEPARATOR: string;
  private THOUSANDS_SEPARATOR: string;
  private SUFFIX: string

  constructor() {

    this.PREFIX = '$'
    this.DECIMAL_SEPARATOR = '.';
    this.THOUSANDS_SEPARATOR = ' ';

  }

  transform(value: string, fractionSize: number = 2): string {
    const formatValue = parseFloat(value).toFixed(2);
    let [integer, fraction = ''] = (formatValue || '').toString()
      .split('.');
    fraction = fractionSize > 0
      ? this.DECIMAL_SEPARATOR + (fraction + PADDING).substring(0, fractionSize)
      : '';
    integer = integer.replace(/[^0-9.]/g, ''); // to remove -ve  sign in currency
    integer = integer === '' ? '0' : integer;
    // console.log('transform', this.PREFIX + integer + fraction)

    return this.PREFIX + integer + fraction;
  }

  parse(value: string, fractionSize: number = 2): string {
    let [integer, fraction = ''] = (value || '').replace(this.PREFIX, '')
      .replace(this.SUFFIX, '')
      .split(this.DECIMAL_SEPARATOR);

    // integer = integer.replace(new RegExp(this.THOUSANDS_SEPARATOR, 'g'), '');
    integer = integer.replace(/[^0-9.]/g, '');
    integer = integer === '' ? '0' : integer;

    fraction = parseInt(fraction, 10) > 0 && fractionSize > 0
      ? this.DECIMAL_SEPARATOR + (fraction + PADDING).substring(0, fractionSize)
      : '';
    // console.log('parse', integer + fraction)
    return integer + fraction;
  }

}
