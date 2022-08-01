import { Product } from "./product-model";
import { Customer } from "./customer";
import { Currency } from "./currency";
import { Payment } from "./payment";

export interface Purchase {
  id?: string;
  items: Array<PurchaseItem>;
  customer: Customer;
  total?: number;
  type: string;
  currency: Currency;
  paymentMethod: Payment;
  customerNote?: string;
}

export interface PurchaseItem {
  item: Product;
  quantity: number;
  total: number;
}
