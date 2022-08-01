import {
  Component,
  OnInit,
  ViewEncapsulation,
  Output,
  EventEmitter,
  ViewChild,
} from "@angular/core";
import { Customer } from "src/app/model/customer";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-firecape-user-details",
  templateUrl: "./firecape-user-info-form.component.html",
  styleUrls: ["./firecape-user-info-form.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class FirecapeUserInfoFormComponent implements OnInit {
  @ViewChild("rsnControl", { static: true })
  rsnControl: FormControl;
  @ViewChild("emailControl", { static: true })
  emailControl: FormControl;
  @ViewChild("noteControl", { static: true })
  noteControl: FormControl;
  @ViewChild("passwordControl", { static: true })
  passwordControl: FormControl;

  rsn: string;
  email: string;
  note: string;
  password: string;

  @Output("onChange") onChangeEventEmitter: EventEmitter<any> =
    new EventEmitter();
  @Output("isValid") isValidEventEmitter: EventEmitter<boolean> =
    new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onFieldChange() {
    this.onChangeEventEmitter.emit({
      details: {
        nickname: this.rsn,
        email: this.email,
        password: this.password,
      },
      note: this.note,
    });
    this.isValidEventEmitter.emit(
      this.emailControl.valid &&
        this.rsnControl.valid &&
        this.passwordControl.valid
    );
  }
}
