import axios from "axios";

export default {
  fetchAllLaundryShopLocation: async () => {
    try {
      const { data } = await axios.get(
        "https://washease.online/api/get-all-laundry-shops"
      );
      const { laundry_shops_location, laundry_shops } = data;

      return (
        laundry_shops_location
          ?.map((shop) => {
            const { id, latitude, longitude } = shop;
            const shopDetails =
              laundry_shops.find((item) => item.id === id) || {};

            return {
              id: id,
              name: shopDetails.laundry_shop_name,
              address: shopDetails.laundry_shop_address,
              phoneNumber: shopDetails.phone_number,
              isOpen: shopDetails?.is_shop_closed === 0 ? "Close" : "Open",
              coords: {
                latitude: Number(latitude) || 0,
                longitude: Number(longitude) || 0,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              },
            };
          })
          .filter((shop) => shop.name) || []
      );
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
