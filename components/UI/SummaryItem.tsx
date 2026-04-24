import React from "react";
import { StyleSheet, Text, View } from "react-native";

export type SummaryItemProps = {
  value: number;
  label: string;
  customValueStyle?: string;
  showDivider: boolean;
};

const SummaryItem = ({
  value,
  label,
  customValueStyle,
  showDivider,
}: SummaryItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.summaryItem}>
        <Text style={[styles.value, { color: customValueStyle }]}>{value}</Text>
        <Text style={styles.label}>{label}</Text>
      </View>
      {showDivider && <View style={styles.showDivider} />}
    </View>
  );
};

export default SummaryItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  summaryItem: {
    alignItems: "center",
    paddingHorizontal: 15,
  },

  value: {
    fontFamily: "DINBold",
    fontSize: 32,
  },

  label: {
    marginTop: 5,
    fontFamily: "DINMedium",
    fontSize: 12,
    color: "rgba(255,255,255, 0.7)",
    fontWeight: 600,
  },

  showDivider: {
    width: 1,
    height: 45,
    backgroundColor: "rgba(255,255,255,0.25)",
    marginLeft: 8,
  },
});
