import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Noble } from 'src/app/models/noble';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NobleService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Noble[]> {
    const url = `${environment.urlBase}/noble`;
    return this.http.get<Noble[]>(url);
  }

  getById(id: Number): Observable<Noble> {
    const url = `${environment.urlBase}/noble/${id}`;
    return this.http.get<Noble>(url);
  }

  getChildrenById(id: Number): Observable<Noble[]> {
    const url = `${environment.urlBase}/noble/children/${id}`;
    return this.http.get<Noble[]>(url);
  }

  getByGender(gender: String): Observable<Noble[]> {
    const url = `${environment.urlBase}/noble/by-gender/${gender.toLowerCase()}`;
    return this.http.get<Noble[]>(url);
  }

  save(noble: Noble): Observable<Noble> {
    const url = `${environment.urlBase}/noble`;
    return this.http.post<Noble>(url, noble);
  }

  update(noble: Noble): Observable<Noble> {
    const url = `${environment.urlBase}/noble/${noble.id}`;
    return this.http.put<Noble>(url, noble);
  }

  delete(id: Number): Observable<Noble> {
    const url = `${environment.urlBase}/noble/${id}`;
    return this.http.delete<Noble>(url);
  }

  getKinships(from: Number, to: Number): Observable<string[]> {
    const url = `${environment.urlBase}/noble/kinship/${from}/${to}`;
    return this.http.get<string[]>(url);
  }



}
