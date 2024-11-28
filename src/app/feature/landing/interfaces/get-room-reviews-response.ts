import { RoomReview } from './room-review';

export interface GetRoomReviewsResponse {
  success: boolean;
  message: string;
  data: {
    roomReviews: RoomReview[];
    totalCount: number;
  };
}
