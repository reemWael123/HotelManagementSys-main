export interface AddReviewResponse {
  success: boolean;
  message: string;
  data: {
    roomReview: {
      room: string;
      user: string;
      rating: number;
      review: string;
      _id: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}
