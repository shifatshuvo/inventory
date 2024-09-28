import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, catchError } from 'rxjs';
import { AuthResponse } from '../shared/interfaces/data-type';
import { HttpClient } from '@angular/common/http';

const BASE_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(signUpForm: FormGroup): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${BASE_URL}/auth/sign-up`, signUpForm.getRawValue())
      .pipe(
        catchError((error) => {
          // Handle error here if necessary
          throw error; // Rethrow the error to be handled in the component
        })
      );
  }

  signIn(signInForm: FormGroup): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${BASE_URL}/auth/sign-in`, signInForm.getRawValue());
  }
}