"use client";

import { Flex, Card, Image } from "@chakra-ui/react";
import {CarAdvertisementResponse} from "@/api/types";
import {useTranslations} from "next-intl";
import {useRouter} from "@/i18n/routing";
import {Dayjs} from 'dayjs'
import {formatTimeDifference} from "@/helpers/dateDiff";

export default function CarAdvertisementList({ carAdvertisements }: {carAdvertisements: CarAdvertisementResponse[]}) {
  const router = useRouter()
  const t = useTranslations();

  return (
    <Flex direction="column" gap="2">
      {carAdvertisements.map((ad) => (
        <Card.Root
          onClick={() => router.push("/cars/" + ad.id)}
          key={ad.id}
          className="hover:cursor-pointer hover:shadow-2xl hover:shadow-amber-900 transition-shadow"
        >
          <Card.Header>
            <Card.Title>
              {ad.company_name} {ad.car_model_name}, {ad.year}
            </Card.Title>
            <Card.Description fontWeight="bold">${ad.price}</Card.Description>
          </Card.Header>
          <Card.Body>
            <Flex className="overflow-auto gap-x-2 rounded-lg pb-4">
              {ad.image && (
                <Image
                  key={ad.image}
                  height={52}
                  className="aspect-video rounded-lg border-2 border-solid border-white dark:border-gray-800"
                  src={ad.image}
                  alt={`${ad.company_name} ${ad.car_model_name}`}
                />
              )}
            </Flex>
            <Flex gap="2" wrap="wrap" className="&[span]:capitalize">
              <span>{ad.mileage} km</span> ·
              <span>{ad.engine_type}</span> ·
              <span>{ad.transmission}</span> ·
              <span>{ad.color_name}</span>
            </Flex>
            <Flex>
              <span className="text-sm text-gray-400">
                {ad.place_name},{' '}
                {formatTimeDifference(ad.created).diff}{' '}
                {t(formatTimeDifference(ad.created).key)}{' '}
                {t('ago')}</span>
            </Flex>
          </Card.Body>
        </Card.Root>
      ))}
    </Flex>
  );
}