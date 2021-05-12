import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { SState } from './states';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private statesURL = 'https://cdn-api.co-vin.in/api/v2/admin/location/states';

  constructor(private http: HttpClient) {}

  /** GET heroes from the server */
  getStates(): Observable<SState[]> {
    return this.http.get<SState[]>(this.statesURL).pipe(
      tap(_ => this.log('fetched states')),
      catchError(this.handleError<SState[]>('getStates', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a StateService message with the MessageService */
  private log(message: string) {
    console.log(`StateService: ${message}`);
  }
}
