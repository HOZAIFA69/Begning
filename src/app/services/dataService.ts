import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';

export abstract class DataService<T> {

  constructor(protected httpClient: HttpClient,protected apiUrl: string) { }

  getAll(): Observable<T[]> {
    return this.httpClient.get<T[]>(`${this.apiUrl}`).pipe(
      catchError(err => throwError(err)
      ));
  }

  getById(id: any): Observable<T> {
    return this.httpClient.get<T>(`${this.apiUrl}/${id}`);
  }

  create(resource: T): Observable<T> {
    return this.httpClient.post<T>(`${this.apiUrl}`, resource);
  }

  update(resource): Observable<T> {
    return this.httpClient.put<T>(`${this.apiUrl}/${resource.id}`, resource);
  }

  delete(id: any): Observable<unknown> {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
}

