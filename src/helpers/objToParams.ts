export function objectToUrlParams(obj: Record<string, any>): string {
  return (
    '?' +
    Object.entries(obj)
      .filter(([_, value]) => value !== undefined && value !== null && value !== '')
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&')
  );
}
