'use client';

import { Flex, Card, Image, Icon, Input } from '@chakra-ui/react';
import { CarAdvertisementResponse, CommonName } from '@/api/types';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { formatTimeDifference } from '@/helpers/dateDiff';
import {
  BODY_TYPE_SELECT,
  DRIVE_TYPE_SELECT,
  ENGINE_TYPE_SELECT,
  ordering,
  STATUS_SELECT,
} from '@/constants/filters';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { endpoints } from '@/api/endpoints';
import { AppSelect } from '@/components/generic/AppSelect';
import { objectToUrlParams } from '@/helpers/objToParams';
import { ProgressCircleRing, ProgressCircleRoot } from '@/components/ui/progress-circle';
import { VscSettings } from 'react-icons/vsc';

import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { MdClose } from 'react-icons/md';

export default function CarAdvertisementList({
  carAdvertisements,
  carBrands,
}: {
  carAdvertisements: CarAdvertisementResponse[];
  carBrands: CommonName[];
}) {
  const router = useRouter();
  const locale = useLocale();
  const [modalState, setModalState] = useState(false);
  const [carAds, setCarAds] = useState<CarAdvertisementResponse[]>(carAdvertisements);
  const [carModels, setCarModels] = useState<{ label: string; value: string }[]>([]);
  const [adsLoading, setAdsLoading] = useState(false);
  const [filters, setFilters] = useState<Record<string, string | undefined>>({
    body_type: undefined,
    transmission: undefined,
    engine_type: undefined,
    status: undefined,
    company_id: undefined,
    car_model_id: undefined,
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
  const [sort, setSort] = useState('');
  const t = useTranslations();

  useEffect(() => {
    void requestAd();
  }, [sort]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters({
      ...filters,
      [key]: value,
    });
    console.log(key, value);
  };

  const handleBrandSelect = async (key: string, value: string) => {
    setFilters({
      ...filters,
      [key]: value,
    });
    const carAdvertisements = await fetch(
      'http://128.199.31.140:8477' + endpoints.carModels + `?brand=${value}`,
      {
        headers: {
          'Accept-Language': locale,
          'Content-Type': 'application/json',
        },
      },
    );
    const res = await carAdvertisements.json();
    setCarModels(
      res.map((model: { id: string; name: string }) => ({
        label: model.name,
        value: model.id.toString(),
      })),
    );
  };

  const requestAd = async () => {
    setAdsLoading(true);
    setModalState(false);
    const carAdvertisements = await fetch(
      'http://128.199.31.140:8477' +
        endpoints.carAdvertisements +
        objectToUrlParams(filters) +
        (sort ? `&sort=${sort}` : ''),
      {
        headers: {
          'Accept-Language': locale,
          'Content-Type': 'application/json',
        },
      },
    );
    const res = await carAdvertisements.json();
    setCarAds(res.results);
    setAdsLoading(false);
  };

  return (
    <Flex direction="column" gap="2" pb={20}>
      <Flex gapX={2}>
        <AppSelect
          options={carBrands.map((brand) => ({
            label: brand.name,
            value: brand.id.toString(),
          }))}
          className="w-full"
          placeholder={t('choose-brand')}
          onChange={handleBrandSelect}
          filterKey={'company_id'}
          clearable
        />
        <AppSelect
          options={carModels}
          placeholder={t('choose-model')}
          className="w-full"
          disabled={!carModels.length || !filters.company_id}
          onChange={handleFilterChange}
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
                  translate
                  value={filters.transmission ? [filters.transmission] : []}
                  options={DRIVE_TYPE_SELECT}
                  placeholder="selectTransmission"
                  className="w-full"
                  onChange={handleFilterChange}
                  filterKey={'transmission'}
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
                <DialogActionTrigger asChild className="grow">
                  <Button onClick={() => setModalState(false)} variant="outline">
                    {t('cancel')}
                  </Button>
                </DialogActionTrigger>
                <Button className="grow" onClick={requestAd}>
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
      <Flex gapX={2}>
        {Object.keys(filters).map(
          (key) =>
            filters[key] && (
              <div
                key={key}
                className="flex items-center gap-x-2 rounded-md border px-2 py-1 capitalize"
              >
                <p>
                  {key}: {filters[key]}
                </p>
                <Icon
                  className="cursor-pointer"
                  onClick={async () => {
                    setFilters((prev) => ({
                      ...prev,
                      [key]: '',
                    }));
                    await requestAd();
                  }}
                >
                  <MdClose />
                </Icon>
              </div>
            ),
        )}
      </Flex>
      {adsLoading ? (
        <Flex className="mt-4 w-full justify-center">
          <ProgressCircleRoot value={null} size="sm">
            <ProgressCircleRing cap="round" />
          </ProgressCircleRoot>
        </Flex>
      ) : (
        carAds?.map((ad) => (
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
        ))
      )}
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
