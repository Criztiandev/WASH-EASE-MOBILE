import { atom } from "jotai";

export const AuthRole = atom(null);
export const AuthAtom = atom({
  token: null,
  isAuthenticated: false,
  role: "N/A",
});
