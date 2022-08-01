import { Injectable } from "@angular/core";
import { Account } from "src/app/model/account";
import { AbstractCrud } from "../abstract/AbstractCrud.service";
import { Observable } from "rxjs";
import { HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AccountsService extends AbstractCrud<Account, string> {
  protected getURI(): string {
    return "accounts";
  }

  findById(id: string): Observable<Account> {
    const params = new HttpParams({ fromObject: { id } });
    params.append("id", id);
    return this.http.get<Account>(`${environment.apiUrl}/accounts/${id}`, {
      params,
    });
  }

  deleteById(id: string): Observable<Account> {
    return this.http.delete<Account>(
      `${environment.apiUrl}/accounts/${id}/delete`
    );
  }

  updateBuyPrice(price: number, id?: string): Observable<Account> {
    return this.http.put<Account>(
      `${environment.apiUrl}/${this.getURI()}/${id}/buy-price`,
      { id, price }
    );
  }

  updateSellPrice(price: number, id?: string): Observable<Account> {
    return this.http.put<Account>(
      `${environment.apiUrl}/${this.getURI()}/${id}/sell-price`,
      { id, price }
    );
  }

  updateAccount(account: Account): Observable<Account> {
    return this.http.put<Account>(
      `${environment.apiUrl}/${this.getURI()}/${account.id}/updateAccount`,
      { account }
    );
  }
}
