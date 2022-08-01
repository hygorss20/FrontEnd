import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth/auth.service";
import { SnackbarUtilService } from "src/app/utils/snackbar/snackbar-util.service";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"],
})
export class SignInComponent implements OnInit {
  email: string;
  password: string;

  loading: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private snackbar: SnackbarUtilService
  ) {}

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.goToUserPage();
    }
  }

  onLogin() {
    if (!this.email || !this.password) {
      this.snackbar.showMessage(`Enter your email and password`);
      return;
    }

    this.loading = true;

    this.auth
      .handleLogin(this.email, this.password)
      .subscribe((response: any) => {
        this.loading = false;

        if (response.auth) {
          this.goToUserPage();
        } else {
          this.snackbar.showMessage("User unauthorized");
        }
      });
  }

  onRecoveryPassword() {
    if (!this.email) {
      this.snackbar.showMessage(`Enter your email address`);
      return;
    }

    this.snackbar.showMessage(
      `Sending recovery message to email ${this.email}`
    );

    this.loading = true;

    this.auth.recoveryPassword(this.email).subscribe((response) => {
      this.loading = false;
      if (!response) {
        this.snackbar.showErrorMessage(
          `Can't send recovery message to email ${this.email}`
        );
        return;
      }

      this.snackbar.showMessage(`Check your email to recovery your password`);
    });
  }

  onSignUp() {
    this.router.navigate(["/sign-up"]);
  }

  goToUserPage() {
    this.router.navigate(["/giveaways"]);
  }
}
