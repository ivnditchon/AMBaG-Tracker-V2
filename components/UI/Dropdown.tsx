import { colors } from "@/constants/colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown as RNDropdown } from "react-native-element-dropdown";

type DropdownProps = {
  label?: string;
  value: string;
  onValueChange: (value: string) => void;
  items: string[];
};

const Dropdown = ({ label, value, items, onValueChange }: DropdownProps) => {
  // Convert string[] to { label, value }[] format required by the library
  const data = items.map((item) => ({ label: item, value: item }));

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <RNDropdown
        style={styles.dropdown}
        data={data}
        labelField="label"
        valueField="value"
        value={value}
        onChange={(item) => onValueChange(item.value)}
        placeholderStyle={{ color: colors.subtext }}
        selectedTextStyle={{ color: colors.text }}
      />
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    fontFamily: "DINBold",
    fontSize: 15,
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
    paddingHorizontal: 12,
    height: 48,
  },
});
