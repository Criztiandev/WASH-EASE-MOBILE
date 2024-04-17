import { Text, TouchableOpacity } from "react-native";
import { cn } from "../../utils/dev.utils";

export default function Button({ children, onPress, className }) {
  const defaultStyle = cn(
    "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-3.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 rounded-full my-4 ",
    className
  );

  return (
    <TouchableOpacity onPress={onPress} className={defaultStyle}>
      <Text className="text-white text-center">{children}</Text>
    </TouchableOpacity>
  );
}
