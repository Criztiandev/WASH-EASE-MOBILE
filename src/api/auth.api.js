import axios from "axios";
import { PublicBaseAxios } from "./base.api";

export default {
  register: async (payload) => {
    return PublicBaseAxios.post("/auth/register", payload, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
  },

  login: async (payload) => {
    return PublicBaseAxios.post("/auth/login", payload, {
      headers: {
        Accept: "application/json",
      },
    });
  },
};
