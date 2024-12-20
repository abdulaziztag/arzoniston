export const formatWithSpaces = (value?: string | number): string => {
  if (value === undefined || value === null) return '';

  const stringValue = value.toString().replace(/[^\d.]/g, '');
  const [integerPart, decimalPart] = stringValue.split('.');

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  if (decimalPart !== undefined) {
    return `${formattedInteger}.${decimalPart.slice(0, 2)}`;
  }

  return formattedInteger;
};
