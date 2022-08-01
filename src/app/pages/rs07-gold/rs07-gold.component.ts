import { Component, OnInit } from "@angular/core";
import { ProductsService } from "src/app/services/products/products.service";
import { Product } from "src/app/model/product-model";

@Component({
  selector: "app-rs07-gold",
  templateUrl: "./rs07-gold.component.html",
  styleUrls: ["./rs07-gold.component.scss"],
})
export class Rs07GoldComponent implements OnInit {
  product: Product;

  constructor(private products: ProductsService) {}

  ngOnInit() {
    this.product = {
      id: "old-school-runescape-gold",
      name: "Old School Runescape Gold",
      buyPrice: 1,
      sellPrice: 1,
      localObj: true,
    };

    this.products
      .findById(this.product.id)
      .subscribe((product) => (this.product = product));
  }
}
