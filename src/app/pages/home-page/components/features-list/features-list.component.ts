import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-features-list",
  templateUrl: "./features-list.component.html",
  styleUrls: ["./features-list.component.scss"],
})
export class FeaturesListComponent implements OnInit {
  features = [
    { icon: "fa-clock", description: "Instant & Safe Delivery" },
    { icon: "fa-dollar-sign", description: "Reasonable Prices" },
    { icon: "fa-globe-asia", description: "English and Spanish Support" },
    { icon: "fa-check-circle", description: "24/7 Online" },
  ];

  constructor() {}

  ngOnInit() {}
}
