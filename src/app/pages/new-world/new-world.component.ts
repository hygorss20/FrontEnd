import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/model/product-model";
import { ProductsService } from "src/app/services/products/products.service";

@Component({
  selector: "app-new-world",
  templateUrl: "./new-world.component.html",
  styleUrls: ["./new-world.component.scss"],
})
export class NewWorldComponent implements OnInit {
  products: Array<Product>;
  title: string = "New World Gold";

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.productsService
      .findNewWorldGoldProducts()
      .subscribe((products) => (this.products = products));
  }
}
