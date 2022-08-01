import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth/auth.service";
import { SnackbarUtilService } from "src/app/utils/snackbar/snackbar-util.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"],
})
export class SignUpComponent implements OnInit {
  name: string;
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

  onRegister() {
    if (!this.name || !this.email || !this.password) {
      this.snackbar.showMessage(`Enter all your informations`);
      return;
    }

    if (this.password.length < 4) {
      this.snackbar.showMessage(`Password must have as least 4 characters`);
      return;
    }

    this.loading = true;

    this.auth
      .handleSignUp(this.name, this.email, this.password)
      .subscribe((response: any) => {
        this.loading = false;

        if (response.auth) {
          this.goToUserPage();
          return;
        }

        if (response.existingAccount) {
          this.snackbar.showMessage("This user already exists");
          return;
        }

        this.snackbar.showMessage("Error on register user");
      });
  }

  goToUserPage() {
    this.router.navigate(["/giveaways"]);
  }
}
