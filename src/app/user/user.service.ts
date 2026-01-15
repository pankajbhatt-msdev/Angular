import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';

import { IUser, IUserCredentials } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: BehaviorSubject<IUser | null>;

  constructor(private http: HttpClient) {
    this.user = new BehaviorSubject<IUser | null>(null);
  }

  getUser(): Observable<IUser | null> {
    return this.user;
  }

  signIn(credentials: IUserCredentials): Observable<IUser> {
    return this.http
      .post<IUser>('https://localhost:7068/api/user', credentials)
      .pipe(map((user: IUser) => {
        this.user.next(user);
        return user;
      }),
      catchError((error: HttpErrorResponse)=>{
        const errorMessage = error?.error || 'Invalid Email Or Password.';
        return throwError(()=>errorMessage);
      }
      ));
  }

  signOut() {
    this.user.next(null);
  }
}
