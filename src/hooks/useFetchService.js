import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useFetchService = ({ filter, name }) => {
  const fetchServices = async () => {
    const response = await axios.get(
      "https://washease.online/api/get-all-services"
    );
    return response.data.data.filter(
      (item) => item.service_category_name === filter
    )[0].services;
  };

  return useQuery({
    queryFn: fetchServices,
    queryKey: [`${name}`],
  });
};

export default useFetchService;
