import { Room } from '../../rooms/interfaces/room';

export interface Ads {
  _id: string;
  isActive: boolean;
  room: Room;
  createdBy?: {
    _id: string;
    userName: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface AddAds {
  room: string;
  discount: number;
  isActive: boolean;
}

