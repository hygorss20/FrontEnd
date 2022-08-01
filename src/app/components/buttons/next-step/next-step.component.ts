import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-next-step",
  templateUrl: "./next-step.component.html",
  styleUrls: ["./next-step.component.scss"],
})
export class NextStepComponent implements OnInit {
  @Input("disabled") disabled: boolean;
  @Output("onClick") onClickEventEmitter: EventEmitter<void> =
    new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onClick() {
    this.onClickEventEmitter.emit();
  }
}
