import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Member } from './member';


@Injectable({ providedIn: 'root' })
export class MemberService {
    private memberBaseUrl = 'http://localhost:3000/api/member';
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) { }

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.memberBaseUrl)
      .pipe(catchError(this.handleError<Member[]>('getMembers', []))
      );
  }

  getMember(id: number): Observable<Member> {
    const url = `${this.memberBaseUrl}/${id}`;
    return this.http.get<Member>(url)
    .pipe(catchError(this.handleError<Member>(`getMember id=${id}`))
    );
  }

  searchMembers(searchKeyword: string): Observable<Member[]> {
    if (!searchKeyword.trim()) {
      return of([]);
    }
    return this.http.get<Member[]>(`${this.memberBaseUrl}/search?keyword=${searchKeyword}`)
    .pipe(catchError(this.handleError<Member[]>('searchMembers', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
