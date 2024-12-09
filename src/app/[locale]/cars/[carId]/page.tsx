import {getCarAdvertisementDetail} from "@/api";
import {CarAdvertisementDetails} from "@/app/components/CarAdvertisementDetails";

export default async function Page(
  {
    params,
  }: {
    params: Promise<{ carId: string }>
  }) {
  const {carId} = await params
  const carAdvertisement = await getCarAdvertisementDetail(carId);

  return <CarAdvertisementDetails carAdvertisement={carAdvertisement}/>;
}