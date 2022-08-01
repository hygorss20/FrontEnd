import { ProductType } from "./product-type.model";

export interface Product {
  id: string;
  name: string;
  sellPrice: number;
  buyPrice: number;
  unit?: string;
  type?: ProductType;
  allowBuyingWithPaypal?: boolean;
  minimumAmountToBuy?: number;
  maximumAmountToBuy?: number;
  localObj?: boolean;
}
