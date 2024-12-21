import { getCarAdvertisements, getCarBrands, getPlaces } from '@/api';
import CarAdvertisementList from '@/app/components/CarAdvertisementList';

export default async function Home({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
  const carAdvertisements = await getCarAdvertisements({ params: searchParams });
  const carBrands = await getCarBrands();
  const carPlaces = await getPlaces();

  return (
    <CarAdvertisementList
      carPlaces={carPlaces}
      carAdvertisements={carAdvertisements}
      carBrands={carBrands}
    />
  );
}
