import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User, LoginCredentials } from '../../models/user.interface';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.apiBaseUrl}/auth`;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private currentUser: User | null = null;

  constructor(private router: Router, private http: HttpClient) {
    // Check if user was previously logged in
    this.initializeAuthState();
  }

  private initializeAuthState(): void {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');

    if (token && userData) {
      try {
        this.currentUser = JSON.parse(userData);
        // Validate token is not expired (basic check)
        if (this.isTokenValid(token)) {
          this.isAuthenticatedSubject.next(true);
        } else {
          // Token expired, clear storage
          this.clearAuthData();
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        this.clearAuthData();
      }
    }
  }

  private isTokenValid(token: string): boolean {
    try {
      // Basic JWT structure validation
      const parts = token.split('.');
      if (parts.length !== 3) return false;

      // Decode payload to check expiration
      const payload = JSON.parse(atob(parts[1]));
      const currentTime = Math.floor(Date.now() / 1000);

      // Check if token has exp field and is not expired
      return payload.exp ? payload.exp > currentTime : true;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  }

  private clearAuthData(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    this.currentUser = null;
    this.isAuthenticatedSubject.next(false);
  }

  login(credentialsOrEmail: LoginCredentials | string, password?: string): Observable<any> {
    let loginData: LoginCredentials;

    if (typeof credentialsOrEmail === 'string') {
      loginData = { email: credentialsOrEmail, password: password! };
    } else {
      loginData = credentialsOrEmail;
    }

    return this.http.post<any>(`${this.baseUrl}/demo/login`, loginData).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('userData', JSON.stringify(response.user || {}));
          this.currentUser = response.user || { id: '1', username: loginData.email.split('@')[0], email: loginData.email };
          this.isAuthenticatedSubject.next(true);
          this.router.navigate(['/dashboard']);
        }
      }),
      catchError(error => {
        console.error('Login error:', error);
        return of({ success: false, message: error.error?.message || 'Login failed' });
      })
    );
  }

  register(userData: { email: string; password: string; role: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/demo/register`, userData).pipe(
      catchError(error => {
        console.error('Registration error:', error);
        return of({ success: false, message: error.error?.message || 'Registration failed' });
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    this.currentUser = null;
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  checkAuthAndRedirect(): void {
    if (!this.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  // Method to redirect already logged-in users away from login/signup
  redirectIfLoggedIn(): void {
    if (this.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }
}


