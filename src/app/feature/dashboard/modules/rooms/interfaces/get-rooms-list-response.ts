import { Room } from './room';

export interface GetRoomsListResponse {
  success: boolean;
  message: string;
  data: {
    rooms: Room[];
    totalCount: number;
  };
}
