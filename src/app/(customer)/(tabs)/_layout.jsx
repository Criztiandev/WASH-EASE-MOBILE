import { Tabs } from "expo-router";

const HomeTab = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
        }}
      />

      <Tabs.Screen
        name="choosen-shop"
        options={{
          title: "My Shop",
        }}
      />
      <Tabs.Screen
        name="shop-list"
        options={{
          title: "Search",
        }}
      />

      <Tabs.Screen
        name="message"
        options={{
          title: "Message",
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />
    </Tabs>
  );
};

export default HomeTab;
