import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { Country } from 'src/app/models/country';


@Injectable({
  providedIn: 'root'
})
export class CountryService {
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Country[]> {
    const url = `${environment.urlBase}/country`;
    return this.http.get<Country[]>(url);
  }

  getById(id: Number): Observable<Country> {
    const url = `${environment.urlBase}/country/${id}`;
    return this.http.get<Country>(url);
  }

  save(country: Country): Observable<Country> {
    const url = `${environment.urlBase}/country`;
    return this.http.post<Country>(url, country);
  }

  update(country: Country): Observable<Country> {
    const url = `${environment.urlBase}/country/${country.id}`;
    return this.http.put<Country>(url, country);
  }

  delete(id: Number): Observable<Country> {
    const url = `${environment.urlBase}/country/${id}`;
    return this.http.delete<Country>(url);
  }


}
