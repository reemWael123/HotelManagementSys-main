interface BookingStatus {
  pending: number;
  completed: number;
}

interface UserCounts {
  user: number;
  admin: number;
}

interface Data {
  rooms: number;
  facilities: number;
  bookings: BookingStatus;
  ads: number;
  users: UserCounts;
}

export interface Chart {
  success: boolean;
  message: string;
  data: Data;
}
