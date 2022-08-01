import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  OnChanges,
} from "@angular/core";
import { CurrenciesService } from "src/app/services/currencies/currencies.service";
import { MatButtonToggleGroup } from "@angular/material/button-toggle";
import { CurrencyPipe } from "@angular/common";
import {
  CartService,
  PurchaseRequest,
} from "src/app/services/cart/cart.service";
import { ZopimService } from "src/app/services/chat/zopim.service";
import { Currency } from "src/app/model/currency";
import { Product } from "src/app/model/product-model";
import { Customer } from "src/app/model/customer";
import { Purchase } from "src/app/model/purchase";
import { Payment } from "src/app/model/payment";
import { SnackbarUtilService } from "src/app/utils/snackbar/snackbar-util.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { MatHorizontalStepper } from "@angular/material";
import { FormControl, NgModel } from "@angular/forms";
import { Observable } from "rxjs";
import { filter, map, startWith, tap } from "rxjs/operators";
import { AnalyticsService } from "src/app/features/analytics/analytics.service";

@Component({
  selector: "app-gold-form",
  templateUrl: "./gold-form.component.html",
  styleUrls: ["./gold-form.component.scss"],
  providers: [CurrencyPipe],
})
export class GoldFormComponent implements OnInit, OnChanges {
  @ViewChild("quantityControlModel", { static: false })
  quantityControlModel: NgModel;

  productVariantControl = new FormControl();
  filteredProducts: Observable<Product[]>;

  @Input() goldUnit: string = "M";
  @Input() products: Array<Product>;

  @Input()
  userGameNameLabel: string = "RSN";

  @Input()
  productTypeLabel: string = "Gold";

  @Input()
  productVariantPlaceholderText = "Select product variant";

  @ViewChild("selectedMode", { static: true })
  selectedMode: MatButtonToggleGroup;

  @ViewChild(MatHorizontalStepper, { static: false })
  stepper: MatHorizontalStepper;

  product: Product;
  quantity: number;
  quantityLabel: string;
  price: number;
  priceLabel: string;

  currentCurrency: Currency;

  customer: Customer;
  customerNote: string;
  payment: Payment;

  isValidDetails: boolean;

  isLoadingRequest: boolean;

  invalidQuantityMessage: string;

