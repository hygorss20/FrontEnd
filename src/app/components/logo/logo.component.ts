import { Component, OnInit } from "@angular/core";
import { Router, RouterEvent, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-logo",
  templateUrl: "./logo.component.html",
  styleUrls: ["./logo.component.scss"],
})
export class LogoComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
