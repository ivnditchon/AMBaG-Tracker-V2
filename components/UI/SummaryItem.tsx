import { colors } from "@/constants/colors";
import { EmployeeSummaryData } from "@/types/types";
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

const SummaryItem = ({ value, label, isMainSummary }: EmployeeSummaryData) => {
  return (
    <View style={styles.summaryItem}>
      <Text
        style={[
          styles.value,
          {
            color: isMainSummary ? colors.white : colors.text,
            fontSize:
              Platform.OS === "ios"
                ? isMainSummary
                  ? 28
                  : 20
                : isMainSummary
                  ? 22
                  : 16,
          },
        ]}
      >
        {value}
      </Text>
      <Text
        style={[
          styles.label,
          {
            color: isMainSummary ? "rgba(255,255,255, 0.7)" : colors.subtext,
            fontSize:
              Platform.OS === "ios"
                ? isMainSummary
                  ? 14
                  : 12
                : isMainSummary
                  ? 10
                  : 10,
          },
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

export default SummaryItem;

const styles = StyleSheet.create({
  summaryItem: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
  },

  value: {
    fontFamily: "DINBold",
    color: colors.primaryLight,
  },

  label: {
    marginTop: 7,
    fontFamily: "DINMedium",
    fontWeight: 600,
  },
});
