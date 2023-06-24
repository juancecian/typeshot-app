interface Birthday {
  day: number;
  month: number;
  year: number;
}

interface LoginStatus {
  status: boolean;
  token: string;
}
export class UserModel {
  id: string = '';
  name: string = '';
  username: string = '';
  email: string = '';
  avatar: string = '';
  biographyInfo: string = '';
  birthday?: Birthday;
  currentStep = 1;
  emailVerified: boolean = false;
  followers: number = 0;
  following: number = 0;
  isNewbie: boolean = true;
  isOnline: boolean = false;
  loginStatus: LoginStatus = { status: false, token: '' };
}
