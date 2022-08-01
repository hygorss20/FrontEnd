import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-add-to-cart",
  templateUrl: "./add-to-cart.component.html",
  styleUrls: ["./add-to-cart.component.scss"],
})
export class AddToCartComponent implements OnInit {
  @Output("click") onClickEventEmitter: EventEmitter<void> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onClick() {
    this.onClickEventEmitter.emit();
  }
}
