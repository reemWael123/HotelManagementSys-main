import { RoomComment } from "./room-comment";

export interface GetRoomsCommentsResponse {
  success: boolean;
  message: string;
  data: {
    roomComments: RoomComment[];
    totalCount: number;
  };
}