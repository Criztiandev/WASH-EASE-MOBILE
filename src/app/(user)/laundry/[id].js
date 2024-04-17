import { useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import { TabView, SceneMap } from "react-native-tab-view";
import AbouTab from "./components/AbouTab";

const SecondRoute = () => (
  //TODO: Service Tab
  <View className="p-4 h-full space-y-4" style={{ backgroundColor: "#E7E8E6" }}>
    <View className=" p-4 bg-white">
      <Text className="font-bold text-[18px] mb-4">Review</Text>
      <View className="w-full flex">
        <View className="flex-row space-x-4  w-full flex">
          <View className="w-[84px] h-[84px] rounded-full border"></View>

          <View className="flex-row items  justify-between flex-1">
            <View>
              <Text className="font-semibold text-[18px]">Jane Doe</Text>
              <Text>4.2</Text>
            </View>
            <Text>April 7 2024</Text>
          </View>
        </View>

        <View className="mb-4 border-b border-gray-300 pb-4">
          <Text>Fast service and clean clothes! Loved it!</Text>
        </View>
      </View>

      <View className="w-full flex">
        <View className="flex-row space-x-4  w-full flex">
          <View className="w-[84px] h-[84px] rounded-full border"></View>

          <View className="flex-row items  justify-between flex-1">
            <View>
              <Text className="font-semibold text-[18px]">Jane Doe</Text>
              <Text>4.2</Text>
            </View>
            <Text>April 7 2024</Text>
          </View>
        </View>

        <View className="mb-4 border-b border-gray-300 pb-4">
          <Text>Fast service and clean clothes! Loved it!</Text>
        </View>
      </View>

      <View className="w-full flex">
        <View className="flex-row space-x-4  w-full flex">
          <View className="w-[84px] h-[84px] rounded-full border"></View>

          <View className="flex-row items  justify-between flex-1">
            <View>
              <Text className="font-semibold text-[18px]">Jane Doe</Text>
              <Text>4.2</Text>
            </View>
            <Text>April 7 2024</Text>
          </View>
        </View>

        <View className="mb-4 border-b border-gray-300 pb-4">
          <Text>Fast service and clean clothes! Loved it!</Text>
        </View>
      </View>
    </View>
  </View>
);

const renderScene = SceneMap({
  About: AbouTab,
  Reviews: SecondRoute,
  Service: SecondRoute,
});

export default function Page() {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "About", title: "About" },
    { key: "Reviews", title: "Reviews" },
    { key: "Service", title: "Service" },
  ]);

  return (
    <SafeAreaView>
      <StatusBar
        animated={true}
        barStyle={"default"}
        showHideTransition={"fade"}
        hidden={true}
      />

      <ScrollView className="h-screen">
        <View className="h-[200px] border"></View>

        <TabView
          style={{
            height: Dimensions.get("screen").height - 250,
          }}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
