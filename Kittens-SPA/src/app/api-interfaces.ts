// TODO: Check if these could be auto-generated

export interface ILogin {
  username?: string;
  password?: string;
}
export interface ILoginResponse {
  token?: string;
  user?: IUser;
}
export interface IUser {
  id: number;
  username: string;
  knownAs: string;
  age: number;
  gender: string;
  created: Date;
  lastActive: Date;
  photoUrl: string;
  city: string;
  country: string;
}
export interface IUserDetailed extends IUser {
  introduction: string;
  interests: string;
  lookingFor: string;
  photos: IPhoto[];
}
export interface IUserUpdate {
  introduction: string;
  interests: string;
  lookingFor: string;
  city: string;
  country: string;
}
export interface IPhoto {
  id: number;
  url: string;
  description: string;
  dateAdded: Date;
  isMain: boolean;
}
