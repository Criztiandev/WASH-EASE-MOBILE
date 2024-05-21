import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";
import ScreenLayout from "../../../layout/ScreenLayout";
import useMultiSelect from "../../../hooks/useSingleSelect";
import useStepManagement from "../../../hooks/useStepManagement";
import TransactionItem from "../items/TransactionItem";
import { useController } from "react-hook-form";

const TransactionModeStep = ({ form, name, initialData = [], renderItems }) => {
  useStepManagement({ name });

  const handleSelect = (value) => {
    form.setValue("transaction-method", value);
  };

  return (
    <ScreenLayout>
      <StatusBar />
      <View style={styles.container}>
        {renderItems?.length > 0 ? (
          <Text style={styles.headerText}>Select Transaction</Text>
        ) : (
          <Text style={styles.headerText}>No Available Transaction</Text>
        )}
        <FlashList
          data={renderItems}
          renderItem={({ item }) => {
            return (
              <TransactionItem
                key={item.id}
                id={item.id}
                payload={item}
                isActive={form.watch("transaction-method") === item.title}
                onSelect={handleSelect}
              />
            );
          }}
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

export default TransactionModeStep;
