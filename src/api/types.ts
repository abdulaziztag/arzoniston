import type { ITimestamps } from '@/interfaces/common';

export interface CarAdvertisementResponse extends ITimestamps {
  id: number;
  company_name: string;
  car_model_name: string;
  year: number;
  status: string;
  color_name: string;
  price: string;
  place_name: string;
  engine_type: string;
  transmission: string;
  mileage: number;
  image?: string;
}

export interface CarAdvertisementDetailResponse extends ITimestamps {
  id: number;
  company: {
    id: number;
    name: string;
  };
  car_model: {
    id: number;
    name: string;
    company: {
      id: number;
      name: string;
    };
  };
  year: number;
  engine_type: string;
  drive_type: string;
  transmission: string;
  power: number;
  mileage: number;
  gas_equipment: boolean;
  sunroof: boolean;
  place: {
    id: number;
    name: string;
  };
  price: string;
  phone_number: string;
  color: {
    id: number;
    name: string;
  };
  volume: string;
  is_active: boolean;
  status: string;
  images: {
    id: number;
    image: string;
  }[];
  body_type: string;
  telegram_url: string;
  instagram_url: string;
}

export type CommonName = {
  id: number;
  name: string;
};

export type CarBrandsResponse = Array<CommonName>;

export type CarModelsResponse = Array<CommonName & { company: CommonName }>;

export type PlaceResponse = Array<CommonName>;
