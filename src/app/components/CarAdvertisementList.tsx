'use client';

import { Flex, Card, Image, Icon, Input } from '@chakra-ui/react';
import { CarAdvertisementResponse, CommonName } from '@/api/types';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import NextImage from 'next/image';
import { formatTimeDifference } from '@/helpers/dateDiff';
import {
  BODY_TYPE_SELECT,
  DRIVE_TYPE_SELECT,
  ENGINE_TYPE_SELECT,
  ordering,
  STATUS_SELECT,
  TRANSMISSION_SELECT,
} from '@/constants/filters';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { AppSelect } from '@/components/generic/AppSelect';
import { ProgressCircleRing, ProgressCircleRoot } from '@/components/ui/progress-circle';
import { VscSettings } from 'react-icons/vsc';

import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useSearchParams } from 'next/navigation';
import { formatWithSpaces } from '@/helpers/numParcer';
import { useQuery } from '@tanstack/react-query';
import { getCarAdvertisements, getCarModels } from '@/api';

export default function CarAdvertisementList({
  carAdvertisements,
  carBrands,
  carPlaces,
}: {
  carAdvertisements: CarAdvertisementResponse[];
  carBrands: CommonName[];
  carPlaces: CommonName[];
}) {
  const searchParams = useSearchParams();
  const locale = useLocale();
  const router = useRouter();
  const [modalState, setModalState] = useState(false);
  const [brand, setBrand] = useState<string | undefined>(
    searchParams.get('company_id') ?? undefined,
  );

  const [model, setModel] = useState<string | undefined>(
    searchParams.get('car_model_id') ?? undefined,
  );
  const [switcher, setSwitcher] = useState(false);

  const [filters, setFilters] = useState<Record<string, string | undefined>>({
    place_id: searchParams.get('places') ?? undefined,
    body_type: searchParams.get('body_type') ?? undefined,
    transmission: searchParams.get('transmission') ?? undefined,
    drive_type: searchParams.get('drive_type') ?? undefined,
    engine_type: searchParams.get('engine_type') ?? undefined,
    status: searchParams.get('status') ?? undefined,
    price_min: searchParams.get('price_min') ?? undefined,
    price_max: searchParams.get('price_max') ?? undefined,
    year_min: searchParams.get('year_min') ?? undefined,
    year_max: searchParams.get('year_max') ?? undefined,
    volume_min: searchParams.get('volume_min') ?? undefined,
    volume_max: searchParams.get('volume_max') ?? undefined,
    mileage_min: searchParams.get('mileage_min') ?? undefined,
    mileage_max: searchParams.get('mileage_max') ?? undefined,
    power_min: searchParams.get('power_min') ?? undefined,
    power_max: searchParams.get('power_max') ?? undefined,
    sunroof: searchParams.get('sunroof') ?? undefined,
  });
  const [sort, setSort] = useState('');
  const t = useTranslations();

  const { data: carAdsFromQuery, isLoading: carAdsLoading } = useQuery({
    queryKey: ['carAds', sort, model, brand, switcher],
    queryFn: () =>
      getCarAdvertisements({
        params: { ...filters, sort: sort, company_id: brand, car_model_id: model },
        locale,
      }),
    initialData: carAdvertisements,
    refetchOnMount: false,
  });

  const { data: carModels, isFetched: carModelsFetched } = useQuery({
    queryKey: ['carModels', brand],
    queryFn: () =>
      getCarModels(brand, {
        locale,
      }),
    enabled: brand !== undefined,
  });

  useEffect(() => {
    if (carModels) {
      setModel(searchParams.get('car_model_id') ?? undefined);
    }
  }, [carModels]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters({
      ...filters,
      [key]: value,
    });
    const params = new URLSearchParams(window.location.search);
    if (value) params.set(key, value);
    else params.delete(key);
    window.history.pushState(null, '', `?${params.toString()}`);
  };

  return (
    <Flex direction="column" alignItems="center" gap="2" pb={20}>
      <Flex gapX={2} className="w-full">
        <AppSelect
          value={brand ? [brand] : []}
          options={carBrands.map((brand) => ({
            label: brand.name,
            value: brand.id.toString(),
          }))}
          className="w-full"
          placeholder={t('choose-brand')}
          onChange={async (_key, value) => {
            setBrand(value);
            setModel(undefined);
            const params = new URLSearchParams(window.location.search);
            params.delete('car_model_id');
            if (value) params.set('company_id', value);
            else params.delete('company_id');
            window.history.pushState(null, '', `?${params.toString()}`);
          }}
          filterKey={'company_id'}
          clearable
        />
        <AppSelect
          value={model ? [model] : []}
          options={
            carModels?.map((model) => ({
              label: model.name,
              value: model.id.toString(),
            })) ?? []
          }
          placeholder={t('choose-model')}
          className="w-full"
          disabled={!carModelsFetched || !brand}
          onChange={async (_key, value) => {
            setModel(value);
            const params = new URLSearchParams(window.location.search);
            if (value) params.set('car_model_id', value);
            else params.delete('car_model_id');
            window.history.pushState(null, '', `?${params.toString()}`);
          }}
          filterKey={'car_model_id'}
          clearable
        />
      </Flex>
      <div className="grid w-full grid-cols-2 gap-x-2">
        <DialogRoot open={modalState} size="full" trapFocus={false}>
          <DialogTrigger asChild>
            <Button size="sm" className="grow" onClick={() => setModalState(true)}>
              <Icon>
                <VscSettings />
              </Icon>
              {t('filters')}
              <span className="rounded-full bg-black px-1.5 text-white">
                {Object.keys(filters).filter((key) => filters[key]).length > 0 &&
                  Object.keys(filters).filter((key) => filters[key]).length}
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('filters')}</DialogTitle>
            </DialogHeader>
            <DialogBody className="flex justify-center">
              <div className="mb-4 grid max-w-screen-sm grow grid-cols-1 gap-2">
                <AppSelect
                  value={filters.place_id ? [filters.place_id] : []}
                  options={carPlaces.map((place) => ({
                    label: place.name,
                    value: place.id.toString(),
                  }))}
                  placeholder={t('selectCity')}
                  className="w-full"
                  onChange={handleFilterChange}
                  filterKey={'place_id'}
                  clearable
                />
                <AppSelect
                  translate
                  value={filters.body_type ? [filters.body_type] : []}
                  options={BODY_TYPE_SELECT}
                  placeholder="selectBody"
                  className="w-full"
                  onChange={handleFilterChange}
                  filterKey={'body_type'}
                  clearable
                />
                <AppSelect
                  clearable
                  translate
                  value={filters.transmission ? [filters.transmission] : []}
                  className="w-full"
                  options={TRANSMISSION_SELECT}
                  placeholder="selectTransmission"
                  onChange={handleFilterChange}
                  filterKey={'transmission'}
                />
                <AppSelect
                  translate
                  value={filters.drive_type ? [filters.drive_type] : []}
                  options={DRIVE_TYPE_SELECT}
                  placeholder="selectDriveType"
                  className="w-full"
                  onChange={handleFilterChange}
                  filterKey={'drive_type'}
                  clearable
                />
                <AppSelect
                  translate
                  value={filters.engine_type ? [filters.engine_type] : []}
                  options={ENGINE_TYPE_SELECT}
                  placeholder="selectFuel"
                  className="w-full"
                  onChange={handleFilterChange}
                  filterKey={'engine_type'}
                  clearable
                />
                <AppSelect
                  translate
                  value={filters.status ? [filters.status] : []}
                  options={STATUS_SELECT}
                  placeholder="selectStatus"
                  className="w-full"
                  onChange={handleFilterChange}
                  filterKey={'status'}
                  clearable
                />
                <Flex className="w-full gap-x-2">
                  <Input
                    value={filters.price_min}
                    onChange={(e) => {
                      handleFilterChange('price_min', e.target.value);
                    }}
                    type="number"
                    placeholder={t('priceMin')}
                  />
                  <Input
                    value={filters.price_max}
                    onChange={(e) => {
                      handleFilterChange('price_max', e.target.value);
                    }}
                    type="number"
                    placeholder={t('priceMax')}
                  />
                </Flex>
                <Flex className="w-full gap-x-2">
                  <Input
                    value={filters.year_min}
                    onChange={(e) => {
                      handleFilterChange('year_min', e.target.value);
                    }}
                    type="number"
                    placeholder={t('yearMin')}
                  />
                  <Input
                    value={filters.year_max}
                    onChange={(e) => {
                      handleFilterChange('year_max', e.target.value);
                    }}
                    type="number"
                    placeholder={t('yearMax')}
                  />
                </Flex>
                <Flex className="w-full gap-x-2">
                  <Input
                    value={filters.volume_min}
                    onChange={(e) => {
                      handleFilterChange('volume_min', e.target.value);
                    }}
                    type="number"
                    placeholder={t('volumeMin')}
                  />
                  <Input
                    value={filters.volume_max}
                    onChange={(e) => {
                      handleFilterChange('volume_max', e.target.value);
                    }}
                    type="number"
                    placeholder={t('volumeMax')}
                  />
                </Flex>
                <Flex className="w-full gap-x-2">
                  <Input
                    value={filters.mileage_min}
                    onChange={(e) => {
                      handleFilterChange('mileage_min', e.target.value);
                    }}
                    type="number"
                    placeholder={t('mileageMin')}
                  />
                  <Input
                    value={filters.mileage_max}
                    onChange={(e) => {
                      handleFilterChange('mileage_max', e.target.value);
                    }}
                    type="number"
                    placeholder={t('mileageMax')}
                  />
                </Flex>
                <Flex className="w-full gap-x-2">
                  <Input
                    value={filters.power_min}
                    onChange={(e) => {
                      handleFilterChange('power_min', e.target.value);
                    }}
                    type="number"
                    placeholder={t('powerMin')}
                  />
                  <Input
                    value={filters.power_max}
                    onChange={(e) => {
                      handleFilterChange('power_max', e.target.value);
                    }}
                    type="number"
                    placeholder={t('powerMax')}
                  />
                </Flex>
                <AppSelect
                  value={filters.sunroof ? [filters.sunroof] : []}
                  options={[
                    { label: 'exist', value: 'true' },
                    { value: 'false', label: 'notExist' },
                  ]}
                  clearable
                  translate
                  placeholder="sunroof"
                  onChange={handleFilterChange}
                  filterKey="sunroof"
                />
              </div>
            </DialogBody>
            <DialogFooter className="flex w-full justify-center">
              <div className="flex max-w-screen-sm grow gap-x-2">
                <Button
                  className="grow"
                  onClick={async () => {
                    setFilters({
                      place_id: undefined,
                      body_type: undefined,
                      transmission: undefined,
                      drive_type: undefined,
                      engine_type: undefined,
                      status: undefined,
                      price_min: undefined,
                      price_max: undefined,
                      year_min: undefined,
                      year_max: undefined,
                      volume_min: undefined,
                      volume_max: undefined,
                      mileage_min: undefined,
                      mileage_max: undefined,
                      power_min: undefined,
                      power_max: undefined,
                      sunroof: undefined,
                    });
                    window.history.replaceState(null, '', window.location.pathname);
                  }}
                  variant="outline"
                >
                  {t('reset')}
                </Button>
                <Button className="grow" onClick={() => setModalState(false)} variant="outline">
                  {t('cancel')}
                </Button>
                <Button
                  className="grow"
                  onClick={() => {
                    setSwitcher((prev) => !prev);
                    setModalState(false);
                  }}
                >
                  {t('apply')}
                </Button>
              </div>
            </DialogFooter>
            <DialogCloseTrigger onClick={() => setModalState(false)} />
          </DialogContent>
        </DialogRoot>
        <AppSelect
          variant="subtle"
          className="w-auto"
          size={'sm'}
          options={ordering}
          clearable
          placeholder="sort"
          onChange={async (key, value) => setSort(value)}
          translate
          filterKey="sort"
        />
      </div>
      {carAdsLoading && !carAdsFromQuery ? (
        <Flex className="mt-4 w-full justify-center">
          <ProgressCircleRoot value={null} size="sm">
            <ProgressCircleRing cap="round" />
          </ProgressCircleRoot>
        </Flex>
      ) : (
        carAdsFromQuery?.map((ad) => (
          <Card.Root
            onClick={() => router.push('/cars/' + ad.id)}
            key={ad.id}
            className="w-fit transition-all hover:cursor-pointer hover:bg-gray-900"
          >
            <Card.Header>
              <Card.Title>
                {ad.company_name} {ad.car_model_name}, {ad.year}
              </Card.Title>
              <Card.Description as="h2" fontWeight="bold">
                ${formatWithSpaces(ad.price)}
              </Card.Description>
            </Card.Header>
            <Card.Body>
              <Flex className="gap-x-2 overflow-auto rounded-lg pb-4">
                {ad.image && (
                  <Image asChild key={ad.image}>
                    <NextImage
                      width={400}
                      height={400}
                      className="aspect-video rounded-lg border-2 border-solid border-white dark:border-gray-800"
                      src={ad.image}
                      alt={`${ad.company_name} ${ad.car_model_name}`}
                    />
                  </Image>
                )}
              </Flex>
              <Flex gap="2" wrap="wrap" className="&[span]:capitalize">
                <span>{formatWithSpaces(ad.mileage)} km</span> ·<span>{t(ad.engine_type)}</span> ·
                <span>{t(ad.transmission)}</span> ·<span>{ad.color_name}</span>
              </Flex>
              <Flex>
                <span className="text-sm text-gray-400">
                  {ad.place_name}, {formatTimeDifference(ad.created).diff}{' '}
                  {t(formatTimeDifference(ad.created).key)} {t('ago')}
                </span>
              </Flex>
            </Card.Body>
          </Card.Root>
        ))
      )}
    </Flex>
  );
}
