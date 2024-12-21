import { endpoints } from '@/api/endpoints';
import {
  CarAdvertisementDetailResponse,
  CarAdvertisementResponse,
  CarBrandsResponse,
  CarModelsResponse,
} from '@/api/types';
import { fetchServer } from '@/api/fetchServer';

export const getCarAdvertisements = async ({
  params,
  locale,
}: {
  params?: Record<string, string | undefined>;
  locale?: string;
}) => {
  try {
    const response = await fetchServer(endpoints.carAdvertisements, {
      params,
      locale,
    });
    return response.results as Promise<CarAdvertisementResponse[]>;
  } catch (error) {
    console.error(error);
    throw new Response('Server error', { status: 500 });
  }
};

export const getCarAdvertisementDetail = async (
  adId: string,
  {
    locale,
  }: {
    locale?: string;
  },
) => {
  try {
    const response = await fetchServer(endpoints.advertisementDetail(adId), {
      locale,
    });
    return response as Promise<CarAdvertisementDetailResponse>;
  } catch (error) {
    console.error(error);
    throw new Response('Not Found', { status: 404 });
  }
};

export const getCarModels = async (
  company_id: string | undefined,
  {
    locale,
  }: {
    locale?: string;
  },
) => {
  try {
    const response = await fetchServer(endpoints.carModels, {
      params: { company_id },
      locale,
    });
    return response as Promise<CarModelsResponse>;
  } catch (error) {
    console.error(error);
    throw new Response('Server error', { status: 500 });
  }
};

export const getCarBrands = async ({ locale }: { locale?: string }) => {
  try {
    const response = await fetchServer(endpoints.carBrands, {
      locale,
    });
    return response as Promise<CarBrandsResponse>;
  } catch (error) {
    console.error(error);
    throw new Response('Server error', { status: 500 });
  }
};

export const getPlaces = async ({ locale }: { locale?: string }) => {
  try {
    const response = await fetchServer(endpoints.places, {
      locale,
    });
    return response as Promise<CarBrandsResponse>;
  } catch (error) {
    console.error(error);
    throw new Response('Server error', { status: 500 });
  }
};
