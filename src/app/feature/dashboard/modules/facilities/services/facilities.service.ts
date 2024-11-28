import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TableColumn } from 'src/app/shared/interfaces/table-column';
import { GetFacilitiesResponse } from '../interfaces/get-facilities-response';

@Injectable({
  providedIn: 'root',
})
export class FacilitiesService {
  facilitiesBaseUrl = 'admin/room-facilities';

  constructor(private _http: HttpClient) {}

  // Handle facilities table
  get tableColumns(): TableColumn[] {
    return [
      {
        type: 'text',
        header: 'Name',
        field: 'name',
      },
      {
        type: 'object',
        header: 'Created by',
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
          isView: false,
          isEdit: true,
          isDelete: true,
        },
        isFrozen: true,
        frozenDirection: 'right',
      },
    ];
  }

  // HTTP Requests
  getFacilities(): Observable<GetFacilitiesResponse> {
    return this._http.get<GetFacilitiesResponse>(this.facilitiesBaseUrl);
  }

  addFacility(name: string): Observable<any> {
    return this._http.post(this.facilitiesBaseUrl, { name });
  }

  editFacility(name: string, facilityId: string): Observable<any> {
    return this._http.put(this.facilitiesBaseUrl + '/' + facilityId, { name });
  }

  deleteFacility(facilityId: string): Observable<any> {
    return this._http.delete(this.facilitiesBaseUrl + '/' + facilityId);
  }
}
