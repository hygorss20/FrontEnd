import {
  Directive,
  Input,
  ElementRef,
  Renderer2,
  HostListener,
} from "@angular/core";
import { CurrencyPipe } from "@angular/common";
import { Currency } from "src/app/model/currency";

@Directive({
  selector: "[numberFormat]",
  providers: [CurrencyPipe],
})
export class NumberFormatInputDirective {
  @Input() label: string = "";
  @Input() isPreffix: boolean;
  @Input() useCurrency: boolean;
  @Input() currency: Currency;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private currencyPipe: CurrencyPipe
  ) {}

  @HostListener("focus")
  onFocusIn() {
    this.handleOnFocusIn();
  }

  @HostListener("blur")
  onFocusOut() {
    this.handleOnFocusOut();
  }

  handleOnFocusIn() {
    let value: string = this.el.nativeElement.value.replace(
      /[a-zA-Z$£€\s+]+/,
      ""
    );
    this.renderer.setProperty(this.el.nativeElement, "value", value);
  }

  handleOnFocusOut() {
    const value: number = Number.parseFloat(this.el.nativeElement.value);
    const numberValue = isNaN(value) ? 0 : value;

    let text;
    if (this.useCurrency) {
      text = this.currencyPipe.transform(numberValue, this.currency.id);
    } else {
      text = this.isPreffix
        ? `${this.label} ${numberValue}`
        : `${numberValue} ${this.label}`;
    }
    this.renderer.setProperty(this.el.nativeElement, "value", text);
  }
}
