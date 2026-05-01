import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export type FooterMenuProps = {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  activeIcon: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
  activeColor: string;
  label: string;
  labelColor: string;
  activeLabelColor: string;
  labelFont: string;
  activeLabelFont: string;
  isActive?: boolean;
  onPress: () => void;
};

const FooterMenu = ({
  icon,
  activeIcon,
  color,
  activeColor,
  labelColor,
  activeLabelColor,
  labelFont,
  activeLabelFont,
  label,
  onPress,
  isActive,
}: FooterMenuProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Ionicons
        name={isActive ? activeIcon : icon}
        size={isActive ? 23 : 22}
        color={isActive ? activeColor : color}
      />
      <Text
        style={[
          styles.label,
          {
            color: isActive ? activeLabelColor : labelColor,
            fontFamily: isActive ? activeLabelFont : labelFont,
            transform: [
              {
                scale: isActive ? 1.2 : 1.0,
              },
            ],
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default FooterMenu;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  label: {
    marginTop: 8,
    fontSize: 10,
    letterSpacing: 0.1,
  },
});
