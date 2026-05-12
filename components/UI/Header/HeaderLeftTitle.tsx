import { colors } from "@/constants/colors";
import { HeaderLeftTitleProps } from "@/types/types";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const HeaderLeftTitle = ({ label, title, dateToday }: HeaderLeftTitleProps) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{dateToday}</Text>
    </View>
  );
};

export default HeaderLeftTitle;

const styles = StyleSheet.create({
  label: {
    fontFamily: "DINMedium",
    fontSize: 20,
    color: "rgba(255,255,255,0.6)",
    letterSpacing: 0.5,
    fontWeight: 600,
  },

  title: {
    fontFamily: "DINBold",
    color: colors.white,
    fontSize: 30,
    letterSpacing: 0.5,
    paddingVertical: 5,
  },

  date: {
    fontFamily: "DINMedium",
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    letterSpacing: 0.5,
    fontWeight: 600,
    marginTop: 8,
  },
});
