import { colors } from "@/constants/colors";
import { SearchEmployee } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Platform, StyleSheet, TextInput, View } from "react-native";

const SearchBar = ({ value, placeholder, onChangeText }: SearchEmployee) => {
  const [isFocus, setFocused] = useState(false);

  return (
    <View
      style={[
        styles.searchBarContainer,
        {
          borderColor: isFocus ? colors.primary : colors.border,
          borderWidth: isFocus ? 1.5 : 1,
        },
      ]}
    >
      <Ionicons
        name={isFocus ? "search" : "search-outline"}
        size={18}
        color={isFocus ? colors.primary : colors.placeholder}
        style={styles.icon}
      />
      <TextInput
        value={value}
        style={styles.textInput}
        placeholder={placeholder}
        onChangeText={onChangeText}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBarContainer: {
    flex: 1,
    height: Platform.OS === "ios" ? 50 : 40,
    //borderColor: '#D1D5DB',
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: colors.inputBg,
  },

  icon: {
    marginRight: 5,
  },

  textInput: {
    flex: 1,
    fontFamily: "DINRegular",
    fontSize: Platform.OS === "ios" ? 18 : 12,
    color: colors.text,
  },
});
