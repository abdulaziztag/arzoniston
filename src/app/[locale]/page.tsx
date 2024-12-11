import { getCarAdvertisements } from "@/api";
import CarAdvertisementList from "@/app/components/CarAdvertisementList";

export default async function Home() {
  const carAdvertisements = await getCarAdvertisements({});

  return <CarAdvertisementList carAdvertisements={carAdvertisements.results} />;
}