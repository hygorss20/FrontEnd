import { Component, OnInit } from "@angular/core";
import { CurrenciesService } from "src/app/services/currencies/currencies.service";
import { CurrencyEnum } from "src/app/utils/currencies/currencies.enum";

@Component({
  selector: "app-currency-menu",
  templateUrl: "./currency-menu.component.html",
  styleUrls: ["./currency-menu.component.scss"],
})
export class CurrencyMenuComponent {
  currencies: { label: string; value: CurrencyEnum }[];
  currentCurrency: CurrencyEnum;

  constructor(private currenciesService: CurrenciesService) {
    this.setCurrencies();
  }

  setCurrencies() {
    this.currenciesService.getAvailable().subscribe((currencies) => {
      this.currencies = currencies.map<{ label: string; value: CurrencyEnum }>(
        (currencyModel) => {
          return {
            label: `${currencyModel.symbol} ${currencyModel.id}`,
            value: currencyModel.id,
          };
        }
      );
    });

    this.currentCurrency = CurrencyEnum.USD;
  }

  onCurrencyChange() {
    this.currenciesService.setCurrency(this.currentCurrency);
  }
}
