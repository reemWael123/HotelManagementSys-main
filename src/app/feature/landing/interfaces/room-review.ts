export interface RoomReview {
  _id: string;
  room: {
    _id: string;
    roomNumber: string;
  };
  user: {
    _id: string;
    userName: string;
    profileImage: string;
  };
  rating: number;
  review: string;
  createdAt: string;
  updatedAt: string;
}
