import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material";
import { GiveawayPrize } from "../../giveaway-prize.model";
import { SpinWheelFormDialogComponent } from "./spin-wheel-form-dialog.component";

@Injectable({
  providedIn: "root",
})
export class SpinWheelFormDialogService {
  constructor(private dialog: MatDialog) {}

  openDialog(): MatDialogRef<SpinWheelFormDialogComponent, GiveawayPrize> {
    return this.dialog.open(SpinWheelFormDialogComponent, {
      closeOnNavigation: true,
      hasBackdrop: true,
      width: "500px",
      data: {},
    });
  }
}
