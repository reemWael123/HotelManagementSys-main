import { Room } from '../../dashboard/modules/rooms/interfaces/room';

export interface Advertisment {
  isActive: boolean;
  room: Room;
  createdBy: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}
