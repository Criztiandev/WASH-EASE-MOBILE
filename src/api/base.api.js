import axios from "axios";

export const PublicBaseAxios = axios.create({
  baseURL: "https://washease.iamjohn.cloud/public/api/",
});

export const PrivateBaseAxios = axios.create({
  baseURL: "https://washease.iamjohn.cloud/public/api/",
  withCredentials: true,
});
