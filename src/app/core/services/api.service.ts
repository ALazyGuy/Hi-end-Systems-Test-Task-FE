import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/login-request';
import { JwtResponse } from '../models/jwt-response';
import { ErrorResponse } from '../models/error-response';
import { RegisterRequest } from '../models/register-request';
import { UserInfo } from '../models/user-info';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient){}

  login(loginRequest: LoginRequest): Observable<HttpResponse<JwtResponse | ErrorResponse>> {
    return this.http.post<JwtResponse | ErrorResponse>(
      'auth/login', loginRequest, {observe: 'response'});
  }

  register(registerRequest: RegisterRequest): Observable<HttpResponse<JwtResponse | ErrorResponse>> {
    return this.http.post<JwtResponse | ErrorResponse>(
      'auth/register', registerRequest, {observe: 'response'});
  }

  loadUserInfo(): Observable<UserInfo> {
    return this.http.get<UserInfo>('user/current');
  }
}
