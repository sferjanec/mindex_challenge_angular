import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {forkJoin, from, Observable, throwError} from 'rxjs';
import {catchError, flatMap} from 'rxjs/operators';

import {Employee} from '../models/employee';

@Injectable()
export class EmployeeService {
  private url = '/api/employees';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Employee> {
    return this.http.get<Employee[]>(this.url)
      .pipe(
        flatMap(emps => from(emps)),
        catchError(this.handleError)
      );
  }

  getAllById(ids: number[]): Observable<Employee[]> {
    //return employees by ID. Operates on all concurrently.
    return forkJoin(ids.map(id => this.get(id)));
  }

  get(id: number): Observable<Employee> {
    console.log('get called');
    console.log('with employee:', )
    console.log('url: ', this.url + '/'+id);
    return this.http.get<Employee>(`${this.url}/${id}`)
      .pipe(catchError(this.handleError));
  }

  save(emp: Employee): Observable<Employee> {
    const response = (!!emp.id) ? this.put(emp) : this.post(emp);
    return response.pipe(catchError(this.handleError));
  }

  remove(emp: Employee): Observable<never> {
    return this.http
      .delete<never>(`${this.url}/${emp.id}`)
      .pipe(catchError(this.handleError));
  }

  private post(emp: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.url, emp);
  }

  private put(emp: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.url}/${emp.id}`, emp);
  }

  private handleError(res: HttpErrorResponse | any): Observable<never> {
    return throwError(res.error || 'Server error');
  }
}
