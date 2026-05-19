import { HeaderProps } from "@/types/types";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View } from "react-native";

const Header = ({
  topLeftComponent,
  topRightComponent,
  bottomComponent,
  customHeaderContainer,
}: HeaderProps) => {
  return (
    <View style={customHeaderContainer}>
      <LinearGradient
        colors={["#03573e", "#037c5a", "#07ad79"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerSubContainer}
      >
        <View style={styles.subContainer}>
          {topLeftComponent}
          {topRightComponent}
        </View>
        {bottomComponent}
      </LinearGradient>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerSubContainer: {
    padding: 25,
    flex: 1,
  },

  subContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
