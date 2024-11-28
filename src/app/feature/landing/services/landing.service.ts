import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GetAds } from '../interfaces/get-ads';
import { GetRoomsListResponse } from '../../dashboard/modules/rooms/interfaces/get-rooms-list-response';
import { GetRoomReviewsResponse } from '../interfaces/get-room-reviews-response';
import { AddReview } from '../interfaces/add-review';
import { AddReviewResponse } from '../interfaces/add-review-response';
import { GetRoomsCommentsResponse } from '../interfaces/get-room-comments-response';
import { AddComment } from '../interfaces/add-comment';
import { AddCommentResponse } from '../interfaces/add-comment-response';
import { Params } from '@angular/router';
import { RoomComment } from '../interfaces/room-comment';

@Injectable({
  providedIn: 'root',
})
export class LandingService {
  adsBaseUrl = 'portal/ads';
  roomBaseUrl = 'portal/rooms';

  constructor(private _http: HttpClient) {}

  getRandomData(data: any[], count = 5) {
    const shuffled = data.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  getAds(): Observable<GetAds> {
    return this._http.get<GetAds>('portal/ads');
  }

  getRoomsList(pageNumber: number): Observable<GetRoomsListResponse> {
    return this._http.get<GetRoomsListResponse>(
      'portal/rooms/available?page=' + pageNumber + '&size=5'
    );
  }
  getFavouriteRooms(myParams: Params): Observable<any> {
    return this._http.get('portal/favorite-rooms', { params: myParams });
  }

  addToFavourites(id: string): Observable<any> {
    return this._http.post('portal/favorite-rooms', { roomId: id });
  }

  deleteFromFavourites(id: string): Observable<any> {
    return this._http.delete(`portal/favorite-rooms/${id}`, {
      body: { roomId: id },
    });
  }

  Pagination(first: number, rows: number): Observable<any> {
    const pageIndex = first / rows;
    return this._http.get(
      `portal/favorite-rooms?page=${pageIndex + 1}&size=${rows}`
    );
  }

  getAdsDetails(id: string) {
    return this._http.get(this.adsBaseUrl + '/' + id);
  }

  getRoomDetails(id: string) {
    return this._http.get(this.roomBaseUrl + '/' + id);
  }

  getReviews(roomId: string): Observable<GetRoomReviewsResponse> {
    return this._http.get<GetRoomReviewsResponse>(
      'portal/room-reviews/' + roomId
    );
  }

  addReview(review: AddReview): Observable<AddReviewResponse> {
    return this._http.post<AddReviewResponse>('portal/room-reviews', review);
  }

  getComments(roomId: string): Observable<GetRoomsCommentsResponse> {
    return this._http.get<GetRoomsCommentsResponse>(
      'portal/room-comments/' + roomId
    );
  }

  addComment(comment: AddComment): Observable<AddCommentResponse> {
    return this._http.post<AddCommentResponse>('portal/room-comments', comment);
  }

  updateComment(
    commentId: string | boolean,
    comment: string
  ): Observable<AddCommentResponse> {
    return this._http.patch<AddCommentResponse>(
      'portal/room-comments/' + commentId,
      {
        comment: comment,
      }
    );
  }

  deleteComment(comment: RoomComment): Observable<any> {
    return this._http.delete<any>('portal/room-comments/' + comment._id, {
      body: { roomId: comment.room._id },
    });
  }

  getRoomsExplore(
    pageNumber: number,
    rows: number
  ): Observable<GetRoomsListResponse> {
    return this._http.get<GetRoomsListResponse>(
      'portal/rooms/available?page=' + pageNumber + '&size=' + rows
    );
  }

  getRoomsExploreFilter(myParams: Params): Observable<GetRoomsListResponse> {
    return this._http.get<GetRoomsListResponse>('portal/rooms/available', {
      params: myParams,
    });
  }
}
