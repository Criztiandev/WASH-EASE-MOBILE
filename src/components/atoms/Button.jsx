import { Text, TouchableOpacity } from "react-native";
import { cn } from "../../utils/dev.utils";
import { cva } from "class-variance-authority";

const buttonVariants = cva(`  px-5 py-3.5 dark:bg-blue-600  rounded-full   `, {
  variants: {
    variant: {
      default: "bg-primary",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline: "border border-primary",

      ghost: "bg-none outline-none border-none",
    },
    size: {
      icon: "h-10 w-10 justify-center item-center rounded-full",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export default function Button({
  variant,
  size,
  children,
  onPress,
  className,
  disabled,
  textClassName,
  ...props
}) {
  const textClass = cn(
    `text-white text-center text-xl font-bold`,
    textClassName
  );

  return (
    <TouchableOpacity
      {...props}
      disabled={disabled}
      onPress={onPress}
      className={cn(
        buttonVariants({ variant, size, className }),
        `${disabled && "opacity-60"}`
      )}
    >
      <Text className={textClass}>{children}</Text>
    </TouchableOpacity>
  );
}
