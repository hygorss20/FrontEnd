import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ZopimService } from "src/app/services/chat/zopim.service";
import { MatDialog } from "@angular/material/dialog";
import { TermsOfServiceDialogComponent } from "./components/dialogs/terms-of-service-dialog/terms-of-service-dialog.component";
import { PrivacyPolicyDialogComponent } from "./components/dialogs/privacy-policy-dialog/privacy-policy-dialog.component";
import { RefundReturnPolicyDialogComponent } from "./components/dialogs/refund-return-policy-dialog/refund-return-policy-dialog.component";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class FooterComponent implements OnInit {
  constructor(private zopim: ZopimService, public dialog: MatDialog) {}

  ngOnInit() {
    setTimeout(() => {
      this.zopim.setDefaultLanguage();
      this.zopim.setDefaultColor();
    }, 2000);
  }

  openTermsOfService() {
    this.dialog.open(TermsOfServiceDialogComponent, {
      closeOnNavigation: true,
      hasBackdrop: true,
    });
  }

  openPrivacyPolicy() {
    this.dialog.open(PrivacyPolicyDialogComponent, {
      closeOnNavigation: true,
      hasBackdrop: true,
    });
  }

  openRefundAndReturnPolicy() {
    this.dialog.open(RefundReturnPolicyDialogComponent, {
      closeOnNavigation: true,
      hasBackdrop: true,
    });
  }
}
