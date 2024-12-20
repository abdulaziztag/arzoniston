'use client';

import { Flex, Heading, Image, Card } from '@chakra-ui/react';
import { CarAdvertisementDetailResponse } from '@/api/types';
import { InfoItem } from '@/app/components/info-item';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { formatWithSpaces } from '@/helpers/numParcer';

export const CarAdvertisementDetails = ({
  carAdvertisement,
}: {
  carAdvertisement: CarAdvertisementDetailResponse;
}) => {
  const t = useTranslations();

  return (
    <Flex direction="column" gap="2" className="pb-20">
      <Heading size="2xl">
        {carAdvertisement.car_model.company.name} {carAdvertisement.car_model.name},{' '}
        {carAdvertisement.year}
      </Heading>
      <Heading size="lg" className="font-bold">
        ${formatWithSpaces(carAdvertisement.price)}
      </Heading>
      <Flex className="gap-x-2 overflow-auto rounded-lg pb-4">
        {carAdvertisement.images.map((image) => (
          <Image
            height={400}
            rounded="lg"
            className="border-2 border-solid border-white dark:border-gray-800"
            key={image.id}
            src={image.image}
            alt={image.id.toString()}
          />
        ))}
      </Flex>
      <Card.Root className="space-y-2 rounded p-4 shadow-md">
        {carAdvertisement.phone_number && (
          <InfoItem label={t('phoneNumber')} value={carAdvertisement.phone_number} />
        )}
        {carAdvertisement.place?.name && (
          <InfoItem label={t('place')} value={carAdvertisement.place.name} />
        )}
        {carAdvertisement.body_type && (
          <InfoItem label={t('bodyType')} value={t(carAdvertisement.body_type)} />
        )}
        {carAdvertisement.engine_type && (
          <InfoItem label={t('fuelType')} value={t(carAdvertisement.engine_type)} />
        )}
        {carAdvertisement.drive_type && (
          <InfoItem label={t('driveType')} value={t(carAdvertisement.drive_type)} />
        )}
        {carAdvertisement.transmission && (
          <InfoItem label={t('transmission')} value={t(carAdvertisement.transmission)} />
        )}
        {carAdvertisement.power && (
          <InfoItem label={t('power')} value={`${carAdvertisement.power} ${t('hp')}`} />
        )}
        {carAdvertisement.mileage && (
          <InfoItem
            label={t('mileage')}
            value={`${formatWithSpaces(carAdvertisement.mileage)} ${t('km')}`}
          />
        )}
        {carAdvertisement.volume && (
          <InfoItem label={t('volume')} value={`${carAdvertisement.volume} ${t('l')}`} />
        )}
        {carAdvertisement.color?.name && (
          <InfoItem label={t('color')} value={carAdvertisement.color.name} />
        )}
        {carAdvertisement.gas_equipment != null && (
          <InfoItem
            label={t('gas')}
            value={t(carAdvertisement.gas_equipment ? 'exist' : 'notExist')}
          />
        )}
        {carAdvertisement.sunroof != null && (
          <InfoItem
            label={t('sunroof')}
            value={t(carAdvertisement.sunroof ? 'exist' : 'notExist')}
          />
        )}
        {carAdvertisement.status && (
          <InfoItem label={t('status')} value={t(carAdvertisement.status)} />
        )}
      </Card.Root>
      <div className="flex w-full flex-col items-center gap-y-4 overflow-auto">
        {carAdvertisement.telegram_url && (
          <iframe src={carAdvertisement.telegram_url} width="400" height="300"></iframe>
        )}
        {carAdvertisement.instagram_url && (
          <iframe
            width="320"
            height="440"
            className="border-none"
            src={carAdvertisement.instagram_url}
          ></iframe>
        )}
      </div>
      <Flex className="fixed bottom-0 left-0 right-0 py-4">
        <Button
          className="mx-auto w-full max-w-screen-md"
          onClick={() => (window.location.href = `tel:${carAdvertisement.phone_number}`)}
        >
          {t('call')}
        </Button>
      </Flex>
    </Flex>
  );
};
