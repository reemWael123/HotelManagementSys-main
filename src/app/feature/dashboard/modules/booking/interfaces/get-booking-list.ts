import { Booking } from './booking';

export interface GetBookingList {
  success: boolean;
  message: string;
  data: {
    booking: Booking[];
    totalCount: number;
  };
}
