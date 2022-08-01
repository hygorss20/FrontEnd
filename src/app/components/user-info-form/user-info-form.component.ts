import {
  Component,
  OnInit,
  ViewEncapsulation,
  Output,
  EventEmitter,
  ViewChild,
  Input,
} from "@angular/core";
import { Customer } from "src/app/model/customer";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-user-details",
  templateUrl: "./user-info-form.component.html",
  styleUrls: ["./user-info-form.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class UserInfoFormComponent implements OnInit {
  @ViewChild("rsnControl", { static: true })
  rsnControl: FormControl;
  @ViewChild("emailControl", { static: true })
  emailControl: FormControl;
  @ViewChild("noteControl", { static: true })
  noteControl: FormControl;

  rsn: string;
  email: string;
  note: string;

  @Input()
  userGameNameLabel: string;

  @Output("onChange") onChangeEventEmitter: EventEmitter<any> =
    new EventEmitter();
  @Output("isValid") isValidEventEmitter: EventEmitter<boolean> =
    new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onFieldChange() {
    this.onChangeEventEmitter.emit({
      details: { nickname: this.rsn, email: this.email },
      note: this.note,
    });
    this.isValidEventEmitter.emit(
      this.emailControl.valid && this.rsnControl.valid
    );
  }
}
