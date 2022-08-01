import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Giveaway } from "./giveaway.model";
import { AbstractCrud } from "src/app/services/abstract/AbstractCrud.service";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { GiveawayPrize } from "./giveaway-prize.model";

@Injectable({
  providedIn: "root",
})
export class GiveawaysService extends AbstractCrud<Giveaway, string> {
  protected getURI(): string {
    return "giveaways";
  }

  findActiveRound(): Observable<Giveaway> {
    return this.http
      .get<Giveaway>(`${environment.apiUrl}/${this.getURI()}/active-round`)
      .pipe(map((giveaway) => Giveaway.fromJson(giveaway)));
  }

  spinWheel(discordNumber: number): Observable<GiveawayPrize> {
    return this.http.post<GiveawayPrize>(
      `${environment.apiUrl}/${this.getURI()}/active-round/spin-wheel`,
      { discordNumber }
    );
  }
}
