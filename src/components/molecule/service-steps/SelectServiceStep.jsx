import React from "react";
import { View, Text, StatusBar, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";
import ServiceItem from "../items/ServiceItem";
import ScreenLayout from "../../../layout/ScreenLayout";
import useMultiSelect from "../../../hooks/useSingleSelect";
import useStepManagement from "../../../hooks/useStepManagement";

const SelectServiceStep = ({ form, name, initialData = [], renderItems }) => {
  const { selected, handleSelect } = useMultiSelect(initialData, form, name);
  useStepManagement({ name });

  return (
    <ScreenLayout>
      <StatusBar />
      <View style={styles.container}>
        {renderItems?.length > 0 ? (
          <Text style={styles.headerText}>Select Service</Text>
        ) : (
          <Text style={styles.headerText}>No Available Service</Text>
        )}
        <FlashList
          data={renderItems}
          renderItem={({ item }) => (
            <ServiceItem
              key={item.id}
              id={item.id}
              payload={item}
              isActive={selected.some((current) => current.id === item.id)}
              onSelect={handleSelect}
            />
          )}
          estimatedItemSize={200}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 16,
  },
});

export default SelectServiceStep;
