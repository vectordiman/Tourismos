import { Photo } from "./photo";

export interface TourPackage {
    id: number;
    name: string;
    price: number;
    photoUrl: string;
    start: Date;
    end: Date;
    description: string;
    country: string;
    photos: Photo[];
  }