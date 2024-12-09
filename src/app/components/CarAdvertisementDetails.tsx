'use client';

import {Flex, Heading, Image, Card} from "@chakra-ui/react";
import {CarAdvertisementDetailResponse} from "@/api/types";
import {InfoItem} from "@/app/components/info-item";
import {Button} from "@/components/ui/button";
import {useTranslations} from "next-intl";

export const CarAdvertisementDetails = ({carAdvertisement}: {carAdvertisement: CarAdvertisementDetailResponse}) => {
  const t = useTranslations();

  return (
    <Flex direction="column" gap="2" className="pb-20">
      <Heading size="2xl">
        {carAdvertisement.car_model.company.name}{" "}
        {carAdvertisement.car_model.name}, {carAdvertisement.year}
      </Heading>
      <Heading size="lg">${carAdvertisement.price}</Heading>
      <Flex className="overflow-auto gap-x-2 pb-4 rounded-lg">
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
      <Card.Root className="space-y-2 p-4 rounded shadow-md">
        <InfoItem
          label="Телефон"
          value={carAdvertisement.phone_number}
        />
        <InfoItem label="Место" value={carAdvertisement.place.name} />
        <InfoItem label="Тип кузова" value={carAdvertisement.body_type} />
        <InfoItem label="Тип двигателя" value={carAdvertisement.engine_type} />
        <InfoItem label="Тип привода" value={carAdvertisement.drive_type} />
        <InfoItem label="КПП" value={carAdvertisement.transmission} />
        <InfoItem label="Мощность" value={`${carAdvertisement.power} л.с.`} />
        <InfoItem label="Пробег" value={`${carAdvertisement.mileage} км`} />
        <InfoItem label="Объем" value={`${carAdvertisement.volume} л`} />
        <InfoItem label="Цвет" value={carAdvertisement.color.name} />
        <InfoItem
          label="Газовое оборудование"
          value={carAdvertisement.gas_equipment ? "Да" : "Нет"}
        />
        <InfoItem label="Люк" value={carAdvertisement.sunroof ? "Да" : "Нет"} />
        <InfoItem label="Статус" value={carAdvertisement.status} />
      </Card.Root>
      <Flex className="fixed bottom-0 left-0 right-0 bg-gray-900 py-4">
        <Button
          className="max-w-screen-md w-full mx-auto"
          onClick={() => window.location.href = `tel:${carAdvertisement.phone_number}`}
        >
          {t('call')}
        </Button>
      </Flex>
    </Flex>
  );
}