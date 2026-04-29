import ScreenTitle from "@/components/ScreenTitle";
import Button from "@/components/UI/Button";
import { globalStyles } from "@/styles/globalStyle";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Platform, StyleSheet, View } from "react-native";

const Home = () => {
  /** Login screen navigation */
  const router = useRouter();
  const LoginScreen = () => {
    router.push("/login");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/Group-2.png")}
        resizeMode="cover"
        style={styles.image}
      />
      <View style={styles.screenTitleContainer}>
        <ScreenTitle
          title="Welcome, AMBaG PMO"
          subTitle="Manage your tasks, track performance with ease and stay organized and keep everything in one place"
        />
      </View>
      <Button
        title="Login"
        onPress={LoginScreen}
        customContainerStyle={[
          globalStyles.buttonContainer,
          styles.customButtonContainer,
        ]}
        customTitleStyle={globalStyles.buttonTitle}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  image: {
    width: "100%",
    height: Platform.OS === "ios" ? 300 : 250,
  },

  screenTitleContainer: {
    marginTop: 50,
  },

  customButtonContainer: {
    marginTop: 50,
  },
});
