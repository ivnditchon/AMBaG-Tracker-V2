import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

type ScreenTitleProps = {
  title: string;
  subTitle?: string;
};

const ScreenTitle = ({ title, subTitle }: ScreenTitleProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.subTitleContainer}>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
    </View>
  );
};

export default ScreenTitle;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontFamily: "DINBold",
    fontSize: Platform.OS === "ios" ? 36 : 30,
    color: "#2C2C2C",
    letterSpacing: 0.2,
  },

  subTitleContainer: {
    marginTop: 15,
  },

  subTitle: {
    textAlign: "center",
    fontFamily: "DINMedium",
    fontSize: Platform.OS === "ios" ? 16 : 12,
    color: "#2C2C2C",
    opacity: 0.5,
    lineHeight: 23,
  },
});
