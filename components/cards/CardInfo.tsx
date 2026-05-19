import { colors } from "@/constants/colors";
import { CardEmployeeInfoProps } from "@/types/types";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const CardInfo = ({
  firstName,
  lastName,
  position,
  department,
}: CardEmployeeInfoProps) => {
  return (
    <View>
      <Text style={styles.employeeName}>
        {firstName} {lastName}
      </Text>
      <Text style={styles.employeePosition}>{position}</Text>
      <Text style={styles.employeeDepartment}>{department}</Text>
    </View>
  );
};

export default CardInfo;

const styles = StyleSheet.create({
  employeeName: {
    fontFamily: "DINBold",
    fontSize: 17,
    color: colors.text,
  },

  employeePosition: {
    fontFamily: "DINRegular",
    fontSize: 14,
    color: colors.subtext,
    marginTop: 5,
    marginBottom: 2,
  },

  employeeDepartment: {
    fontFamily: "DINRegular",
    fontSize: 14,
    color: colors.subtext,
  },
});
