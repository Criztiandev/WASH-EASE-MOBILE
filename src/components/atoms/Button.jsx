import { Text, TouchableOpacity } from "react-native";
import { cn } from "../../utils/dev.utils";
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "  px-5 py-3.5 me-2 mb-2 dark:bg-blue-600  rounded-full ",
  {
    variants: {
      variant: {
        default: "bg-blue-800 hover:bg-blue-900py-4  ",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border ",

        ghost: "bg-none outline-none border-none",
      },
      size: {
        icon: "h-10 w-10 p-2 justify-center item-center rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export default function Button({
  variant,
  size,
  children,
  onPress,
  className,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={cn(buttonVariants({ variant, size, className }))}>
      {children}
    </TouchableOpacity>
  );
}
