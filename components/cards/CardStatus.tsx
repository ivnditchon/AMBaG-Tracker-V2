import { colors } from "@/constants/colors";
import { CardStatusProps } from "@/types/types";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const getStatusStyles = (status?: string) => {
  switch (status) {
    case "Present":
      return { bg: colors.primaryLight, color: colors.primaryDark };
    case "Absent":
      return { bg: colors.dangerLight, color: colors.danger };
    case "Late":
      return { bg: colors.warningLight, color: colors.warning };
    case "Half Day":
      return { bg: colors.purpleLight, color: colors.purple };
    case "On Leave":
      return { bg: colors.blueLight, color: colors.blue };
    default:
      return { bg: colors.lightGray, color: colors.gray };
  }
};

const CardStatus = ({ status }: CardStatusProps) => {
  const statusStyles = getStatusStyles(status);
  return (
    <View
      style={[styles.statusContainer, { backgroundColor: statusStyles.bg }]}
    >
      <View
        style={[styles.statusMarked, { backgroundColor: statusStyles.color }]}
      ></View>
      <Text style={[styles.statusText, { color: statusStyles.color }]}>
        {status}
      </Text>
    </View>
  );
};

export default CardStatus;

const styles = StyleSheet.create({
  statusContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    borderColor: colors.border,
  },

  statusMarked: {
    width: 6,
    height: 6,
    borderRadius: 100,
    marginRight: 5,
  },

  statusText: {
    fontFamily: "DINMedium",
    color: colors.primaryDark,
  },
});
