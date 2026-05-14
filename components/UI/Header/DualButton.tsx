import { colors } from "@/constants/colors";
import { DualButtonProps } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import Button from "../Button";

const DualButton = ({
  onLeftPress,
  onRightPress,
  leftLabel,
  rightLabel,
  iconLeftActive,
  iconLeftInactive,
  iconRightActive,
  iconRightInactive,
  isActive,
}: DualButtonProps) => {
  const getActiveStyles = (
    label: string,
    activeIcon: React.ComponentProps<typeof Ionicons>["name"],
    inActiveIcon: React.ComponentProps<typeof Ionicons>["name"],
  ) => {
    // Implicit return ({}) === to return object directly Object  while explicit return {} JS expects a logic and return inside function
    const isSelected = isActive === label;

    return {
      backgroundColor: isSelected ? colors.primaryLight : "transparent",
      color: isSelected ? colors.primaryDark : colors.primaryLight,
      icon: isSelected ? activeIcon : inActiveIcon,
    };
  };

  const left = getActiveStyles(leftLabel, iconLeftActive, iconLeftInactive);
  const right = getActiveStyles(rightLabel, iconRightActive, iconRightInactive);

  return (
    <View style={styles.container}>
      <Button
        title={leftLabel}
        customContainerStyle={[
          styles.buttonContainer,
          {
            backgroundColor: left.backgroundColor,
          },
        ]}
        customTitleStyle={[
          styles.buttonLabel,
          {
            color: left.color,
          },
        ]}
        icon={left.icon}
        iconSize={18}
        iconColor={left.color}
        onPress={onLeftPress}
      />
      <Button
        title={rightLabel}
        customContainerStyle={[
          styles.buttonContainer,
          {
            backgroundColor: right.backgroundColor,
          },
        ]}
        customTitleStyle={[
          styles.buttonLabel,
          {
            color: right.color,
          },
        ]}
        icon={right.icon}
        iconSize={18}
        iconColor={right.color}
        onPress={onRightPress}
      />
    </View>
  );
};

export default DualButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "flex-start",
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 5,
    gap: 3,
  },

  buttonContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  buttonLabel: {
    fontSize: 16,
    marginLeft: 5,
  },
});
