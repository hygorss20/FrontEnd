import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { SnackbarUtilService } from "src/app/utils/snackbar/snackbar-util.service";
import { GiveawayPrize } from "../../giveaway-prize.model";
import { GiveawaysService } from "../../giveaways.service";

@Component({
  selector: "app-spin-wheel-form-dialog",
  templateUrl: "./spin-wheel-form-dialog.component.html",
  styleUrls: ["./spin-wheel-form-dialog.component.scss"],
})
export class SpinWheelFormDialogComponent implements OnInit {
  discordNumberControl: FormControl;
  pattern = "[^#]+#\\d{4}";

  loading: boolean;

  constructor(
    private snackbar: SnackbarUtilService,
    private giveaways: GiveawaysService,
    public dialogRef: MatDialogRef<SpinWheelFormDialogComponent, GiveawayPrize>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit() {
    this.discordNumberControl = new FormControl("", [
      Validators.required,
      Validators.pattern(this.pattern),
    ]);

    this.loading = false;
  }

  confirm() {
    const discordNumber = this.discordNumberControl.value;
    this.loading = true;

    this.giveaways.spinWheel(discordNumber).subscribe(
      (result) => this.spinWheelSuccess(result),
      (errorResult) => this.handleSpinWheelError(errorResult)
    );
  }

  spinWheelSuccess(prize: GiveawayPrize) {
    this.loading = false;
    this.dialogRef.close(prize);
  }

  handleSpinWheelError(result) {
    this.loading = false;
    this.dialogRef.close();

    if (!!result && !!result.error && result.error.message) {
      this.snackbar.showMessage(result.error.message);
      return;
    }

    this.snackbar.showMessage("Error on Spin the Wheel. Try again");
  }
}
