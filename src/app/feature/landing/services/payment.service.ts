import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  baseUrl = 'portal/booking';
  id: string;
  price: number;
  
  constructor(private _http: HttpClient) {}

  createBooking(data: any): Observable<any> {
    return this._http.post(this.baseUrl, data);
  }
  payment(tokenId: string): Observable<any> {
    return this._http.post(`${this.baseUrl}/${this.id}/pay`, {
      token: tokenId,
    });
  }
}
