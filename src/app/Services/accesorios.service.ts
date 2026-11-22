import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AccesoriosService {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000/api/v1/accessories';

  getAccesorios(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }
}