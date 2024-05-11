import { atom } from "jotai";

export const stepAtom = atom("");

export const serviceAtom = atom({
  "dry-machine": "",
  "wash-machine": "",
  "basic-service": [],
  "basic-material": [],
  "payment-method": "",
  "delivery-method": "",
  total: 0,
});
