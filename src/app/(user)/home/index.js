import { Link } from "expo-router";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import Input from "../../../components/atoms/Input";
import Button from "../../../components/atoms/Button";

export default function Page() {
  const renderSeparator = () => <View style={{ width: 24 }} />;

  return (
    <SafeAreaView>
      <StatusBar
        animated={true}
        barStyle={"default"}
        showHideTransition={"fade"}
        hidden={true}
      />

      <ScrollView className="px-[16px]">
        <View className="h-[48px] border mt-4"></View>

        <Input />

        <View className="w-full h-[300px] border rounded-[5px] my-4"></View>

        <View className="mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="font-semibold text-[24px]">Nearby Laundry</Text>
            <Link href={"/laundry"}>View All</Link>
          </View>

          <FlatList
            data={["T", "T"]}
            horizontal
            ItemSeparatorComponent={renderSeparator}
            renderItem={(item) => (
              <View className="w-[300px]  border rounder-[5px] rounded-[5px] p-2 ">
                <View className="flex-row justify-between">
                  <Text>Open</Text>
                  <Text>4.5</Text>
                </View>

                <View className="w-full h-[170px] border my-2 rounded-[5px]"></View>

                <View>
                  <View className="space-y-1">
                    <Text className="font-bold text-[16px]">
                      M&L Laundry Hub (KATUPARAN)
                    </Text>

                    <View>
                      <Text>Barangay Katipunan</Text>
                    </View>

                    <View>
                      <Text>8:00 AM to 8:00 PM</Text>
                    </View>
                  </View>
                </View>

                <Button>View</Button>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
