import { getCarAdvertisements, getCarBrands, getPlaces } from '@/api';
import CarAdvertisementList from '@/app/components/CarAdvertisementList';
import { getLocale } from 'next-intl/server';

export default async function Home(props: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const searchParams = await props.searchParams;
  const locale = await getLocale();
  const carAdvertisements = await getCarAdvertisements({ params: searchParams });
  const carBrands = await getCarBrands({
    locale,
  });
  const carPlaces = await getPlaces({
    locale,
  });

  return (
    <CarAdvertisementList
      carPlaces={carPlaces}
      carAdvertisements={carAdvertisements}
      carBrands={carBrands}
    />
  );
}
