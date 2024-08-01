import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { LoginRequest } from '../models/login-request';
import { catchError, map, Observable, of } from 'rxjs';
import { JwtResponse } from '../models/jwt-response';
import { ErrorResponse } from '../models/error-response';
import { RegisterRequest } from '../models/register-request';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService) { }

  loginUser(loginRequest: LoginRequest): Observable<string[]> {
    return this.apiService.login(loginRequest).pipe(
      map(response => {
        const jwtResponse = response.body as JwtResponse;
        localStorage.setItem('token', jwtResponse.token)
        console.log('ok');
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
        console.log('ok');
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
}
