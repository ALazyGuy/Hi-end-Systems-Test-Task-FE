import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { LoginRequest } from '../models/login-request';
import { BehaviorSubject, catchError, map, Observable, of, switchMap } from 'rxjs';
import { JwtResponse } from '../models/jwt-response';
import { ErrorResponse } from '../models/error-response';
import { RegisterRequest } from '../models/register-request';
import { UserInfo } from '../models/user-info';
import { HttpResponse } from '@angular/common/http';
import { AccountActionType } from '../models/account-action';
import { ChangeStatusRequest } from '../models/change-status-request';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userInfo$: BehaviorSubject<UserInfo | null> 
    = new BehaviorSubject<UserInfo | null>(null);
  private allUsersInfo$: BehaviorSubject<UserInfo[]>
    = new BehaviorSubject([] as UserInfo[]);

  constructor(private apiService: ApiService) { }

  loginUser(loginRequest: LoginRequest): Observable<string[]> {
    return this.apiService.login(loginRequest).pipe(
      map(response => {
        const jwtResponse = response.body as JwtResponse;
        localStorage.setItem('token', jwtResponse.token);
        return [''];
      }),
      catchError(response => {
        if (response.status === 302) {
          return of(['Invalid username or password']);
        }

        const errors = response.error as ErrorResponse;
        return of(errors.message as string[]);
      })
    );
  }

  registerUser(registerRequest: RegisterRequest): Observable<string[]> {
    return this.apiService.register(registerRequest).pipe(
      map(response => {
        const jwtResponse = response.body as JwtResponse;
        localStorage.setItem('token', jwtResponse.token)
        return [''];
      }),
      catchError(response => {
        if (response.status === 302) {
          return of(['Username is already taken']);
        }

        const errors = response.error as ErrorResponse;
        return of(errors.message as string[]);
      })
    );
  }

  loadUserInfo(): Observable<boolean> {
    return this.apiService.loadUserInfo().pipe(
      map(response => {
        this.userInfo$.next(response);
        return true;
      }),
      catchError(error => {
        localStorage.removeItem('token');
        this.userInfo$.next(null);
        return of(false);
      })
    );
  }

  getUserInfo$(): BehaviorSubject<UserInfo | null> {
    return this.userInfo$;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.userInfo$.next(null);
  }

  doAccountAction(type: AccountActionType, amount: number): void {
    this.apiService.doAccountAction({type: type, amount: amount}).pipe(
      switchMap(() => this.loadUserInfo())
    ).subscribe();
  }

  loadAllUsersInfo(): void {
    this.apiService.getAllUsersInfo().subscribe({
      next: value => this.allUsersInfo$.next(value)
    });
  }

  getAllUsersInfo$(): BehaviorSubject<UserInfo[]> {
    return this.allUsersInfo$;
  }

  changeAccountStatus(body: ChangeStatusRequest) {
    this.apiService.changeAccountStatus(body).subscribe({
      next: () => this.loadAllUsersInfo()
    });
  }

}
