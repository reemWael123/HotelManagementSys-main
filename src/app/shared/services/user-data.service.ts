import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserData } from '../interfaces/userData';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  authBaseUrl = 'portal/users/';

  token: string | null = localStorage.getItem('userToken');
  decoded: any;
  role: string;
  id: string;
  constructor(private _http: HttpClient) {
    if (this.token) {
      try {
        this.decoded = jwtDecode(this.token);
        this.role = this.decoded.role;
        this.id = this.decoded._id;
      } catch (error) {
        this.decoded = null;
      }
    }
  }

  getProfile(id: string): Observable<UserData> {
    return this._http.get<UserData>(`${this.authBaseUrl}${id}`);
  }
}
