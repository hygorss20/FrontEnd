import { Injectable } from "@angular/core";
import * as CryptoJS from "crypto-js";

@Injectable({
  providedIn: "root",
})
export class EncryptUtilService {
  constructor() {}

  encrypt(message: string): string {
    return CryptoJS.AES.encrypt(message, "KSAMw23ek2&&*@*#s").toString();
  }

  decrypt(encrypted: string): string {
    var bytes = CryptoJS.AES.decrypt(encrypted, "KSAMw23ek2&&*@*#s");
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
