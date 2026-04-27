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
}: InputProps) => {
  const [isFocus, setFocused] = useState(false);

  // Show password icon toggle
  const [showPassword, setShowPassword] = useState(false);
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
            borderColor: showPassword ? colors.primary : isFocus ? colors.primary : colors.border,
            borderWidth: showPassword ? 1.5 : isFocus ? 1.5 : 1,
          },
        ]}
      >
        {iconLeft && <Ionicons style={styles.icon} name={showPassword ? iconLeftActive : isFocus ? iconLeftActive : iconLeft} size={18} color={showPassword ? colors.primary : isFocus ? colors.primary : colors.placeholder} />}
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
          <TouchableOpacity onPress={togglePasswordVisibility} disabled={value === ""}>
            <Ionicons name={showPassword ? iconRightActive : iconRight} size={18} color={showPassword ? colors.primary : isFocus ? colors.primary : colors.placeholder} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
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
});
