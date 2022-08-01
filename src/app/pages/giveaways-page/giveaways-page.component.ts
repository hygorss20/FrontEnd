import { Component, OnInit } from "@angular/core";
import { Giveaway } from "src/app/features/giveaways/giveaway.model";
import { GiveawaysService } from "src/app/features/giveaways/giveaways.service";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
  selector: "app-giveaways-page",
  templateUrl: "./giveaways-page.component.html",
  styleUrls: ["./giveaways-page.component.scss"],
})
export class GiveawaysPageComponent implements OnInit {
  activeRound: Giveaway = null;

  user;

  constructor(private giveaways: GiveawaysService, private auth: AuthService) {}

  ngOnInit() {
    this.load();
  }

  logout() {
    this.auth.handleLogout();
  }

  refreshRound() {
    this.load();
  }

  load() {
    this.giveaways.findActiveRound().subscribe((activeRound) => {
      this.activeRound = activeRound;
    });

    this.user = this.auth.getTokenPayload();
  }
}
