import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { MediaObserver } from "@angular/flex-layout";
import { filter } from "rxjs/operators";
import { RouterEvent, NavigationEnd, Router } from "@angular/router";
import { BreakpointObserver } from "@angular/cdk/layout";

@Component({
  selector: "app-main-nav",
  templateUrl: "./main-nav.component.html",
  styleUrls: ["./main-nav.component.scss"],
})
export class MainNavComponent implements OnInit {
  @Output("onMenuClick") onMenuClickEventEmitter: EventEmitter<string> =
    new EventEmitter();

  isMenuHidden: boolean = true;

  menus: { label: string; id: string; route?: string; onClick?: () => void }[];

  constructor(
    private mediaObserver: MediaObserver,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {
    this.listenBreakpoint();
  }

  listenBreakpoint() {
    this.breakpointObserver
      .observe(this.getMobileBreakpoint())
      .subscribe((result) => {
        if (result.matches) {
          this.isMenuHidden = true;
          return;
        }

        this.isMenuHidden = false;
      });
  }

  ngOnInit() {
    this.menus = [
      {
        id: "home",
        label: "Home",
        route: "/",
      },
      {
        id: "osrs",
        label: "OSRS Gold",
        route: "/osrs",
      },
      { id: "rs3", label: "RS3 Gold", route: "/rs3" },
      {
        id: "albion-silver",
        label: "Albion Silver",
        route: "/albion-silver",
      },
      {
        id: "new-world",
        label: "New world",
        route: "/new-world",
      },
      {
        id: "firecape",
        label: "Fire Capes",
        route: "/firecape",
      },
      {
        id: "account",
        label: "Accounts",
        route: "/account",
      },
      {
        id: "giveaways",
        label: "Giveaways",
        route: "/giveaways",
      },
    ];
  }

  getMobileBreakpoint() {
    return "(max-width: 959px)";
  }

  onMenuClick(id) {
    this.onMenuClickEventEmitter.emit(id);
  }

  onClickMenuItem(menuItem) {
    if (menuItem.onClick) {
      menuItem.onClick();
    }

    this.hideMenuIfIsMobile();
  }

  hideMenuIfIsMobile() {
    const isMobile = this.breakpointObserver.isMatched(
      this.getMobileBreakpoint()
    );

    if (isMobile) {
      this.isMenuHidden = true;
    }
  }
}
