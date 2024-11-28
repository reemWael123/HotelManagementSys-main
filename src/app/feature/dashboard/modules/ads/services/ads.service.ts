import { Injectable } from '@angular/core';
import { TableColumn } from 'src/app/shared/interfaces/table-column';
import { AdsResponse } from '../interfaces/ads-response';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddAds } from '../interfaces/ads';

@Injectable({
  providedIn: 'root',
})
export class AdsService {
  adsBaseUrl = 'admin/ads';

  constructor(private _http: HttpClient) {}

  get tableColumns(): TableColumn[] {
    return [
      {
        type: 'object',
        header: 'Room Name',
        field: 'room',
        objectKey: 'roomNumber',
      },
      {
        type: 'object',
        header: 'Price',
        field: 'room',
        objectKey: 'price',
      },
      {
        type: 'object',
        header: 'Discount',
        field: 'room',
        objectKey: 'discount',
      },
      {
        type: 'object',
        header: 'Capacity',
        field: 'room',
        objectKey: 'capacity',
      },
      {
        type: 'text',
        header: 'Active',
        field: 'isActive',
      },
      {
        type: 'object',
        header: 'Created By',
        field: 'createdBy',
        objectKey: 'userName',
      },
      {
        type: 'date',
        header: 'Created At',
        field: 'createdAt',
        format: 'dd/mm/yyyy',
      },
      {
        type: 'actions',
        header: 'Actions',
        field: 'actions',
        actions: {
          isView: true,
          isEdit: true,
          isDelete: true,
        },
        isFrozen: true,
        frozenDirection: 'right',
      },
    ];
  }

  // HTTP Requests
  getAds(): Observable<AdsResponse> {
    return this._http.get<AdsResponse>(this.adsBaseUrl);
  }

  addAds(data: AddAds): Observable<AddAds> {
    return this._http.post<AddAds>(this.adsBaseUrl, data);
  }

  editAds(data: AddAds, adsId: string): Observable<any> {
    return this._http.put(this.adsBaseUrl + '/' + adsId, data);
  }

  deleteAds(adsId: string): Observable<any> {
    return this._http.delete(this.adsBaseUrl + '/' + adsId);
  }
}
