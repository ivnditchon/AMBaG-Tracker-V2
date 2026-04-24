import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const RootLayout = () => {
  const [loaded] = useFonts({
    InterBold: require("../assets/fonts/Inter_24pt-Bold.ttf"),
    InterSemiBold: require("../assets/fonts/Inter_24pt-SemiBold.ttf"),
    InterRegular: require("../assets/fonts/Inter_24pt-Regular.ttf"),
    DINBold: require("@/assets/fonts/DIN-Bold.otf"),
    DINMedium: require("@/assets/fonts/DIN-Medium.otf"),
    DINRegular: require("@/assets/fonts/DIN-Regular.ttf"),
  });

  if (!loaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <Slot />
    </SafeAreaView>
  );
};

export default RootLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});
