import { RoomFacility } from "./room-facility";

export interface GetRoomFacilitiesResponse {
  success: boolean;
  message: string;
  data: {
    facilities: RoomFacility[];
    totalCount: number;
  };
}
