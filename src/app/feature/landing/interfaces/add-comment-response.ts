export interface AddCommentResponse {
  success: boolean;
  message: string;
  data: {
    roomComment: {
      room: string;
      user: string;
      comment: string;
      _id: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}