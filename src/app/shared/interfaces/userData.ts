export interface UserData {
  success: boolean;
  message: string;
  data: {
    user: {
      _id: string;
      userName: string;
      email: string;
      phoneNumber: number;
      country: string;
      role: string;
      profileImage: string;
      verified: boolean;
      createdAt: string;
      updatedAt: string;
    };
  };
}
