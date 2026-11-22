import { Injectable, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000/api/v1/auth';
  private platformId = inject(PLATFORM_ID);

  currentUser = signal<any>(this.getUser());

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.url}/login`, { email, password }).pipe(
      tap((res: any) => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('user', JSON.stringify(res.user));
        }
        this.currentUser.set(res.user);  
      })
    );
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user');
    }
    this.currentUser.set(null);        
  }

  getUser() {
    if (!isPlatformBrowser(this.platformId)) {
      return null;                    
    }
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }
}