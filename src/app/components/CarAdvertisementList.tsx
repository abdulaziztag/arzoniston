'use client';

import { Flex, Card, Image, Heading } from '@chakra-ui/react';
import { CarAdvertisementResponse, CommonName } from '@/api/types';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { formatTimeDifference } from '@/helpers/dateDiff';
import {
  BODY_TYPE_SELECT,
  DRIVE_TYPE_SELECT,
  ENGINE_TYPE_SELECT,
  STATUS_SELECT,
} from '@/constants/filters';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { endpoints } from '@/api/endpoints';
import { AppSelect } from '@/components/generic/AppSelect';
import { objectToUrlParams } from '@/helpers/objToParams';

export default function CarAdvertisementList({
  carAdvertisements,
  carBrands,
}: {
  carAdvertisements: CarAdvertisementResponse[];
  carBrands: CommonName[];
}) {
  const router = useRouter();
  const [carAds, setCarAds] = useState<CarAdvertisementResponse[]>(carAdvertisements);
  const [carModels, setCarModels] = useState<{ label: string; value: string }[]>([]);
  const [filters, setFilters] = useState({
    body_type: '',
    transmission: '',
    engine_type: '',
    status: '',
    company_id: '',
    car_model_id: '',
  });
  const t = useTranslations();

  const handleFilterChange = async (key: string, value: string) => {
    setFilters({
      ...filters,
      [key]: value,
    });
    const carAdvertisements = await fetch(
      'http://209.38.217.122:8477' +
        endpoints.carAdvertisements +
        objectToUrlParams({
          ...filters,
          [key]: value,
        }),
    );
    const res = await carAdvertisements.json();
    setCarAds(res.results);
  };

  const handleBrandSelect = async (key: string, value: string) => {
    setFilters({
      ...filters,
      [key]: value,
    });
    const carAdvertisements = await fetch(
      'http://209.38.217.122:8477' + endpoints.carModels + `?brand=${value}`,
    );
    const res = await carAdvertisements.json();
    setCarModels(
      res.map((model: { id: string; name: string }) => ({
        label: model.name,
        value: model.id.toString(),
      })),
    );
  };

  return (
    <Flex direction="column" gap="2" pb={20}>
      <Heading as="h2" size="xl">
        {t('filters')}
      </Heading>
      <Flex direction="row" gapY={2} wrap="wrap" className="mb-4" justifyContent="space-between">
        <AppSelect
          options={carBrands.map((brand) => ({ label: brand.name, value: brand.id.toString() }))}
          placeholder={t('choose-brand')}
          onChange={handleBrandSelect}
          filterKey={'company_id'}
          clearable
        />
        <AppSelect
          options={carModels}
          placeholder={t('choose-model')}
          disabled={!carModels.length || !filters.company_id}
          onChange={handleFilterChange}
          filterKey={'car_model_id'}
          clearable
        />
      </Flex>
      <Flex direction="row" gapY={2} wrap="wrap" className="mb-4" justifyContent="space-between">
        <AppSelect
          options={BODY_TYPE_SELECT}
          placeholder={t('selectBody')}
          onChange={handleFilterChange}
          filterKey={'body_type'}
          clearable
        />
        <AppSelect
          options={DRIVE_TYPE_SELECT}
          placeholder={t('selectTransmission')}
          onChange={handleFilterChange}
          filterKey={'transmission'}
          clearable
        />
        <AppSelect
          options={ENGINE_TYPE_SELECT}
          placeholder={t('selectFuel')}
          onChange={handleFilterChange}
          filterKey={'engine_type'}
          clearable
        />
        <AppSelect
          options={STATUS_SELECT}
          placeholder={t('selectStatus')}
          onChange={handleFilterChange}
          filterKey={'status'}
          clearable
        />
      </Flex>
      <Flex justifyContent="space-between" alignItems="center">
        <Heading as="h2" size="xl">
          {t('ads')}
        </Heading>
        <AppSelect
          variant="subtle"
          width={200}
          className="justify-end"
          options={[{ label: 'asc', value: 'asc' }]}
          placeholder={t('sort')}
          onChange={() => {}}
          filterKey="ordering"
        />
      </Flex>
      {carAds?.map((ad) => (
        <Card.Root
          onClick={() => router.push('/cars/' + ad.id)}
          key={ad.id}
          className="transition-shadow hover:cursor-pointer hover:shadow-2xl hover:shadow-amber-900"
        >
          <Card.Header>
            <Card.Title>
              {ad.company_name} {ad.car_model_name}, {ad.year}
            </Card.Title>
            <Card.Description fontWeight="bold">${ad.price}</Card.Description>
          </Card.Header>
          <Card.Body>
            <Flex className="gap-x-2 overflow-auto rounded-lg pb-4">
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
              <span>{ad.mileage} km</span> ·<span>{ad.engine_type}</span> ·
              <span>{ad.transmission}</span> ·<span>{ad.color_name}</span>
            </Flex>
            <Flex>
              <span className="text-sm text-gray-400">
                {ad.place_name}, {formatTimeDifference(ad.created).diff}{' '}
                {t(formatTimeDifference(ad.created).key)} {t('ago')}
              </span>
            </Flex>
          </Card.Body>
        </Card.Root>
      ))}
      <Flex className="fixed bottom-0 left-0 right-0 bg-gray-900 py-4">
        <Button
          className="mx-auto w-full max-w-screen-md"
          onClick={() => (window.location.href = 'https://t.me/manopov')}
        >
          {t('postAd')}
        </Button>
      </Flex>
    </Flex>
  );
}
