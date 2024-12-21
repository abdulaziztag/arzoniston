import { objectToUrlParams } from '@/helpers/objToParams';
import { BASE_URL } from '@/api/endpoints';

export const fetchServer = async (
  url: string,
  options: RequestInit & { params?: Record<string, string | undefined> } = {},
) => {
  try {
    const queryString = objectToUrlParams(options.params ?? {});
    const modifiedOptions: RequestInit = {
      ...options,
      headers: {
        ...options.headers,
        'Accept-Language': 'uz',
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(BASE_URL + url + queryString, modifiedOptions);

    if (!response.ok) {
      const errorData = await response.json();
      return new Error(
        `Error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
};
