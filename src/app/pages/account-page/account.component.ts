import { Component, OnInit, OnChanges, Input } from "@angular/core";
import { ProductsService } from "src/app/services/products/products.service";
import { AccountsService } from "src/app/services/accounts/accounts.service";
import { Product } from "src/app/model/product-model";
import { Account } from "src/app/model/account";
import { MatDialog } from "@angular/material/dialog";
import { MediaObserver, MediaChange } from "@angular/flex-layout";
import { CurrenciesService } from "src/app/services/currencies/currencies.service";
import { CurrencyPipe } from "@angular/common";
import { Currency } from "src/app/model/currency";
import { AnalyticsService } from "src/app/features/analytics/analytics.service";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"],
  providers: [CurrencyPipe],
})
export class AccountComponent implements OnInit {
  priceProducts: number[];
  currentCurrency: Currency;
  gridList: { cols: number; rowHeight: string };
  allAccounts: Account[] = [];
  allAcountsFilter: Account[] = [];
  search: string;

  constructor(
    private mediaObserver: MediaObserver,
    private products: ProductsService,
    public dialog: MatDialog,
    private currencies: CurrenciesService,
    private accounts: AccountsService,
    private analyticsService: AnalyticsService
  ) {
    this.mediaObserver.media$.subscribe((change: MediaChange) => {
      if (this.isMobileContent()) {
        this.gridList = {
          cols: 1,
          rowHeight: "28em",
        };
      } else {
        this.gridList = {
          cols: 4,
          rowHeight: "28em",
        };
      }
    });
  }

  isMobileContent() {
    const PRINT_MOBILE = "print and (max-width: 600px)";
    return (
      this.mediaObserver.isActive("xs") &&
      !this.mediaObserver.isActive(PRINT_MOBILE)
    );
  }

  buyAccount(account: Account) {
    this.analyticsService.sendViewItemEvent(account);

    this.dialog.open(DialogBuyAccountComponent, {
      closeOnNavigation: true,
      hasBackdrop: true,
      data: {
        product: account,
        price: this.convertPriceToCurrentCurrency(account.sellPrice),
        priceUSD: account.sellPrice,
      },
    });
  }

  ngOnInit() {
    this.accounts.findAll().subscribe((a) => {
      a.forEach((account) => {
        if (account.status === "UNCLAIMED") {
          this.allAccounts.push(account);
          this.allAcountsFilter.push(account);
        }
      });
    });
    this.currencies.getCurrency().subscribe((currency) => {
      this.currentCurrency = currency;
    });
  }

  updatePrice(price: number): String {
    return this.convertPriceToCurrentCurrency(price).toFixed(2);
  }

  convertPriceToCurrentCurrency(price: number): number {
    return Number.parseFloat(
      this.currencies.convertFromUSD(price, this.currentCurrency).toString()
    );
  }

  checkName(name: string) {
    return name.includes(this.search);
  }

  FilterAccounts() {
    this.allAcountsFilter = this.allAccounts.filter((account) => {
      return (
        account.name.toLowerCase().includes(this.search.toLowerCase()) ||
        ("combat level " + account.skills.combatLevel)
          .toLowerCase()
          .includes(this.search.toLowerCase()) ||
        ("combat lvl " + account.skills.combatLevel)
          .toLowerCase()
          .includes(this.search.toLowerCase()) ||
        ("combat " + account.skills.combatLevel)
          .toLowerCase()
          .includes(this.search.toLowerCase())
      );
    });
  }
}

@Component({
  selector: "dialog-buy-account",
  template: `
    <mat-dialog-content class="mat-typography">
      <app-buy-account></app-buy-account>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button
        mat-button
        mat-dialog-close
        style="display: flex;
    border-radius: 0.5em;    
    border : 1px solid #823285;
    width: 6.5% !important;
    margin-right: 5px;
    font-size: 0.9rem;
    color :#823285;
    text-align: center;"
      >
        Close
      </button>
    </mat-dialog-actions>
  `,
})
export class DialogBuyAccountComponent {}
