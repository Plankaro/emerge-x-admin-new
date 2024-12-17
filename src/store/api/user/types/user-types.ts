export interface ResponseType {
  success: boolean;
  message: string;
}
export interface SessionUser {
  id: string;
  isActive: boolean;
  ip: string;
  browser: string;
  os: string;
  device: string;
  expiryAt: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user: User
}



export interface Image {
  name: string;
  url: string;
}


export interface CreateUserDto {
  email: string;
  phone_number: string;
  password: string;
  otp?: number;
  // firstName: string;
  // lastName: string;
  // username?: string;
  // address?: string;
  // image?: Image;
}




export interface Project {
  id: string;
  projectName: string;
  description: string;
  startDate: Date | string;
  endDate?: Date | string;
  currently_working?: boolean;
  url?: string;
}



export interface Education {
  id: string;
  degree: string;
  major: string;
  institute_name: string;
  start_date: Date | string;
  end_date?: Date | string;
  currently_studying?: boolean;
  percentage?: string;
}

enum JobType {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  INTERNSHIP = "INTERNSHIP",
  CONTRACT = "CONTRACT",
  FREELANCE = "FREELANCE",
}

export interface Experience {
  id?: string;
  companyName: string;
  position: string;
  startDate: Date | string;
  endDate?: Date | string;
  currently_working?: boolean;
  roles_responsibilities: string;
  jobType?: JobType
  companyUrl?: string;
}



export interface SocialHandleProfile {
  platform: string;
  username?: string | null;
  profile_url: string;
}

export interface Certification {
  id: string
  title: string;
  description?: string;
  issuing_organization: string;
  skills?: string[];
  certificate_url?: string;
  duration: duration;
}

type duration = {
  start_date: Date | string;
  end_date?: Date | string;
  is_current?: boolean;
}

export enum RoleType {
  CANDIDATE = "CANDIDATE",
  RECRUITER = "RECRUITER",
  ADMIN = "ADMIN",
}


type FileType = {
  data: any,
  name: string
  url?: string
}


export interface User {
  username?: string;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  phone_number?: string;
  verified?: boolean;
  image?: FileType;
  address?: string;
  bio?: string;
  skills?: string[];
  resume?: FileType | null;
  experience?: Experience[];
  education?: Education[];
  projects?: Project[];
  certification?: Certification[];
  socialHandelProfile?: SocialHandleProfile[];
}




