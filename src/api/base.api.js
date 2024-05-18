import axios from "axios";

export const PublicBaseAxios = axios.create({
  baseURL: "https://washease.online/api/",
});

export const PrivateBaseAxios = axios.create({
  baseURL: "https://washease.online/api/",
  withCredentials: true,
});
