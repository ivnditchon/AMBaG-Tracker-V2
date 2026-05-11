import { colors } from "@/constants/colors";
import { HeaderRightProps } from "@/types/types";
import { usePathname } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import Button from "./Button";

// Constant
const EMPLOYEE_PMO = "PMO";
const EMPLOYEE_DO = "DO";
const ATTENDANCE_MARK = "MARK";
const ATTENDANCE_VIEW = "VIEW";

const HeaderRight = ({ activeRole, onPress1, onPress2 }: HeaderRightProps) => {
  const pathName = usePathname();
  const isEmployees = pathName.includes("/employees");
  const isAttendance = pathName.includes("/attendance");

  return (
    <View>
      {(isEmployees || isAttendance) && (
        <View style={styles.container}>
          <Button
            title={isEmployees ? EMPLOYEE_PMO : ATTENDANCE_MARK}
            customContainerStyle={[
              styles.buttonContainer,
              {
                backgroundColor: isEmployees
                  ? activeRole === EMPLOYEE_PMO
                    ? colors.primaryLight
                    : "transparent"
                  : isAttendance
                    ? activeRole === ATTENDANCE_MARK
                      ? colors.primaryLight
                      : "transparent"
                    : undefined,
              },
            ]}
            customTitleStyle={[
              styles.buttonTitle,
              {
                color: isEmployees
                  ? activeRole === EMPLOYEE_PMO
                    ? colors.primaryDark
                    : colors.primaryLight
                  : isAttendance
                    ? activeRole === ATTENDANCE_MARK
                      ? colors.primaryDark
                      : colors.primaryLight
                    : undefined,
              },
            ]}
            icon={
              isEmployees
                ? activeRole === EMPLOYEE_PMO
                  ? "people"
                  : "people-outline"
                : isAttendance
                  ? activeRole === ATTENDANCE_MARK
                    ? "pencil"
                    : "pencil-outline"
                  : undefined
            }
            iconSize={18}
            iconColor={
              isEmployees
                ? activeRole === EMPLOYEE_PMO
                  ? colors.primaryDark
                  : colors.primaryLight
                : isAttendance
                  ? activeRole === ATTENDANCE_MARK
                    ? colors.primaryDark
                    : colors.primaryLight
                  : undefined
            }
            onPress={onPress1}
          />
          <Button
            title={isEmployees ? EMPLOYEE_DO : ATTENDANCE_VIEW}
            customContainerStyle={[
              styles.buttonContainer,
              {
                backgroundColor: isEmployees
                  ? activeRole === EMPLOYEE_DO
                    ? colors.primaryLight
                    : "transparent"
                  : isAttendance
                    ? activeRole === ATTENDANCE_VIEW
                      ? colors.primaryLight
                      : "transparent"
                    : undefined,
              },
            ]}
            customTitleStyle={[
              styles.buttonTitle,
              {
                color: isEmployees
                  ? activeRole === EMPLOYEE_DO
                    ? colors.primaryDark
                    : colors.primaryLight
                  : isAttendance
                    ? activeRole === ATTENDANCE_VIEW
                      ? colors.primaryDark
                      : colors.primaryLight
                    : undefined,
              },
            ]}
            icon={
              isEmployees
                ? activeRole === EMPLOYEE_DO
                  ? "people"
                  : "people-outline"
                : isAttendance
                  ? activeRole === ATTENDANCE_VIEW
                    ? "eye"
                    : "eye-off"
                  : undefined
            }
            iconSize={18}
            iconColor={
              isEmployees
                ? activeRole === EMPLOYEE_DO
                  ? colors.primaryDark
                  : colors.primaryLight
                : isAttendance
                  ? activeRole === ATTENDANCE_VIEW
                    ? colors.primaryDark
                    : colors.primaryLight
                  : undefined
            }
            onPress={onPress2}
          />
        </View>
      )}
    </View>
  );
};

export default HeaderRight;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "flex-start",
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 5,
    gap: 2,
  },

  buttonContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: colors.primaryLight,
  },

  buttonTitle: {
    fontSize: 14,
    marginLeft: 5,
  },
});
