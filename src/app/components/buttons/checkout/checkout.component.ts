import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"],
})
export class CheckoutComponent implements OnInit {
  @Input("disabled") disabled: boolean;
  @Output("onClick") onClickEventEmitter: EventEmitter<void> =
    new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onClick() {
    this.onClickEventEmitter.emit();
  }
}
