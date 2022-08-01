import { Injectable } from "@angular/core";
import { CrudInterface } from "../interface/crud-interface";
import { Increment } from "src/app/model/increment";
import { AbstractCrud } from "../abstract/AbstractCrud.service";
import { Observable } from "rxjs";
import { HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class IncrementService extends AbstractCrud<Increment, string> {
  protected getURI(): string {
    return "increment";
  }

  findById(id: string): Observable<Increment> {
    return this.http.get<Increment>(`${environment.apiUrl}/increment/${id}`);
  }

  updateIncrement(increment: Increment): Observable<Increment> {
    return this.http.put<Increment>(
      `${environment.apiUrl}/${this.getURI()}/id/updateIncrement`,
      { increment }
    );
  }
}
