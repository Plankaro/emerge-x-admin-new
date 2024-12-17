
export interface SignInAPI {
    message: string;
    user: {
      _id: string;
      name: string;
      email: string;
      role: string;
      token: string;
    };
    error?: string; 
  }
  

export interface SessionType {
    id: string;
    isActive: boolean;
    ip: string;
    browser: string;
    os: string;
    device: string;
    expiryAt: string;
    role: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    user: UserType;
}

export interface UserType {
    id: string;
    isTrash: boolean;
    username: string | null;
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    role: string;
    verified: boolean;
    balance: number;
    address: string;
    createdAt: string;
    updatedAt: string;
};