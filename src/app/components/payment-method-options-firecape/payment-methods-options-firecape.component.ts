import {
  Component,
  OnInit,
  ViewEncapsulation,
  Output,
  EventEmitter,
} from "@angular/core";

@Component({
  selector: "app-payment-methods-options-firecape",
  templateUrl: "./payment-methods-options-firecape.component.html",
  styleUrls: ["./payment-methods-options-firecape.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class PaymentMethodsOptionsFirecapeComponent implements OnInit {
  options: Array<PaymentMethod>;

  @Output("onChange") onChangeMethodEventEmitter: EventEmitter<string> =
    new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.options = [
      { id: "PAYPAL", icon: "assets/payment-methods/paypal.png" },
      { id: "BTC", icon: "assets/payment-methods/bitcoin.png" },
      // { id: 'local-bitcoin', icon: 'assets/payment-methods/local-bitcoin.png' },
      { id: "ETH", icon: "assets/payment-methods/ethereum.png" },
      { id: "XRP", icon: "assets/payment-methods/ripple.png" },
      { id: "OSRS-GOLD", icon: "assets/payment-methods/osrs-gold.png" },
      { id: "RS3-GOLD", icon: "assets/payment-methods/rs3-gold.png" },
    ];
  }

  onClick(id: string) {
    this.onChangeMethodEventEmitter.emit(id);
  }
}

export interface PaymentMethod {
  id: string;
  icon: string;
}
