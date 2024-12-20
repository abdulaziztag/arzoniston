export function objectToUrlParams(obj: Record<string, string | number | undefined>): string {
  return (
    '?' +
    Object.entries(obj)
      .filter(([_, value]) => value !== undefined && value !== null && value !== '')
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
      .join('&')
  );
}
