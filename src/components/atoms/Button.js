import { Text, TouchableOpacity } from "react-native";

export default function Input({ label, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-3.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 rounded-full ">
      <Text className="text-white text-center">{label}</Text>
    </TouchableOpacity>
  );
}
