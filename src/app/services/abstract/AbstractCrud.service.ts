import { CrudInterface } from "../interface/crud-interface";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

export abstract class AbstractCrud<T, ID> implements CrudInterface<T, ID> {
  constructor(protected http: HttpClient) {}

  protected abstract getURI(): string;

  save(value: T, id?: ID): Observable<T> {
    if (id) {
      return this.http.put<T>(
        `${environment.apiUrl}/${this.getURI()}/${id}`,
        value
      );
    } else {
      return this.http.post<T>(`${environment.apiUrl}/${this.getURI()}`, value);
    }
  }

  findById(id: string | ID): Observable<T> {
    return this.http.get<T>(`${environment.apiUrl}/${this.getURI()}/${id}`);
  }

  findAll(): Observable<T[]> {
    return this.http.get<T[]>(`${environment.apiUrl}/${this.getURI()}`);
  }

  delete(id: string | ID): Observable<T> {
    throw new Error("Method not implemented.");
  }
}
