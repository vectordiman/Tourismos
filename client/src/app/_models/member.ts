import {Photo} from "./photo";

export interface Member {
  id: number;
  username: string;
  photoUrl: string;
  email: string;
  phoneNumber: string;
  name: string;
  lastName: string;
  created: Date;
  lastActive: Date;
  photos: Photo[];
}
