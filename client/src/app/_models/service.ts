import { Photo } from "./photo";

export interface Service {
    id: number;
    name: string;
    price: number;
    description: string;
    photoUrl: string;
    photos: Photo[];
};