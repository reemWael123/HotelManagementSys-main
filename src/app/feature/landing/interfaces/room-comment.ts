export interface RoomComment {
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
  comment: string;
  createdAt: string;
  updatedAt: string;
}
