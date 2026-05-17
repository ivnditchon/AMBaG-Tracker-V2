import { colors } from "@/constants/colors";
import { CardsProps } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const AttendanceMarkCard = ({
  firstName,
  lastName,
  position,
  department,
  attendanceStatus,
  onAttendanceEdit,
  onAttendanceDelete,
  children,
}: CardsProps) => {
  const getStatusStyles = (status?: string) => {
    // If the type is optional and pass it into parameter make sure the parameter is optional too
    switch (status) {
      case "Present":
        return { bg: colors.primaryLight, color: colors.primaryDark };
      case "Absent":
        return { bg: colors.dangerLight, color: colors.danger };
      case "Late":
        return { bg: colors.warningLight, color: colors.warning };
      case "Half Day":
        return { bg: colors.tealLight, color: colors.teal };
      case "On Leave":
        return { bg: colors.purpleLight, color: colors.purple };
      default:
        return { bg: colors.lightGray, color: colors.gray };
    }
  };

  const statusStyles = getStatusStyles(attendanceStatus);
  return (
    <View style={styles.container}>
      <View style={styles.employeeInfoContainer}>
        <View style={styles.employeeNameContainer}>
          <Text style={styles.employeeNameTextStyle}>{firstName} </Text>
          <Text style={styles.employeeNameTextStyle}>{lastName}</Text>
        </View>
        <View style={styles.employeePositionContainer}>
          <Text style={styles.employeePositionText}>{position}</Text>
        </View>
        <Text style={styles.employeeDesignationText}>{department}</Text>

        <View
          style={[
            styles.employeeStatusContainer,
            {
              backgroundColor: statusStyles.bg,
            },
          ]}
        >
          <View
            style={[
              styles.employeeStatusMarked,
              {
                backgroundColor: statusStyles.color,
              },
            ]}
          ></View>
          <Text
            style={[
              styles.employeeStatusText,
              {
                color: statusStyles.color,
              },
            ]}
          >
            {attendanceStatus}
          </Text>
        </View>
      </View>
      <View style={styles.employeeActionsContainer}>
        <TouchableOpacity activeOpacity={0.8} onPress={onAttendanceEdit}>
          <Ionicons name="create-outline" size={22} color={colors.warning} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={onAttendanceDelete}>
          <Ionicons name="trash-outline" size={22} color={colors.danger} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AttendanceMarkCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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

  employeeInfoContainer: {
    flexDirection: "column",
  },

  employeeNameTextStyle: {
    fontFamily: "DINBold",
    fontSize: 17,
    color: colors.text,
  },

  employeePositionText: {
    fontFamily: "DINRegular",
    fontSize: 14,
    color: colors.subtext,
  },

  employeeNameContainer: {
    flexDirection: "row",
  },

  employeePositionContainer: {
    flexDirection: "row",
    marginTop: 7,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  employeeDepartmentText: {
    fontFamily: "DINRegular",
    fontSize: 14,
    color: colors.subtext,
  },

  employeeDesignationText: {
    fontFamily: "DINRegular",
    fontSize: 14,
    color: colors.subtext,
    marginTop: 3,
  },

  employeeStatusContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    marginTop: 14,
    borderColor: colors.border,
  },

  employeeStatusMarked: {
    width: 6,
    height: 6,
    borderRadius: 100,
    marginRight: 5,
  },

  employeeStatusText: {
    fontFamily: "DINMedium",
    color: colors.primaryDark,
  },

  employeeActionsContainer: {
    flexDirection: "column",
    gap: 20,
  },
});
