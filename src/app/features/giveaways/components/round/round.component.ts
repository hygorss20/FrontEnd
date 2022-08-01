import { isPlatformBrowser } from "@angular/common";
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
} from "@angular/core";
import { Subject, timer } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Giveaway } from "../../giveaway.model";

@Component({
  selector: "app-giveaway-round",
  templateUrl: "./round.component.html",
  styleUrls: ["./round.component.scss"],
})
export class RoundComponent implements OnInit, OnChanges, OnDestroy {
  private destroy$ = new Subject<void>();

  timeLeft;

  @Output()
  refresh: EventEmitter<void> = new EventEmitter();

  @Input() activeRound: Giveaway;
  round: Giveaway;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    timer(1, 1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(this.updateTimeLeft.bind(this));
  }

  ngOnChanges() {
    if (!this.activeRound) {
      return;
    }

    this.round = this.activeRound;
    this.updateTimeLeft();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  updateTimeLeft() {
    if (!this.activeRound) {
      this.round = null;
      return;
    }

    const diff = this.activeRound.endTime.getTime() - new Date().getTime();

    if (diff <= 0) {
      this.round = null;
    }

    const diffSeconds = Math.floor(diff / 1000);

    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);

    this.timeLeft = {
      seconds: diffSeconds % 60,
      minutes: diffMinutes % 60,
      hours: diffHours,
    };
  }

  refreshRound() {
    this.refresh.emit();
  }
}
