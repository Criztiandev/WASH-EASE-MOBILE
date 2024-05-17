import { View, Text, useWindowDimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { TabView, SceneMap } from "react-native-tab-view";

import AboutTab from "../../../../components/views/tabs/AboutTab";
import ShopReviewTabs from "../../../../components/views/tabs/ShopReviewTabs";
import ShopServiceOfferTab from "../../../../components/views/tabs/ShopServiceOfferTab";
import ShopDetailsCover from "../../../../components/organism/ShopDetailsCover";

const MOCKDATA = [
  {
    id: 0,
    title: "M&L Laundry Hub Katuparan",
    image:
      "https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&w=600",
    details: {
      location: "88 3rd St Taguig, Metro Manila",
      schedule: "7:00 AM - 8:00 PM",
    },
    rating: 5,
    address: "88 3rd St Taguig, Metro Manila",
    status: "open",
  },
  {
    id: 1,
    title: "M&L Laundry Hub Pinagsama",
    image:
      "https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&w=600",
    details: {
      location: " Phase 2, Balai Magayon, Taguig, Metro Manila",
      schedule: "7:00 AM - 7:00 PM",
    },
    rating: 3,
    address: "Phase 2, Balai Magayon, Taguig, Metro Manila",
    status: "open",
  },

  {
    id: 2,
    title: "LABAsics Laundry House North Signal",
    image:
      "https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&w=600",
    address: "44 Sampaloc Extension, Taguig, Metro Manila",
    rating: 5,
    details: {
      location: "44 Sampaloc Extension, Taguig, Metro Manila",
      schedule: ": 7:00 AM - 8:00 PM",
    },
    status: "open",
  },

  {
    id: 3,
    title: "Instawash Laundry Shop",
    address: "Unit A5 & A6, Block 10 Lot 11, Taguig",
    image:
      "https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&w=600",
    details: {
      location: " Unit A5 & A6, Block 10 Lot 11, Taguig",
      schedule: ": 9:00 AM - 5:00 PM",
    },
    rating: 5,
    status: "close",
  },
];

const Details = {
  name: "Shabu Houze",
  address: "Biringan Leyte",
  rating: 5.0,
  about:
    "Toast notifications are nifty tools that can be used to display information without using a lot of screen space. They’re used to display non-critical pieces of information that are supplementary in nature. In most instances, Toast notifications don’t require the user to take any action. Occasionally, there will be a close button or even an action button, but those are not present in the most common use cases.",
  opening: "5 AM - 6 PM",
  status: "Open",
};

const ShopDetails = () => {
  const { id } = useLocalSearchParams();
  const [selectedShop, setSelectedShop] = useState(0);
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "about", title: "About" },
    { key: "reviews", title: "Reviews" },
    { key: "service", title: "Service" },
  ]);

  useEffect(() => {
    if (id) {
      setSelectedShop(MOCKDATA[id]);
    }
  }, [id]);

  const renderScene = SceneMap({
    about: () => (
      <AboutTab
        about="The Place is full of shinanigans"
        address={selectedShop?.details?.location}
        opening={selectedShop?.details?.schedule}
      />
    ),
    reviews: ShopReviewTabs,
    service: () => <ShopServiceOfferTab id={id} status={true} />,
  });

  return (
    <View className="flex-1">
      <ShopDetailsCover {...selectedShop} />

      <View className="flex-1">
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
      </View>
    </View>
  );
};

export default ShopDetails;
