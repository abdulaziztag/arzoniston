import type { FC, ReactNode } from "react";

type InfoItemProps = {
  label: string;
  value: ReactNode;
  };

export const InfoItem: FC<InfoItemProps> = ({
  label,
  value,
}) => (
  <li className="flex items-center justify-between">
    <span className="text-gray-400">{label}:</span>
    <span className="font-bold">{value}</span>
  </li>
);