  constructor(
    private currencies: CurrenciesService,
    private currencyPipe: CurrencyPipe,
    private cart: CartService,
    private chat: ZopimService,
    private snackbar: SnackbarUtilService,
    private router: Router,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit() {
    this.setQuantity(1);

    this.currencies.getCurrency().subscribe((currency) => {
      this.currentCurrency = currency;
      if (this.quantity) {
        this.updatePrice();
      }
    });

    this.selectedMode.valueChange.subscribe(() => {
      this.payment = null;
    });

    this.setupProductsVariantsField();
  }

  ngOnChanges(changes) {
    if (changes.products) {
      this.setDefaultProduct();
    }

    if (this.quantity) {
      this.updatePrice();
    }
  }

  setDefaultProduct() {
    if (this.products && this.products.length === 1) {
      this.setProductVariant(this.products[0]);
    }
  }

  setProductVariant(product) {
    this.product = product;

    this.fixQuantity();

    this.onProductVariantChange(product);
  }

  fixQuantity() {
    if (
      !this.hasInvalidMinimumQuantity() &&
      !this.hasInvalidMaximumQuantity()
    ) {
      return;
    }

    if (!this.product.minimumAmountToBuy && !this.product.maximumAmountToBuy) {
      return;
    }

    this.setQuantity(
      this.product.minimumAmountToBuy || this.product.maximumAmountToBuy
    );
  }

  setQuantity(quantity: number) {
    this.quantity = quantity;
    this.quantityLabel = `${quantity} ${this.goldUnit}`;
  }

  setQuantityError(hasError: boolean, message?: string) {
    if (!hasError) {
      return;
    }

    this.quantityControlModel.control.setErrors({ quantity: true });
    this.invalidQuantityMessage = message || "";
  }

  updatePrice(): void {
    if (!this.product || !this.quantityLabel) {
      return;
    }

    const quantity = Number.parseFloat(
      this.quantityLabel.replace(this.goldUnit, "")
    );
    this.quantity = isNaN(quantity) ? 0 : quantity;

    const selectedPrice = this.isBuyingMode()
      ? this.product.sellPrice
      : this.product.buyPrice;
    this.price = this.currencies.convertFromUSD(
      this.quantity * selectedPrice,
      this.currentCurrency
    );

    this.priceLabel = this.currencyPipe.transform(
      this.price,
      this.currentCurrency.id
    );
  }

  validateQuantity() {
    const orderType = this.isBuyingMode() ? "buy" : "sell";

    if (this.hasInvalidMinimumQuantity()) {
      return this.setQuantityError(
        true,
        `Minimum amount: ${this.product.minimumAmountToBuy} ${this.goldUnit}`
      );
    }

    if (this.hasInvalidMaximumQuantity()) {
      return this.setQuantityError(
        true,
        `Maximum amount: ${this.product.maximumAmountToBuy} ${this.goldUnit}`
      );
    }

    this.setQuantityError(false);
  }

  hasInvalidMinimumQuantity() {
    return (
      !!this.product.minimumAmountToBuy &&
      this.quantity < this.product.minimumAmountToBuy
    );
  }

  hasInvalidMaximumQuantity() {
    return (
      !!this.product.maximumAmountToBuy &&
      this.quantity > this.product.maximumAmountToBuy
    );
  }

  onProductVariantChange(product) {
    this.updatePrice();
    this.payment = null;

    this.validateQuantity();

    if (!product.localObj) {
      this.analyticsService.sendViewItemEvent(this.product);
    }
  }

  displayProductVariant(product: Product): string {
    if (!product) {
      return "";
    }

    return product.name;
  }

  onQuantityChange() {
    this.updatePrice();
    this.validateQuantity();
  }

  onPriceChange(): void {
    if (!this.product) {
      return;
    }

    const price = Number.parseFloat(
      this.priceLabel.replace(this.currentCurrency.symbol, "")
    );
    this.price = isNaN(price) ? 0 : price;

    const selectedPrice = this.isBuyingMode()
      ? this.product.sellPrice
      : this.product.buyPrice;
    const usdPrice = this.currencies.convertToUSD(
      this.price,
      this.currentCurrency
    );

    const newQuantity = Number.parseFloat(
      (usdPrice / selectedPrice).toFixed(2)
    );
    this.setQuantity(newQuantity);

    this.validateQuantity();
  }

  isBuyingMode(): boolean {
    return this.selectedMode.value == "buy";
  }

  onChangeDetails(data: { details: Customer; note: string }): void {
    this.customer = data.details;
    this.customerNote = data.note;
  }

  onPaymentMethodChange(method: string): void {
    this.payment = { id: method };

    this.sendAddPaymentInfoEvent();
  }

  sendAddPaymentInfoEvent() {
    if (this.stepper.selectedIndex !== 1 || !this.isBuyingMode()) {
      return;
    }

    this.analyticsService.sendAddPaymentInfoEvent(
      this.product,
      this.quantity,
      this.payment
    );
  }

  onDetailsChange(event): void {
    this.isValidDetails = event;
  }

  setupProductsVariantsField() {
    this.filteredProducts = this.productVariantControl.valueChanges.pipe(
      startWith(""),
      tap((value) => {
        if (typeof value != "string") {
          this.setProductVariant(value);
        }
      }),
      filter((v) => typeof v === "string"),
      map((value) => this._filterProducts(value))
    );
  }

  private _filterProducts(value: string): Product[] {
    const filterValue = value.toLowerCase();

    return this.products.filter((product) => {
      return product.name.toLowerCase().includes(filterValue);
    });
  }

  canCheckout(): boolean {
    return (
      this.isValidDetails &&
      this.quantity &&
      this.price &&
      this.payment !== undefined &&
      this.payment !== null
    );
  }

  canGoToCheckout(): boolean {
    let valid: boolean = true;

    valid =
      valid &&
      !!this.quantity &&
      !!this.price &&
      !this.hasInvalidMinimumQuantity() &&
      !this.hasInvalidMaximumQuantity();

    return valid;
  }

  stepperSelectionChange() {
    setTimeout(() => {
      if (this.stepper.selectedIndex === 1) {
        this.sendBeginCheckoutEvent();
      }
    });
  }

  sendBeginCheckoutEvent() {
    if (!this.isBuyingMode()) {
      return;
    }

    this.analyticsService.sendBeginCheckoutEvent(this.product, this.quantity);
  }

  onCheckout(): void {
    this.cart.addToCart({
      item: this.product,
      quantity: this.quantity,
      total: this.price,
    });

    this.isLoadingRequest = true;
    const purchase = this.getPurchase();
    this.cart.checkout(purchase as PurchaseRequest).subscribe(
      (purchase) => {
        this.snackbar.showSuccessMessage("Successful purchase");
        this.cart.clearCart();
        this.chat.startPurchaseChat(purchase);
        this.router.navigate(["/receipt"]);
      },
      (error: HttpErrorResponse) => {
        this.showMessageAboutPurchaseError();
        this.isLoadingRequest = false;
        this.cart.clearCart();
      }
    );
  }

  showMessageAboutPurchaseError() {
    this.snackbar.showErrorMessage(
      "Unable to complete your purchase. Please, try again"
    );
  }

  getPurchase(): PurchaseRequest | { error: string } {
    return {
      currency: this.currentCurrency.id,
      customerNote: this.customerNote,
      type: this.isBuyingMode() ? "BUY" : "SELL",
      customer: {
        email: this.customer.email,
        nickname: this.customer.nickname,
        password: "",
      },
      paymentMethod: this.payment.id,
      userGameNameLabel: this.userGameNameLabel,
    };
  }
}
