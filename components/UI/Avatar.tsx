import { colors } from "@/constants/colors";
import React from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

type AvatarProps = {
  initial: string;
  customStyle?: StyleProp<ViewStyle>;
};

const Avatar = ({ initial, customStyle }: AvatarProps) => {
  return (
    <View style={[styles.container, customStyle]}>
      <Text style={styles.initial}>{initial}</Text>
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.18)",
  },

  initial: {
    fontFamily: "DINBold",
    color: colors.white,
    letterSpacing: 0.5,
  },
});
