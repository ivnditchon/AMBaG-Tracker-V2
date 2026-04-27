import BackButton from "@/components/BackButton";
import ScreenTitle from "@/components/ScreenTitle";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import { colors } from "@/constants/colors";
import { globalStyles } from "@/styles/globalStyle";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Show password icon toggle
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Navigate to Dashboard
  const router = useRouter();
  const handleLogin = () => {
    router.push("/(main)/dashboard");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <BackButton />
        <View style={styles.formContainer}>
          <View style={styles.formBox}>
            <ScreenTitle
              title="Welcome Back!"
              subTitle="Sign in to access your dashboard and features"
            />
            <View style={styles.inputContainer}>
              <Input
                label="Username"
                value={username.trim()}
                iconLeft={
                  <Ionicons name="person-outline" size={18} color="#D1D5DB" />
                }
                placeHolder="Enter your username"
                onChangeText={(newText) => {
                  setUsername(newText);
                }}
              />
              <Input
                label="Password"
                value={password.trim()}
                iconLeft={
                  <Ionicons
                    name="lock-closed-outline"
                    size={18}
                    color="#D1D5DB"
                  />
                }
                placeHolder="Enter your password"
                iconRight={
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={18}
                    color="#D1D5DB"
                  />
                }
                onChangeText={(newText) => {
                  setPassword(newText);
                }}
                secureTextEntry={showPassword ? false : true}
                onPress={togglePasswordVisibility}
              />
            </View>
            <Button
              title="Login"
              onPress={handleLogin}
              customContainerStyle={[
                globalStyles.buttonContainer,
                styles.customButtonContainer,
              ]}
              customTitleStyle={globalStyles.buttonTitle}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  formContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  formBox: {
    paddingVertical: 50,
    paddingHorizontal: 25,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: colors.border,
    backgroundColor: "#FFFFFF",
    // Soft shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },

  inputContainer: {
    marginTop: 40,
    marginBottom: 20,
  },

  customButtonContainer: {
    marginTop: 5,
  },
});
