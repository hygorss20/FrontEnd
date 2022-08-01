import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatRadioModule } from "@angular/material/radio";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatInputModule } from "@angular/material/input";
import { MatStepperModule } from "@angular/material/stepper";
import { MatDialogModule } from "@angular/material/dialog";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { LayoutModule } from "@angular/cdk/layout";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatMenuModule } from "@angular/material/menu";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    MatAutocompleteModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatInputModule,
    MatStepperModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatMenuModule,
    LayoutModule,

    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    MatAutocompleteModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatInputModule,
    MatStepperModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatMenuModule,
    LayoutModule,

    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CommonAppModule {}
