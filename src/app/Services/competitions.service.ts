import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CompetitionsService {
  private http = inject(HttpClient);
  private url = 'https://bluewave-production-d04b6e52.up.railway.apps';

  getCompetitions(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }
}
