import { Text, TextInput, View } from "react-native";
import { cn } from "../../utils/dev.utils";
import { cva } from "class-variance-authority";

const inputVariants = cva(
  "w-full p-2.5 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
  {
    variants: {
      variant: {
        default: "bg-gray-50 text-gray-900 ",
        outline: "border border-gray-300 bg-none",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-[52px] px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export default function Input({
  variant,
  size,
  label,
  onChangeText,
  className,
  style,
}) {
  const defastyle = cn("", className);

  return (
    <View className={defastyle} style={style}>
      {label && (
        <Text className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </Text>
      )}
      <TextInput
        onChangeText={onChangeText}
        className={cn(inputVariants({ variant, size, className }))}
      />
    </View>
  );
}
