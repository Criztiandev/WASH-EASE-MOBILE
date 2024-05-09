import { PrivateBaseAxios } from "./base.api";

export default {
  logout: async () => {
    return PrivateBaseAxios.get("/auth/logout", {});
  },
};
