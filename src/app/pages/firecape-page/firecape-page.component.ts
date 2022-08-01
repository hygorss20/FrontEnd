import { Component, OnInit } from "@angular/core";
import { MediaObserver, MediaChange } from "@angular/flex-layout";

@Component({
  selector: "app-firecape-page",
  templateUrl: "./firecape-page.component.html",
  styleUrls: ["./firecape-page.component.scss"],
})
export class FirecapePageComponent implements OnInit {
  gridList: { cols: number; rowHeight: string };

  constructor(private mediaObserver: MediaObserver) {
    this.mediaObserver.media$.subscribe((change: MediaChange) => {
      if (this.isMobileContent()) {
        this.gridList = {
          cols: 1,
          rowHeight: "360px",
        };
      } else {
        this.gridList = {
          cols: 4,
          rowHeight: "360px",
        };
      }
    });
  }

  ngOnInit() {}

  isMobileContent() {
    const PRINT_MOBILE = "print and (max-width: 600px)";
    return (
      this.mediaObserver.isActive("xs") &&
      !this.mediaObserver.isActive(PRINT_MOBILE)
    );
  }
}
