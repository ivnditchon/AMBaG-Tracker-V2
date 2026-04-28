import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type InputProps = {
  label: string;
  value: string;
  placeHolder: string;
  iconLeft?: React.ComponentProps<typeof Ionicons>["name"];
  iconLeftActive?: React.ComponentProps<typeof Ionicons>["name"];
  iconRight?: React.ComponentProps<typeof Ionicons>["name"];
  iconRightActive?: React.ComponentProps<typeof Ionicons>["name"];
  isPassword?: boolean;
  secureTextEntry?: boolean;
  onChangeText: (text: string) => void;
  onPress?: () => void;
  error?: string;
};

const Input = ({
  label,
  value,
  placeHolder,
  iconLeft,
  iconLeftActive,
  isPassword,
  iconRight,
  iconRightActive,
  onChangeText,
  error,
}: InputProps) => {
  const [isFocus, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isError = !!error; // true if error has value, false if empty

  // Show password icon toggle
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: isError
              ? colors.danger
              : showPassword || isFocus
                ? colors.primary
                : colors.border,
            borderWidth: isError || showPassword || isFocus ? 1.5 : 1,
          },
        ]}
      >
        {iconLeft && (
          <Ionicons
            style={styles.icon}
            name={showPassword || isFocus ? iconLeftActive : iconLeft}
            size={18}
            color={
              showPassword || isFocus ? colors.primary : colors.placeholder
            }
          />
        )}
        <TextInput
          value={value}
          placeholder={placeHolder}
          style={styles.textInput}
          placeholderTextColor="#D1D5DB"
          onChangeText={onChangeText}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          secureTextEntry={isPassword ? !showPassword : false}
        />
        {isPassword && iconRight && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            disabled={value === ""}
          >
            <Ionicons
              name={showPassword ? iconRightActive : iconRight}
              size={18}
              color={
                showPassword || isFocus ? colors.primary : colors.placeholder
              }
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.inputError}>{error}</Text>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column'
  },

  inputContainer: {
    height: 48,
    //borderWidth: 1,
    //borderColor: '#D1D5DB',
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: colors.inputBg,
  },

  icon: {
    marginRight: 8,
  },

  label: {
    fontFamily: "DINBold",
    fontSize: 16,
    fontWeight: 600,
    color: colors.text,
    marginBottom: 8,
    letterSpacing: 0.2,
  },

  textInput: {
    flex: 1,
    fontFamily: "DINRegular",
    fontSize: 18,
    color: colors.text,
  },

  inputError: {
    fontFamily: "DINMedium",
    fontSize: 14,
    color: colors.danger,
    marginTop: 3,
  },
});
