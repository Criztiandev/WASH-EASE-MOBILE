import axios from "axios";

export const PublicBaseAxios = axios.create({
  baseURL: "https://aimoz.store/api/",
});

export const PrivateBaseAxios = axios.create({
  baseURL: "https://aimoz.store/api/",
  withCredentials: true,
});
