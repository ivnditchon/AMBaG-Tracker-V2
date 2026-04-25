import { colors } from "@/constants/colors";
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
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  secureTextEntry?: boolean;
  onChangeText: (text: string) => void;
  onPress?: () => void;
};

const Input = ({
  label,
  value,
  placeHolder,
  iconLeft,
  iconRight,
  secureTextEntry,
  onChangeText,
  onPress,
}: InputProps) => {
  const [isFocus, setFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: isFocus ? colors.primary : colors.border,
            borderWidth: isFocus ? 1.5 : 1,
          },
        ]}
      >
        {iconLeft && <View style={styles.iconLeft}>{iconLeft}</View>}
        <TextInput
          value={value}
          placeholder={placeHolder}
          style={styles.textInput}
          placeholderTextColor="#D1D5DB"
          onChangeText={onChangeText}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          secureTextEntry={secureTextEntry}
        />
        {iconRight && (
          <TouchableOpacity onPress={onPress}>{iconRight}</TouchableOpacity>
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

  iconLeft: {
    marginRight: 8,
  },

  label: {
    fontFamily: "DINBold",
    fontSize: 15,
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
