import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { isPlatformBrowser } from "@angular/common";
import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import { Subject, timer } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { AuthService } from "src/app/services/auth/auth.service";
import { SnackbarUtilService } from "src/app/utils/snackbar/snackbar-util.service";
import { GiveawayPrize } from "../../giveaway-prize.model";
import { SpinWheelCongratsDialogService } from "../spin-wheel-congrats-dialog/spin-wheel-congrats-dialog.service";
import { SpinWheelFormDialogService } from "../spin-wheel-form-dialog/spin-wheel-form-dialog.service";

@Component({
  selector: "app-giveaway-roulette",
  templateUrl: "./roulette.component.html",
  styleUrls: ["./roulette.component.scss"],
})
export class RouletteComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  @Output()
  refresh: EventEmitter<void> = new EventEmitter();

  @Input()
  availablePrizes: GiveawayPrize[];

  @ViewChild("rouletteCanvas", { static: true })
  rouletteCanvas: ElementRef;

  rouletteContainerClass = {};
  rouletteCanvasStyle = {};
  rouletteCanvasClass = {};

  alreadySpinned = false;

  constructor(
    private snackbar: SnackbarUtilService,
    private breakpointObserver: BreakpointObserver,
    private spinWheelFormDialogService: SpinWheelFormDialogService,
    private spinWheelCongratsDialogService: SpinWheelCongratsDialogService,
    private auth: AuthService,
    private router: Router,

    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.prepareRouletteDraw();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  prepareRouletteDraw() {
    const sizeConfig = this.getRouletteSizeConfig();
    const breakpoints = Object.keys(sizeConfig).map(
      (breakpoint) => `(${breakpoint})`
    );

    this.breakpointObserver
      .observe(breakpoints)
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => this.handleRouletteSizeState(state));
  }

  handleRouletteSizeState(breakpointState: BreakpointState) {
    const sizeConfig = this.getRouletteSizeConfig();
    const sizes = Object.values(sizeConfig);

    const rouletteSizeIndex =
      Object.values(breakpointState.breakpoints).filter(
        (value) => value === true
      ).length - 1;

    const rouletteSize = sizes[rouletteSizeIndex];
    this.drawRoulette(rouletteSize, rouletteSizeIndex);
  }

  drawRoulette(size, sizeIndex) {
    this.rouletteContainerClass = {
      [`roulette-size-${sizeIndex + 1}`]: true,
    };

    this.rouletteCanvasClass = ["initial-state"];

    const element = this.rouletteCanvas.nativeElement;

    if (!element.getContext) {
      return;
    }

    element.width = size;
    element.height = size;

    const ctx = element.getContext("2d");

    ctx.clearRect(0, 0, 500, 500);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    this.availablePrizes.forEach((option, i) =>
      this.printOption(element, size, option, i)
    );
  }

  printOption(element, size, option, optionIndex) {
    const ctx = element.getContext("2d");

    const arcAngle = this.getArcAngle(this.availablePrizes.length);
    const startAngle = -Math.PI / 2 - arcAngle / 2;

    const outsideRadius = size / 2 - 5;
    const insideRadius = 0;
    const textRadius = this.getTextRadius(size);

    const angle = startAngle + optionIndex * arcAngle;
    ctx.fillStyle = this.getPartColor(optionIndex);

    ctx.beginPath();
    ctx.arc(size / 2, size / 2, outsideRadius, angle, angle + arcAngle, false);
    ctx.arc(size / 2, size / 2, insideRadius, angle + arcAngle, angle, true);
    ctx.stroke();
    ctx.fill();

    ctx.save();
    ctx.shadowOffsetX = -1;
    ctx.shadowOffsetY = -1;
    ctx.shadowBlur = 5;
    ctx.shadowColor = "rgb(2,2,2, 0.60)";
    ctx.fillStyle = "#E8E8E8";
    ctx.translate(
      size / 2 + Math.cos(angle + arcAngle / 2) * textRadius,
      size / 2 + Math.sin(angle + arcAngle / 2) * textRadius
    );
    ctx.rotate(angle + arcAngle / 2 + Math.PI / 2);

    const text1 = option.text1;
    ctx.font = this.getMinorFontStyle(size);
    ctx.fillText(text1, -ctx.measureText(text1).width / 2, 0);

    ctx.translate(1, 25);

    if (this.isLargerSize(size)) {
      ctx.translate(1, 10);
    }

    const text2 = option.text2;
    ctx.font = this.getMajorFontStyle(size);
    ctx.fillText(text2, -ctx.measureText(text2).width / 2, 0);
    ctx.restore();
  }

  getArcAngle(itensCount) {
    return this.getRouletteAngle() / itensCount;
  }

  getRouletteAngle() {
    return 2 * Math.PI;
  }

  getRouletteSizeConfig() {
    return {
      "min-width: 0px": 280,
      "min-width: 400px": 325,
      "min-width: 500px": 445,
    };
  }

  isLargerSize(size) {
    const sizeConfig = this.getRouletteSizeConfig();
    const sizes = Object.values(sizeConfig);

    return size > sizes[sizes.length - 2];
  }

  getTextRadius(rouletteSize) {
    const sizeConfig = this.getRouletteSizeConfig();
    const sizes = Object.values(sizeConfig);

    if (rouletteSize < sizes[1]) {
      return rouletteSize / 2.1 - 25;
    }

    if (rouletteSize < sizes[2]) {
      return rouletteSize / 2.2 - 25;
    }

    return rouletteSize / 2.25 - 30;
  }

  getMinorFontStyle(rouletteSize) {
    const sizeConfig = this.getRouletteSizeConfig();
    const sizes = Object.values(sizeConfig);

    if (rouletteSize < sizes[1]) {
      return "bold 15px Helvetica, Arial";
    }

    if (rouletteSize < sizes[2]) {
      return "bold 19px Helvetica, Arial";
    }

    return "bold 26px Helvetica, Arial";
  }

  getMajorFontStyle(rouletteSize) {
    const sizeConfig = this.getRouletteSizeConfig();
    const sizes = Object.values(sizeConfig);

    if (rouletteSize < sizes[1]) {
      return "bold 22px Helvetica, Arial";
    }

    if (rouletteSize < sizes[2]) {
      return "bold 25px Helvetica, Arial";
    }

    return "bold 32px Helvetica, Arial";
  }

  getPartColor(number) {
    return number % 2 === 0 ? "rgb(255, 137, 250)" : "rgb(182, 69, 186)";
  }

  spinWheelClick() {
    if (this.alreadySpinned) {
      this.snackbar.showMessage("You already Spinned the Wheel");
      return;
    }

    if (!this.auth.isAuthenticated()) {
      this.snackbar.showMessage("Before Spin the Wheel you must be logged in");
      this.router.navigate(["/sign-in"]);
      return;
    }

    const dialogRef = this.spinWheelFormDialogService.openDialog();

    dialogRef.afterClosed().subscribe((prize: GiveawayPrize) => {
      if (!!prize) {
        this.spinWheel(prize);
        return;
      }

      this.refresh.emit();
    });
  }

  spinWheel(prize: GiveawayPrize) {
    const itensCount = this.availablePrizes.length;
    const itemIndex = this.availablePrizes.findIndex(
      (item) => item.id === prize.id
    );

    if (itemIndex < 0) {
      this.refresh.emit();
      return;
    }

    let positionAngle =
      itemIndex * this.getArcAngle(itensCount) + 4 * this.getRouletteAngle();

    this.alreadySpinned = true;

    this.rouletteCanvasClass = [];

    timer(1000).subscribe(() => this.showSpiningAnimation(positionAngle));

    timer(3500).subscribe(() => this.showCongratsDialog(prize));
  }

  showSpiningAnimation(angle) {
    this.rouletteCanvasStyle = {
      transform: `rotate(${-angle}rad)`,
    };
  }

  showCongratsDialog(prize: GiveawayPrize) {
    this.spinWheelCongratsDialogService.openDialog(prize);
  }
}
