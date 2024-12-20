import { endpoints } from '@/api/endpoints';
import {
  CarAdvertisementDetailResponse,
  CarAdvertisementResponse,
  CarBrandsResponse,
  CarModelsResponse,
} from '@/api/types';
import type { IPagination } from '@/interfaces/common';
import { fetchServer } from '@/api/fetchServer';

export type GetCarAdsParams = {
  body_type?: string;
};

export const getCarAdvertisements = async ({ params }: { params?: GetCarAdsParams }) => {
  try {
    const response = await fetchServer(endpoints.carAdvertisements, {
      params,
    });
    return response as Promise<IPagination<CarAdvertisementResponse>>;
  } catch (error) {
    console.error(error);
    throw new Response('Server error', { status: 500 });
  }
};

export const getCarAdvertisementDetail = async (adId: string) => {
  try {
    const response = await fetchServer(endpoints.advertisementDetail(adId));
    return response as Promise<CarAdvertisementDetailResponse>;
  } catch (error) {
    console.error(error);
    throw new Response('Not Found', { status: 404 });
  }
};

export const getCarModels = async () => {
  try {
    const response = await fetchServer(endpoints.carModels);
    return response as Promise<CarModelsResponse>;
  } catch (error) {
    console.error(error);
    throw new Response('Server error', { status: 500 });
  }
};

export const getCarBrands = async () => {
  try {
    const response = await fetchServer(endpoints.carBrands);
    return response as Promise<CarBrandsResponse>;
  } catch (error) {
    console.error(error);
    throw new Response('Server error', { status: 500 });
  }
};

export const getPlaces = async () => {
  try {
    const response = await fetchServer(endpoints.places);
    return response as Promise<CarBrandsResponse>;
  } catch (error) {
    console.error(error);
    throw new Response('Server error', { status: 500 });
  }
};
