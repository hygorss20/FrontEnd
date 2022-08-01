export interface PaymentMethod {
  id: string;
  name: string;
  icon?: string;
  allowBuy: boolean;
  allowSell: boolean;
}
