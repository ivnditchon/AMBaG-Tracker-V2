import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type HeaderProps = {
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  bottomComponent?: React.ReactNode;
  customHeaderContainer: StyleProp<ViewStyle>;
};

const Header = ({
  leftComponent,
  rightComponent,
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
          {leftComponent}
          {rightComponent}
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
