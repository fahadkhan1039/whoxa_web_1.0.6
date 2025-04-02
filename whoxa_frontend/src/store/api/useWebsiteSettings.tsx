import { useQuery } from "react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { WebsiteSettingsRes } from "../../types/ResType";


export const useWebsiteSettings = () => {
  const token = Cookies.get("token");

  return useQuery<WebsiteSettingsRes, Error>(
    ["get-website-settings"],
    async () => {
      const response = await axios.post<WebsiteSettingsRes>(
        `${import.meta.env.VITE_API_URL}get-website-settings`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    },
    {
      // Set cache time to prevent re-fetching on route changes
      staleTime: Infinity, // Data will never be considered stale
      cacheTime: Infinity, // Data will never be removed from cache
    },
  );
};
