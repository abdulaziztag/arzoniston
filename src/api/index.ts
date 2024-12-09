import { BASE_URL, endpoints } from "@/api/endpoints";
import type {
  CarAdvertisementDetailResponse,
  CarAdvertisementResponse,
} from "@/api/types";
import type { IPagination } from "@/interfaces/common";

export const getCarAdvertisements = async () => {
  try {
    const response = await fetch(BASE_URL + endpoints.carAdvertisements);
    const carAdvertisements = await response.json();
    return carAdvertisements as Promise<IPagination<CarAdvertisementResponse>>;
  } catch (error) {
    throw new Response("Server error", { status: 500 });
  }
};

export const getCarAdvertisementDetail = async (adId: string) => {
  try {
    const response = await fetch(
      BASE_URL + endpoints.advertisementDetail(adId),
    );
    const carAdvertisement = await response.json();
    return carAdvertisement as Promise<CarAdvertisementDetailResponse>;
  } catch (error) {
    throw new Response("Not Found", { status: 404 });
  }
};
