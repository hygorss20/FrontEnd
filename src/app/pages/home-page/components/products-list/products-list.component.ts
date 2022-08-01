import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-products-list",
  templateUrl: "./products-list.component.html",
  styleUrls: ["./products-list.component.scss"],
})
export class ProductsListComponent implements OnInit {
  products = [
    {
      name: "Runescape 07 Gold",
      route: "/osrs",
      image: "assets/pictures/osrs-02.jpg",
    },
    {
      name: "Runescape 03 Gold",
      route: "/rs3",
      image: "assets/pictures/runescape-04.jpeg",
    },
    {
      name: "Albion Silver",
      route: "/albion-silver",
      image: "assets/pictures/albion-01.jpeg",
    },
    {
      name: "New World",
      route: "/new-world",
      image: "assets/pictures/new-world-01.jpg",
    },
  ];

  constructor() {}

  ngOnInit() {}
}
