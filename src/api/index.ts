import { endpoints } from "@/api/endpoints";
import type {
  CarAdvertisementDetailResponse,
  CarAdvertisementResponse,
} from "@/api/types";
import type { IPagination } from "@/interfaces/common";
import {fetchServer} from "@/api/fetchServer";

export type GetCarAdsParams = {
  body_type?: string;
}

export const getCarAdvertisements = async ({params}: {params?: GetCarAdsParams}) => {
  try {
    const response = await fetchServer(endpoints.carAdvertisements, {
      params,
    });
    return response as Promise<IPagination<CarAdvertisementResponse>>;
  } catch (error) {
    console.error(error);
    throw new Response("Server error", { status: 500 });
  }
};

export const getCarAdvertisementDetail = async (adId: string) => {
  try {
    const response = await fetchServer(endpoints.advertisementDetail(adId));
    return response as Promise<CarAdvertisementDetailResponse>;
  } catch (error) {
    console.error(error);
    throw new Response("Not Found", { status: 404 });
  }
};
