import { Component, OnInit } from "@angular/core";
import { ProductsService } from "src/app/services/products/products.service";
import { Product } from "src/app/model/product-model";

@Component({
  selector: "app-rs03-gold",
  templateUrl: "./rs03-gold.component.html",
  styleUrls: ["./rs03-gold.component.scss"],
})
export class Rs03GoldComponent implements OnInit {
  product: Product;

  constructor(private products: ProductsService) {}

  ngOnInit() {
    this.product = {
      id: "runescape-3-gold",
      name: "Runescape 3 Gold",
      buyPrice: 1,
      sellPrice: 1,
      localObj: true,
    };

    this.products
      .findById(this.product.id)
      .subscribe((product) => (this.product = product));
  }
}
