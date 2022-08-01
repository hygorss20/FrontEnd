import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/model/product-model";
import { ProductsService } from "src/app/services/products/products.service";

@Component({
  selector: "app-albion-silver",
  templateUrl: "./albion-silver.component.html",
  styleUrls: ["./albion-silver.component.scss"],
})
export class AlbionSilverComponent implements OnInit {
  product: Product;

  constructor(private products: ProductsService) {}

  ngOnInit() {
    this.product = {
      id: "albion-silver",
      name: "Albion Silver",
      buyPrice: 1,
      sellPrice: 1,
      localObj: true,
    };

    this.products
      .findById(this.product.id)
      .subscribe((product) => (this.product = product));
  }
}
