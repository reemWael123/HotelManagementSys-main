import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangePassword } from './../interfaces/change-password';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  constructor(private _http: HttpClient) {}
  changePassword(data: ChangePassword): Observable<any> {
    return this._http.post('portal/users/change-password', data);
  }
}
