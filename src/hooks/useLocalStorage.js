import { atomWithStorage, createJSONStorage } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useLocalStorage = (name) => {
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(name);
      if (jsonValue !== null) {
        return JSON.parse(jsonValue);
      }
    } catch (e) {
      console.error("Error reading value from AsyncStorage:", e);
    }
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(name, jsonValue);
    } catch (e) {
      console.log("Saving error:", e);
    }
  };

  const removeData = async () => {
    return await AsyncStorage.removeItem(name);
  };

  return { storeData, getData, removeData };
};

export default useLocalStorage;
