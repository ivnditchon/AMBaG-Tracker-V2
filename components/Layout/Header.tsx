import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View } from "react-native";

type HeaderProps = {
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  bottomComponent?: React.ReactNode;
};

const Header = ({
  leftComponent,
  rightComponent,
  bottomComponent,
}: HeaderProps) => {
  return (
    <View>
      <LinearGradient
        colors={["#007A56", "#00956A", "#00C588"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.mainContainer}
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
  mainContainer: {
    padding: 25,
  },

  subContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
