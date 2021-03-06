import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';

import { Districts, IndiaStates, SState } from './states';
import { Centers } from './centers';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private statesURL = 'https://cdn-api.co-vin.in/api/v2/admin/location/states';
  private districtsURL =
    'https://cdn-api.co-vin.in/api/v2/admin/location/districts';
  private calendarByDistrictURL =
    'https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByDistrict';

  constructor(private http: HttpClient) {}

  /** GET heroes from the server */
  getStates(): Observable<SState[]> {
    return this.http.get<SState[]>(this.statesURL).pipe(
      tap(data => this.log('fetched states'), error => this.log(error)),
      catchError(this.handleError<SState[]>('getStates', []))
    );
  }

  /** GET heroes from the server */
  getIndiaStates(): Observable<IndiaStates> {
    return this.http.get<IndiaStates>(this.statesURL).pipe(
      tap(data => this.log('fetched states'), error => this.log(error))
      // catchError(this.handleError<IndiaStates>('getStates', []))
    );
  }

  getDistrictsById(id: number) {
    const url = `${this.districtsURL}/${id}`;
    return this.http.get<Districts>(url).pipe(
      tap(_ => this.log(`fetched district id=${id}`)),
      catchError(this.handleError<Districts>(`getDistrictsById id=${id}`))
    );
  }

  calendarByDistrict(id: number, date: string) {
    const url = `${this.calendarByDistrictURL}?district_id=${id}&date=${date}`;
    return this.http.get<Centers>(url).pipe(
      retry(2),
      tap(_ => this.log(url)),
      catchError(this.handleError<Centers>(`calendarByDistrict id=${id}`))
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
