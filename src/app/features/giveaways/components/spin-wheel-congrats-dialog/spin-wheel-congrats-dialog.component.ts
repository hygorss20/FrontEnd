import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { GiveawayPrize } from "../../giveaway-prize.model";

@Component({
  selector: "app-spin-wheel-congrats-dialog",
  templateUrl: "./spin-wheel-congrats-dialog.component.html",
  styleUrls: ["./spin-wheel-congrats-dialog.component.scss"],
})
export class SpinWheelCongratsDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SpinWheelCongratsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { prize: GiveawayPrize }
  ) {}

  ngOnInit() {}
}
