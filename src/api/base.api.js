import axios from "axios";

export const PublicBaseAxios = axios.create({
  baseURL: "https://washeaselaundry.online/api/",
});

export const PrivateBaseAxios = axios.create({
  baseURL: "https://washeaselaundry.online/api/",
  withCredentials: true,
});
