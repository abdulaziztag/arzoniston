"use client";

import {Flex, Card, Image, Heading} from "@chakra-ui/react";
import {CarAdvertisementResponse} from "@/api/types";
import {useTranslations} from "next-intl";
import {useRouter} from "@/i18n/routing";
import {formatTimeDifference} from "@/helpers/dateDiff";
import {SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText} from "@/components/ui/select";
import {createListCollection} from "@ark-ui/react";
import {BODY_TYPE_SELECT, DRIVE_TYPE_SELECT, ENGINE_TYPE_SELECT, STATUS_SELECT} from "@/constants/filters";
import {Button} from "@/components/ui/button";
import {ChangeEvent, useState} from "react";
import { endpoints} from "@/api/endpoints";

export default function CarAdvertisementList({carAdvertisements}: { carAdvertisements: CarAdvertisementResponse[] }) {
  const router = useRouter()
  const [carAds, setCarAds] = useState<CarAdvertisementResponse[]>(carAdvertisements);
  const [filters, setFilters] = useState({
    body_type: '',
    transmission: '',
    engine_type: '',
    status: ''
  });
  const t = useTranslations();

  const handleFilterChange = async (key: string, value: string) => {
    setFilters({
      ...filters,
      [key]: value
    });
    const carAdvertisements = await fetch('http://209.38.217.122:8477' + endpoints.carAdvertisements + `?body_type=${filters.body_type}&transmission=${filters.transmission}&engine_type=${filters.engine_type}&status=${filters.status}`);
    const g = await carAdvertisements.json();
    setCarAds(g.results);
  }

  return (
    <Flex direction="column" gap="2">
      <Button onClick={() => window.location.href = 'https://t.me/manopov'}>
        {t('postAd')}
      </Button>
      <Heading as="h2" size="xl">
        {t('filters')}
      </Heading>
      <Flex direction="row" gapY={2} wrap="wrap" className="mb-4" justifyContent="space-between">
        <SelectRoot
          className="flex flex-row w-1/2"
          collection={bodyTypeOptions}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            void handleFilterChange('body_type', event.target.value)
          }}
        >
          <SelectTrigger className="w-full mr-1">
            <SelectValueText
              placeholder={t('selectBody')}
            />
          </SelectTrigger>
          <SelectContent>
            {bodyTypeOptions.items.map((movie) => (
              <SelectItem
                item={movie}
                key={movie.value}
              >
                {t(movie.label)}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
        <SelectRoot
          className="flex flex-row w-1/2"
          collection={transmissionOptions}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            void handleFilterChange('body_type', event.target.value)
          }}
        >
          <SelectTrigger className="w-full ml-1">
            <SelectValueText
              placeholder={t('selectTransmission')}
            />
          </SelectTrigger>
          <SelectContent>
            {transmissionOptions.items.map((movie) => (
              <SelectItem
                item={movie}
                key={movie.value}
              >
                {t(movie.label)}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
        <SelectRoot
          className="flex flex-row w-1/2"
          collection={engineTypeOptions}
          onChange={(event:ChangeEvent<HTMLInputElement>) => {
            void handleFilterChange('body_type', event.target.value)
          }}
        >
          <SelectTrigger className="w-full mr-1">
            <SelectValueText
              placeholder={t('selectFuel')}
            />
          </SelectTrigger>
          <SelectContent>
            {engineTypeOptions.items.map((movie) => (
              <SelectItem
                item={movie}
                key={movie.value}
              >
                {t(movie.label)}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
        <SelectRoot
          className="flex flex-row w-1/2"
          collection={statusOptions}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            void handleFilterChange('body_type', event.target.value)
          }}
        >
          <SelectTrigger className="w-full ml-1">
            <SelectValueText
              placeholder={t('selectStatus')}
            />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.items.map((movie) => (
              <SelectItem
                item={movie}
                key={movie.value}
              >
                {t(movie.label)}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </Flex>
      <Heading as="h2" size="xl">
        {t('ads')}
      </Heading>
      {carAds?.map((ad) => (
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

const bodyTypeOptions = createListCollection({
  items: BODY_TYPE_SELECT
})

const engineTypeOptions = createListCollection({
  items: ENGINE_TYPE_SELECT
})

const transmissionOptions = createListCollection({
  items: DRIVE_TYPE_SELECT
})

const statusOptions = createListCollection({
  items: STATUS_SELECT
})