import { getLocale } from "next-intl/server"
import {BASE_URL} from "@/api/endpoints";


const filteredParams = (params: Record<string, string>) => Object.fromEntries(
  Object.entries(params).filter(([_, value]) => value != null)
);

export const fetchServer = async (url: string, options: RequestInit & {params?: Record<string, string>} = {}) => {
  try {
    const locale = await getLocale()
    const queryString = new URLSearchParams(filteredParams(options.params ?? {})).toString();
    const modifiedOptions: RequestInit = {
      ...options,
      headers: {
        ...options.headers,
        "Accept-Language": locale,
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(BASE_URL + url + queryString, modifiedOptions);

    if (!response.ok) {
      const errorData = await response.json();
      return new Error(
        `Error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
};