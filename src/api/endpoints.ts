import process from "node:process";

export const BASE_URL = process.env.API_URL;

export const endpoints = {
  carAdvertisements: `/car/car-advertisements/`,
  advertisementDetail: (adId: string) => `/car/car-advertisements/${adId}/`,
  carBrands: '/car/companies/',
  carModels: '/car/car-models/',
};