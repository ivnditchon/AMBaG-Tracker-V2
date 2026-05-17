import { colors } from "@/constants/colors";
import { CardProps } from "@/types/types";
import React from "react";
import { StyleSheet, View } from "react-native";

const Card = ({
  listType,
  topLeftComponent,
  topRightComponent,
  bottomComponent,
}: CardProps) => {
  return (
    <View>
      {(listType === "MARK_ATTENDANCE" || "MARK_UNIFORM") && (
        <View style={styles.container}>
          <View style={styles.topComponentContainer}>
            {topLeftComponent}
            {topRightComponent}
          </View>
          {bottomComponent}
        </View>
      )}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "#fff",
    borderRadius: 10,
    // iOS shadow
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,

    // Android shadow
    elevation: 5,
  },

  topComponentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
  },

  actionsContainer: {
    flexDirection: "row",
  },
});
