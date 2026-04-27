import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown as RNDropdown } from "react-native-element-dropdown";

type DropdownProps = {
  icon?: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  items: string[];
  placeholder?: string;
};

const Dropdown = ({
  label,
  value,
  onValueChange,
  items,
  placeholder,
}: DropdownProps) => {
  const [isFocus, setIsFocus] = useState(false);

  // Convert string[] to { label, value }[] format required by the library
  const data = items.map((item) => ({ label: item, value: item }));

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <RNDropdown
        style={[styles.dropdown, isFocus && styles.dropDownFocused]}
        data={data}
        labelField="label"
        valueField="value"
        value={value}
        placeholder={placeholder ?? "Select an option"}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={styles.itemTextStyle}
        activeColor={colors.primaryLight}
        onChange={(item) => {
          onValueChange(item.value);
          setIsFocus(false);
        }}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        renderRightIcon={() => (
          <Ionicons
            name={isFocus ? "chevron-up" : "chevron-down"}
            size={16}
            color={isFocus ? colors.primary : colors.subtext}
          />
        )}
        dropdownPosition="auto"
      />
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  label: {
    fontFamily: "DINBold",
    fontSize: 16,
    fontWeight: 600,
    color: colors.text,
    marginBottom: 8,
    letterSpacing: 0.2,
  },

  dropdown: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    backgroundColor: colors.inputBg,
    paddingHorizontal: 10,
    height: 48,
    marginBottom: 20,
  },

  dropDownFocused: {
    borderColor: colors.primary,
  },

  placeholderStyle: {
    fontFamily: "DINRegular",
    fontSize: 16,
    color: colors.placeholder,
  },

  selectedTextStyle: {
    fontFamily: "DINRegular",
    fontSize: 16,
    color: colors.text,
  },

  itemTextStyle: {
    fontFamily: "DINRegular",
    fontSize: 16,
    color: colors.text,
  },

  iconLeft: {
    marginRight: 8,
  },
});
