import { colors } from "@/constants/colors";
import { DualButtonProps } from "@/types/types";
import React from "react";
import { StyleSheet, View } from "react-native";
import Button from "../Button";

const DualButton = ({
  onLeftPress,
  onRightPress,
  leftLabel,
  rightLabel,
  isActive,
  leftActiveIcon,
  leftIcon,
  rightActiveIcon,
  rightIcon,
}: DualButtonProps) => {
  const isLeftActive = isActive === leftLabel;
  const isRightActive = isActive === rightLabel;

  return (
    <View style={styles.container}>
      <Button
        title={leftLabel}
        customContainerStyle={[
          styles.buttonContainer,
          {
            backgroundColor: isLeftActive ? colors.primaryLight : "transparent",
          },
        ]}
        customTitleStyle={[
          styles.buttonLabel,
          {
            color: isLeftActive ? colors.primaryDark : colors.primaryLight,
          },
        ]}
        icon={isLeftActive ? leftActiveIcon : leftIcon}
        iconSize={18}
        iconColor={isLeftActive ? colors.primaryDark : colors.primaryLight}
        onPress={onLeftPress}
      />
      <Button
        title={rightLabel}
        customContainerStyle={[
          styles.buttonContainer,
          {
            backgroundColor: isRightActive
              ? colors.primaryLight
              : "transparent",
          },
        ]}
        customTitleStyle={[
          styles.buttonLabel,
          {
            color: isRightActive ? colors.primaryDark : colors.primaryLight,
          },
        ]}
        icon={isRightActive ? rightActiveIcon : rightIcon}
        iconSize={18}
        iconColor={isRightActive ? colors.primaryDark : colors.primaryLight}
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
