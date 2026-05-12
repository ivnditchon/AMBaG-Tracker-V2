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
  return (
    <View style={styles.container}>
      <Button
        title={leftLabel}
        customContainerStyle={[
          styles.buttonContainer,
          {
            backgroundColor:
              isActive === leftLabel ? colors.primaryLight : "transparent",
          },
        ]}
        customTitleStyle={[
          styles.buttonLabel,
          {
            color:
              isActive === leftLabel ? colors.primaryDark : colors.primaryLight,
          },
        ]}
        icon={isActive === leftLabel ? leftActiveIcon : leftIcon}
        iconSize={18}
        iconColor={
          isActive === leftLabel ? colors.primaryDark : colors.primaryLight
        }
        onPress={onLeftPress}
      />
      <Button
        title={rightLabel}
        customContainerStyle={[
          styles.buttonContainer,
          {
            backgroundColor:
              isActive === rightLabel ? colors.primaryLight : "transparent",
          },
        ]}
        customTitleStyle={[
          styles.buttonLabel,
          {
            color:
              isActive === rightLabel
                ? colors.primaryDark
                : colors.primaryLight,
          },
        ]}
        icon={isActive === rightLabel ? rightActiveIcon : rightIcon}
        iconSize={18}
        iconColor={
          isActive === rightLabel ? colors.primaryDark : colors.primaryLight
        }
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
  },

  buttonContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: colors.primaryLight,
  },

  buttonLabel: {
    fontSize: 16,
    marginLeft: 5,
  },
});
