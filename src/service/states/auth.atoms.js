import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const AuthRole = atom(null);
export const AuthAtom = atomWithStorage("auth", {
  token: null,
  isAuthenticated: false,
  role: "N/A",
});
