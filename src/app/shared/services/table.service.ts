import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  constructor() {}

  getColumnAvatars(rowImages: string | Array<any>): any {
    if (typeof rowImages == 'string') {
      return [rowImages];
    }

    return rowImages;
  }
}
