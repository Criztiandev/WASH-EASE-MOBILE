import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import uuid from "react-native-uuid";

const useFetchTransaction = () => {
  const { authState } = useAuthContext();
  return async () => {
    try {
      const result = await axios.get(
        `https://washeaselaundry.online/api/get-customer-transactions/${authState["user_id"]}/`
      );
      const filtered = result.data.filter(
        (transaction) => transaction.status !== "COMPLETED"
      );

      const fullDetails = await Promise.all(
        filtered.map(async (items) => {
          const { laundry_shop_id } = items;

          const response = await axios.get(
            `https://washeaselaundry.online/api/laundry-shop/users/${laundry_shop_id}`,
            {
              headers: { Authorization: `Bearer ${authState.token}` },
            }
          );

          const { data: Details } = response?.data;

          const { laundry_shop_name, laundry_shop_address, phone_number } =
            Details;

          const UID = uuid.v4();

          return {
            uid: UID, // Generate a unique ID here
            id: items.id, // Ensure this is the transaction ID, not the shop ID
            laundry_shop_id: items.laundry_shop_id,
            shopName: laundry_shop_name,
            address: laundry_shop_address,
            contact: phone_number,
            service_type: items?.service_type,
            total_bill: items?.total_bill,
            status: items.status,
          };
        })
      );

      return fullDetails || [];
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return [];
    }
  };
};

export default useFetchTransaction;
