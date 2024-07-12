import axios from "axios";

export default {
  fetchAllLaundryShopLocation: async () => {
    try {
      const response = await axios.get(
        "https://washease.online/api/get-all-laundry-shops"
      );
      const { laundry_shops_location } = response.data;

      const transformedPayload = laundry_shops_location?.map((shops) => {
        const { latitude, longitude } = shops;

        return {
          ...shops,
          coords: {
            latitude: Number(latitude) || 0,
            longitude: Number(longitude) || 0,
            latitudeDelta: 0.0922 || 0,
            longitudeDelta: 0.0421 || 0,
          },
        };
      });

      return transformedPayload;
    } catch (e) {
      console.log(e);
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
