import { View, Text, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { cn } from "../utils/dev.utils";

const ScreenLayout = ({ children, ...props }) => {
  const defaultStyle = cn("flex-1 w-full", props.className);

  return (
    <SafeAreaView className={defaultStyle} {...props}>
      <StatusBar
        animated={true}
        backgroundColor={"#242526"}
        barStyle={"default"}
        showHideTransition={"fade"}
        hidden={false}
      />

      {children}
    </SafeAreaView>
  );
};

export default ScreenLayout;
