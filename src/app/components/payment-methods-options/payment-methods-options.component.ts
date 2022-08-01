import {
  Component,
  OnInit,
  ViewEncapsulation,
  Output,
  EventEmitter,
  Input,
  OnChanges,
} from "@angular/core";
import { PaymentMethod } from "src/app/features/payment-methods/domain/entities/payment-method.type";
import { PaymentMethodsRepositoryService } from "src/app/features/payment-methods/services/infra/payment-methods-repository/payment-methods-repository.service";
import { Payment } from "src/app/model/payment";
import { Product } from "src/app/model/product-model";
import { SnackbarUtilService } from "src/app/utils/snackbar/snackbar-util.service";

@Component({
  selector: "app-payment-methods-options",
  templateUrl: "./payment-methods-options.component.html",
  styleUrls: ["./payment-methods-options.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class PaymentMethodsOptionsComponent implements OnInit, OnChanges {
  options: Array<PaymentMethod>;

  placeholderOptions = Array.from({ length: 9 });

  @Input()
  payment: Payment;

  @Input()
  isBuyingMode: boolean;

  @Input()
  product: Product;

  @Output("onChange") onChangeMethodEventEmitter: EventEmitter<string> =
    new EventEmitter();

  constructor(
    private paymentMethodsRepositoryService: PaymentMethodsRepositoryService,
    private snackbar: SnackbarUtilService
  ) {}

  ngOnInit() {
    this.loadPaymentMethods();
  }

  ngOnChanges(changes) {
    if (changes.isBuyingMode || changes.product) {
      this.loadPaymentMethods();
    }
  }

  loadPaymentMethods() {
    this.paymentMethodsRepositoryService.getAvaliableMethods().subscribe(
      (paymentMethods) => this.setPaymentMethods(paymentMethods),
      () => this.showMessageAboutLoadPaymentMethods()
    );
  }

  setPaymentMethods(paymentMethods: PaymentMethod[]) {
    this.options = paymentMethods.filter(this.isValidPaymentMethod.bind(this));
  }

  isValidPaymentMethod(paymentMethod) {
    if (!this.isBuyingMode) {
      return paymentMethod.allowSell;
    }

    if (paymentMethod.id === "PAYPAL" && this.product.allowBuyingWithPaypal) {
      return true;
    }

    return paymentMethod.allowBuy;
  }

  showMessageAboutLoadPaymentMethods() {
    this.snackbar.showErrorMessage(
      "Unable to load payment methods. Please, try again"
    );
  }

  onClick(paymentMethod: PaymentMethod) {
    this.onChangeMethodEventEmitter.emit(paymentMethod.id);
  }
}
