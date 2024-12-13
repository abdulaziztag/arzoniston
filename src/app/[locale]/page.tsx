import { getCarAdvertisements, getCarBrands } from '@/api';
import CarAdvertisementList from '@/app/components/CarAdvertisementList';

export default async function Home() {
  const carAdvertisements = await getCarAdvertisements({});
  const carBrands = await getCarBrands();

  return (
    <CarAdvertisementList carAdvertisements={carAdvertisements.results} carBrands={carBrands} />
  );
}
