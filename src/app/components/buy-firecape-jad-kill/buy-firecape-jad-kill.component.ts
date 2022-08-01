import { Component, OnInit, ViewChild, OnChanges } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";
import { Inject } from "@angular/core";
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
import { FormControl } from "@angular/forms";
import { DialogBuyFirecapeComponent } from "src/app/components/firecape/firecape.component";
import { MatVerticalStepper } from "@angular/material";
import { MatDialog } from "@angular/material/dialog";
import { ProductsService } from "src/app/services/products/products.service";
import { MatStepper } from "@angular/material/stepper";
import { EncryptUtilService } from "src/app/utils/encrypt/encrypt-util.service";
import { AnalyticsService } from "src/app/features/analytics/analytics.service";
@Component({
  selector: "app-buy-firecape-jad-kill",
  templateUrl: "./buy-firecape-jad-kill.component.html",
  styleUrls: ["./buy-firecape-jad-kill.component.scss"],
  providers: [CurrencyPipe],
})
export class BuyFirecapeJadKillComponent implements OnInit {
  title: string = "";
  price: number;
  priceUSD: number;
  priceLabel: string = "";

  currentCurrency: Currency;

  customer: Customer;
  customerNote: string;
  payment: Payment;
  product: Product;

  agreedTerms: boolean = false;
  unchecked: boolean = false;
  isValidDetails: boolean;

  isLoadingRequest: boolean;

  osrsPrice: number;
  rs3Price: number;

  totalPrice: string;

  @ViewChild("agreeTermsControl", { static: true })
  agreeTerms: FormControl;

  @ViewChild(MatVerticalStepper, { static: true })
  stepper: MatVerticalStepper;

  constructor(
    private currencies: CurrenciesService,
    private currencyPipe: CurrencyPipe,
    private cart: CartService,
    private products: ProductsService,
    private chat: ZopimService,
    private snackbar: SnackbarUtilService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private encrypt: EncryptUtilService,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit() {
    this.title = this.data.product.name;
    this.product = this.data.product;
    this.price = this.data.price;
    this.priceUSD = this.data.priceUSD;
    this.currencies.getCurrency().subscribe((currency) => {
      this.currentCurrency = currency;
      this.totalPrice =
        this.currentCurrency.symbol + "" + this.data.price.toFixed(2);
    });

    this.products.findById("old-school-runescape-gold").subscribe((product) => {
      this.osrsPrice = product.buyPrice;
    });
    this.products.findById("runescape-3-gold").subscribe((product) => {
      this.rs3Price = product.buyPrice;
    });
  }

  onChangeDetails(data: { details: Customer; note: string }): void {
    this.customer = data.details;
    this.customerNote = data.note;
  }

  onPaymentMethodChange(method: string): void {
    this.payment = { id: method };

    if (method === "OSRS-GOLD") {
      this.totalPrice = (this.priceUSD / this.osrsPrice).toFixed(2) + "M";
    } else if (method === "RS3-GOLD") {
      this.totalPrice = (this.priceUSD / this.rs3Price).toFixed(2) + "M";
    } else {
      this.totalPrice =
        this.currentCurrency.symbol + "" + this.price.toFixed(2);
    }

    this.sendAddPaymentInfoEvent();
  }

  onDetailsChange(event): void {
    this.isValidDetails = event;
  }

  checkValidForm(): boolean {
    return (
      this.isValidDetails &&
      this.payment !== undefined &&
      this.payment !== null &&
      this.agreedTerms
    );
  }

  onCheckout(): void {
    this.cart.addToCart({
      item: this.product,
      quantity: 1,
      total: this.price,
    });

    this.isLoadingRequest = true;
    const purchase = this.getPurchase();

    this.cart.checkout(purchase as PurchaseRequest).subscribe(
      (purchase) => {
        this.snackbar.showSuccessMessage("Successful purchase");
        this.cart.clearCart();
        this.chat.startPurchaseChatFirecape(
          purchase as Purchase,
          this.totalPrice
        );
        this.router.navigate(["/receipt"]);
        this.dialog.closeAll();
      },
      (error: HttpErrorResponse) => {
        this.snackbar.showErrorMessage(
          "Unable to complete your purchase. Please, try again"
        );
        console.log(error);
        this.isLoadingRequest = false;
        this.cart.clearCart();
        this.dialog.closeAll();
      }
    );
  }

  getPurchase(): PurchaseRequest | { error: string } {
    return {
      currency: this.currentCurrency.id,
      customerNote: this.customerNote,
      type: "BUY",
      customer: {
        email: this.customer.email,
        nickname: this.customer.nickname,
        password: this.encrypt.encrypt(this.customer.password),
      },
      paymentMethod: this.payment.id,
    };
  }

  onFieldChange() {
    this.agreedTerms = !this.agreedTerms;
  }

  goBack(stepper: MatStepper) {
    stepper.previous();
  }

  goForward(stepper: MatStepper) {
    stepper.next();
  }

  stepperSelectionChange() {
    setTimeout(() => {
      if (this.stepper.selectedIndex === 1) {
        this.sendBeginCheckoutEvent();
      }
    });
  }

  sendBeginCheckoutEvent() {
    this.analyticsService.sendBeginCheckoutEvent(this.product, 1);
  }

  sendAddPaymentInfoEvent() {
    if (this.stepper.selectedIndex !== 2) {
      return;
    }

    this.analyticsService.sendAddPaymentInfoEvent(
      this.product,
      1,
      this.payment
    );
  }
}
