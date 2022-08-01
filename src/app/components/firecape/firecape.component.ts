import { Component, OnInit, OnChanges, Input } from "@angular/core";
import { ProductsService } from "src/app/services/products/products.service";
import { Product } from "src/app/model/product-model";
import { MatDialog } from "@angular/material/dialog";
import { MediaObserver, MediaChange } from "@angular/flex-layout";
import { CurrenciesService } from "src/app/services/currencies/currencies.service";
import { CurrencyPipe } from "@angular/common";
import { Currency } from "src/app/model/currency";
import { AnalyticsService } from "src/app/features/analytics/analytics.service";

@Component({
  selector: "app-firecape",
  templateUrl: "./firecape.component.html",
  styleUrls: ["./firecape.component.scss"],
  providers: [CurrencyPipe],
})
export class FirecapeComponent implements OnInit {
  firecapeProducts: Product[];
  priceProducts: number[];
  currentCurrency: Currency;
  gridList: { cols: number; rowHeight: string };

  constructor(
    private mediaObserver: MediaObserver,
    private products: ProductsService,
    public dialog: MatDialog,
    private currencies: CurrenciesService,
    private analyticsService: AnalyticsService
  ) {
    this.mediaObserver.media$.subscribe((change: MediaChange) => {
      if (this.isMobileContent()) {
        this.gridList = {
          cols: 1,
          rowHeight: "23em",
        };
      } else {
        this.gridList = {
          cols: 4,
          rowHeight: "23em",
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

  buyFirecape(productFirecape: Product) {
    this.analyticsService.sendViewItemEvent(productFirecape);

    this.dialog.open(DialogBuyFirecapeComponent, {
      closeOnNavigation: true,
      hasBackdrop: true,
      data: {
        product: productFirecape,
        price: this.convertPriceToCurrentCurrency(productFirecape.sellPrice),
        priceUSD: productFirecape.sellPrice,
      },
    });
  }

  buyFirecapeIronMan(productFirecape: Product) {
    this.analyticsService.sendViewItemEvent(productFirecape);

    this.dialog.open(DialogBuyFirecapeIronmanComponent, {
      closeOnNavigation: true,
      hasBackdrop: true,
      data: {
        product: productFirecape,
        price: this.convertPriceToCurrentCurrency(productFirecape.sellPrice),
        priceUSD: productFirecape.sellPrice,
      },
    });
  }

  buyFirecapeJadKill(productFirecape: Product) {
    this.analyticsService.sendViewItemEvent(productFirecape);

    this.dialog.open(DialogBuyFirecapeJadKillComponent, {
      closeOnNavigation: true,
      hasBackdrop: true,
      data: {
        product: productFirecape,
        price: this.convertPriceToCurrentCurrency(productFirecape.sellPrice),
        priceUSD: productFirecape.sellPrice,
      },
    });
  }

  ngOnInit() {
    this.priceProducts = [1, 1, 1, 1, 1, 1, 1, 1];
    this.firecapeProducts = [
      {
        id: "firecape-Tier-1",
        name: "Fire Cape Tier 1",
        buyPrice: 1,
        sellPrice: 7.5,
      },
      {
        id: "firecape-Tier-2",
        name: "Fire Cape Tier 1",
        buyPrice: 1,
        sellPrice: 17.99,
      },
      {
        id: "firecape-Tier-3",
        name: "Fire Cape Tier 4",
        buyPrice: 1,
        sellPrice: 13.99,
      },
      {
        id: "firecape-Tier-4",
        name: "Fire Cape Tier 4",
        buyPrice: 1,
        sellPrice: 22.99,
      },
      {
        id: "firecape-Tier-5",
        name: "Fire Cape Tier 5",
        buyPrice: 1,
        sellPrice: 26.99,
      },
      {
        id: "firecape-Tier-6",
        name: "Fire Cape Tier 6",
        buyPrice: 1,
        sellPrice: 29.99,
      },
      {
        id: "firecape-Tier-1-Ironman",
        name: "Fire Cape Tier 1 Ironman",
        buyPrice: 1,
        sellPrice: 7.5,
      },
      {
        id: "firecape-Tier-2-Ironman",
        name: "Fire Cape Tier 2 Ironman",
        buyPrice: 1,
        sellPrice: 12.99,
      },
      {
        id: "firecape-Jad-Kill",
        name: "Jad Kill (Wave 62 and Jad)",
        buyPrice: 1,
        sellPrice: 4.5,
      },
    ];

    for (let index = 0; index < this.firecapeProducts.length; index++) {
      this.products
        .findById(this.firecapeProducts[index].id)
        .subscribe((product) => {
          this.firecapeProducts[index] = product;
          this.priceProducts[index] = product.sellPrice;
        });
    }

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
}

@Component({
  selector: "dialog-buy-firecape",
  template: `
    <mat-dialog-content class="mat-typography">
      <app-buy-firecape></app-buy-firecape>
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
    text-align: center;
    justify-content: center !important;"
      >
        Close
      </button>
    </mat-dialog-actions>
  `,
})
export class DialogBuyFirecapeComponent {}

@Component({
  selector: "dialog-buy-firecape-ironman",
  template: `
    <mat-dialog-content class="mat-typography">
      <app-buy-firecape-ironman></app-buy-firecape-ironman>
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
  text-align: center;
  justify-content: center !important;"
      >
        Close
      </button>
    </mat-dialog-actions>
  `,
})
export class DialogBuyFirecapeIronmanComponent {}

@Component({
  selector: "dialog-buy-firecape-jad-kill",
  template: `
    <mat-dialog-content class="mat-typography">
      <app-buy-firecape-jad-kill></app-buy-firecape-jad-kill>
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
  text-align: center;
  justify-content: center !important;"
      >
        Close
      </button>
    </mat-dialog-actions>
  `,
})
export class DialogBuyFirecapeJadKillComponent {}
