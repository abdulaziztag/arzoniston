'use client';

import { Flex, Heading, Image, Card } from '@chakra-ui/react';
import { CarAdvertisementDetailResponse } from '@/api/types';
import { InfoItem } from '@/app/components/info-item';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

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
      <Heading size="lg">${carAdvertisement.price}</Heading>
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
        <InfoItem label={t('phoneNumber')} value={carAdvertisement.phone_number} />
        <InfoItem label={t('place')} value={carAdvertisement.place.name} />
        <InfoItem label={t('bodyType')} value={t(carAdvertisement.body_type)} />
        <InfoItem label={t('fuelType')} value={t(carAdvertisement.engine_type)} />
        <InfoItem label={t('driveType')} value={t(carAdvertisement.drive_type)} />
        <InfoItem label={t('transmission')} value={t(carAdvertisement.transmission)} />
        <InfoItem label={t('power')} value={`${carAdvertisement.power} ${t('hp')}`} />
        <InfoItem label={t('mileage')} value={`${carAdvertisement.mileage} ${t('km')}`} />
        <InfoItem label={t('volume')} value={`${carAdvertisement.volume} ${t('l')}`} />
        <InfoItem label={t('color')} value={carAdvertisement.color.name} />
        <InfoItem
          label={t('gas')}
          value={t(carAdvertisement.gas_equipment ? 'exist' : 'notExist')}
        />
        <InfoItem label={t('sunroof')} value={t(carAdvertisement.sunroof ? 'exist' : 'notExist')} />
        <InfoItem label={t('status')} value={t(carAdvertisement.status)} />
      </Card.Root>
      <div className="flex w-full flex-col items-center gap-y-4 overflow-auto">
        <iframe src="https://t.me/suvtekinn/6688?embed=1" width="400" height="300"></iframe>
        <iframe
          width="320"
          height="440"
          src="https://www.instagram.com/p/DABNaRoK5Za/embed/"
          frameBorder="0"
        ></iframe>
      </div>
      <Flex className="fixed bottom-0 left-0 right-0 bg-gray-900 py-4">
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
