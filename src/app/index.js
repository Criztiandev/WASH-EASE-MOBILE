import { Link } from "expo-router";
import {
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Page() {
  return (
    <SafeAreaView>
      <StatusBar
        animated={true}
        barStyle={"default"}
        showHideTransition={"fade"}
        hidden={true}
      />

      <Link href={"./sign-in"}>Next</Link>
    </SafeAreaView>
  );
}
