import { View, Text } from "react-native";
import React from "react";
import { Avatar, Card, IconButton } from "react-native-paper";

const ProfileCard = ({ name, role }) => {
  return (
    <View className="">
      <Card className="bg-white mb-4">
        <Card.Content className="flex-row space-x-4">
          <IconButton
            icon="account"
            iconColor="#1e1e1e"
            size={48}
            className=" bg-primary/60 rounded-full "
          />
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
