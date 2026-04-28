import { colors } from "@/constants/colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export type SummaryItemProps = {
  value: number;
  label: string;
  customValueStyle?: string;
  showDivider?: boolean;
};

const SummaryItem = ({ value, label }: SummaryItemProps) => {
  return (
    <View style={styles.summaryItem}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
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
    fontSize: 32,
    color: colors.primaryLight,
  },

  label: {
    marginTop: 5,
    fontFamily: "DINMedium",
    fontSize: 13,
    color: "rgba(255,255,255, 0.7)",
    fontWeight: 600,
  },
});
