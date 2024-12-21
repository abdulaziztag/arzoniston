import { endpoints } from '@/api/endpoints';
import {
  CarAdvertisementDetailResponse,
  CarAdvertisementResponse,
  CarBrandsResponse,
  CarModelsResponse,
} from '@/api/types';
import type { IPagination } from '@/interfaces/common';
import { fetchServer } from '@/api/fetchServer';

export const getCarAdvertisements = async ({
  params,
}: {
  params?: Record<string, string | undefined>;
}) => {
  try {
    const response = await fetchServer(endpoints.carAdvertisements, {
      params,
    });
    return response.results as Promise<CarAdvertisementResponse[]>;
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

export const getCarModels = async (company_id: string | undefined) => {
  try {
    const response = await fetchServer(endpoints.carModels, {
      params: { company_id },
    });
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
