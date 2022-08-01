import { CurrencyEnum } from "../utils/currencies/currencies.enum";

export interface Currency {
  id: CurrencyEnum;
  symbol: string;
  conversionToUSDValue: number;
}
