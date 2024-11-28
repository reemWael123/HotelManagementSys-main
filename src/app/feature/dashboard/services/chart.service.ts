import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chart } from '../interfaces/chart';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  authBaseUrl = 'admin/dashboard';

  constructor(private _http: HttpClient) {}

  getChartData(): Observable<Chart> {
    return this._http.get<Chart>(this.authBaseUrl);
  }
}
