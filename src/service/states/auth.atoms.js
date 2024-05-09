import { atom } from "jotai";

export const AuthRole = atom(null);
export const AuthAtom = atom({
  isAuthenticated: false,
  role: "N/A",
});
