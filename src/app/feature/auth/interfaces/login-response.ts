interface User {
  _id: string;
  userName: string;
  role: string;
}

interface AuthData {
  user: User;
  token: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: AuthData;
}
