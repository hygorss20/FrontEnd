import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RoundComponent } from "./components/round/round.component";
import { CommonAppModule } from "../common/common-app.module";
import { RouletteComponent } from "./components/roulette/roulette.component";
import { SpinWheelFormDialogComponent } from "./components/spin-wheel-form-dialog/spin-wheel-form-dialog.component";
import { SpinWheelCongratsDialogComponent } from "./components/spin-wheel-congrats-dialog/spin-wheel-congrats-dialog.component";

@NgModule({
  declarations: [
    RoundComponent,
    RouletteComponent,
    SpinWheelFormDialogComponent,
    SpinWheelCongratsDialogComponent,
  ],
  imports: [CommonModule, CommonAppModule],
  exports: [RoundComponent],
  entryComponents: [
    SpinWheelFormDialogComponent,
    SpinWheelCongratsDialogComponent,
  ],
})
export class GiveawaysModule {}
