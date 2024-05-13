import { View, Text } from "react-native";
import React from "react";
import { Avatar, Card } from "react-native-paper";

const ProfileCard = ({ name, role }) => {
  return (
    <View className="">
      <Card className="bg-white mb-4">
        <Card.Content className="flex-row space-x-4">
          <Avatar.Icon />
          <View>
            <Text className="text-lg font-bold">{name}</Text>
            <Text>{role}</Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default ProfileCard;
