import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';  // Import environment file



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl; ;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.checkToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Method to register a new user
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, data);
  }

  // Method to log in a user
  login(data: any): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, data).pipe(
      tap(response => {
        localStorage.setItem('authToken', response.token);
        this.isAuthenticatedSubject.next(true); // Notify subscribers that the user is authenticated
      })
    );
  }

  // Method to log out a user
  logout(): void {
    localStorage.removeItem('authToken');
    this.isAuthenticatedSubject.next(false); // Notify subscribers that the user is logged out
  }

  // Helper function to check if the token exists in localStorage
  private checkToken(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Method to check if the user is currently authenticated
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
