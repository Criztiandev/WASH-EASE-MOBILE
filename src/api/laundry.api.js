import axios from "axios";
import Geocoder from "react-native-geocoding";

const GOOGLE_MAPS_API_KEY = "AIzaSyCUTRVpYG7yWdHnvU5QUxrulEhlXOegDTY";

Geocoder.init(GOOGLE_MAPS_API_KEY);

export default {
  fetchAllLaundryShopLocation: async () => {
    try {
      const { data } = await axios.get(
        "https://washease.online/api/get-all-laundry-shops"
      );
      const { laundry_shops } = data;

      const transformPayload = (
        await Promise.all(
          laundry_shops.map(async (item) => {
            const { laundry_shop_address, ...rest } = item;

            try {
              // Geocode the address
              const geocodeResponse = await Geocoder.from(laundry_shop_address);

              if (geocodeResponse.results.length > 0) {
                const { lat, lng } =
                  geocodeResponse.results[0].geometry.location;

                return {
                  id: item.id,
                  name: item?.laundry_shop_name,
                  address: item?.laundry_shop_address,
                  phoneNumber: item?.phone_number,
                  isOpen: item?.is_shop_closed === 0 ? "Close" : "Open",
                  coords: {
                    latitude: lat,
                    longitude: lng,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  },
                };
              }
            } catch (geocodeError) {
              return null;
            }

            // Return null for unsuccessful geocoding
            return null;
          })
        )
      ).filter(Boolean); // Filter out null values
      return transformPayload;
    } catch (error) {
      console.error("Error fetching laundry shop locations:", error);
      return [];
    }
  },

  fetchAllLaundryShopByID: async (id) => {
    try {
      const response = await axios.get(
        "https://washease.online/api/get-all-laundry-shops"
      );
      const { laundry_shops } = response.data;
      const findData = laundry_shops?.find((shop) => shop?.id === id);

      if (!findData) return [];
      return findData;
    } catch (e) {
      console.log(e);
      return [];
    }
  },
};
