import { getCarAdvertisements, getCarBrands, getPlaces } from '@/api';
import CarAdvertisementList from '@/app/components/CarAdvertisementList';

export default async function Home() {
  const carAdvertisements = await getCarAdvertisements({});
  const carBrands = await getCarBrands();
  const carPlaces = await getPlaces();

  return (
    <CarAdvertisementList
      carPlaces={carPlaces}
      carAdvertisements={carAdvertisements.results}
      carBrands={carBrands}
    />
  );
}
