import React, { useEffect, useState } from "react";
import { View, useWindowDimensions } from "react-native";
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
      schedule: "7:00 AM - 8:00 PM",
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
      schedule: "9:00 AM - 5:00 PM",
    },
    rating: 5,
    status: "close",
  },
];

const useSelectedShop = (id) => {
  const [selectedShop, setSelectedShop] = useState(null);

  useEffect(() => {
    if (id !== undefined) {
      setSelectedShop(MOCKDATA.find((shop) => shop.id === Number(id)));
    }
  }, [id]);

  return selectedShop;
};

const ShopDetails = () => {
  const { id } = useLocalSearchParams();
  const selectedShop = useSelectedShop(id);
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "about", title: "About" },
    { key: "reviews", title: "Reviews" },
    { key: "service", title: "Service" },
  ]);

  const renderScene = SceneMap({
    about: () => (
      <AboutTab
        about="The Place is full of shenanigans"
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
