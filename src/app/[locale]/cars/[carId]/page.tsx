import { getCarAdvertisementDetail } from '@/api';
import { CarAdvertisementDetails } from '@/app/components/CarAdvertisementDetails';
import { getLocale } from 'next-intl/server';

export default async function Page({ params }: { params: Promise<{ carId: string }> }) {
  const { carId } = await params;
  const locale = await getLocale();
  const carAdvertisement = await getCarAdvertisementDetail(carId, {
    locale,
  });

  return <CarAdvertisementDetails carAdvertisement={carAdvertisement} />;
}
