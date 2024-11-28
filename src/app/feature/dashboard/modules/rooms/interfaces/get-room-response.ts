import { Room } from './room';

export interface GetRoomResponse {
  message: string;
  success: boolean;
  data: { room: Room };
}
