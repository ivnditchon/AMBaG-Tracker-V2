import { StyleSheet, TextInput, View } from 'react-native'
import React, { use, useState } from 'react'
import { colors } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';

type SearchBarProps = {
  value: string;
  placeHolder: string;
  onChangeText: (text: string) => void;
}

const SearchBar = ({value, placeHolder, onChangeText}: SearchBarProps) => {
  const [isFocus, setFocused] = useState(false);

  return (
    <View style={[styles.searchBarContainer, 
      {
        borderColor: isFocus ? colors.primary : colors.border,
        borderWidth: isFocus ? 1.5 : 1
      }
    ]}>
      <Ionicons name={isFocus ? "search" : "search-outline"} size={20} color={isFocus ? colors.primary : colors.placeholder} style={styles.icon} />
      <TextInput
        value={value} 
        style={styles.textInput} 
        placeholder={placeHolder} 
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
    width: "100%",
    height: 50,
    //borderColor: '#D1D5DB',
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: colors.inputBg
  },

  icon: {
    marginRight: 10,
  },

  textInput: {
    flex: 1,
    fontFamily: "DINRegular",
    fontSize: 18,
    color: colors.text,
  },
});