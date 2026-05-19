import Card from "@/components/Cards/Card";
import CardInfo from "@/components/Cards/CardInfo";
import CardStatus from "@/components/Cards/CardStatus";
import Header from "@/components/Layout/Header";
import Button from "@/components/UI/Button";
import DualButton from "@/components/UI/Header/DualButton";
import HeaderLeftTitle from "@/components/UI/Header/HeaderLeftTitle";
import { colors } from "@/constants/colors";
import { useAmbag } from "@/context/AmbagContext";
import { EmployeeWithAttendanceStatus } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MainLayout from "./main-layout";

const ATTENDANCE_BUTTONS = [
  {
    title: "Present",
    icon: "checkmark-done-circle-outline",
    color: colors.primaryDark,
    active: colors.primaryLight,
  },
  {
    title: "Absent",
    icon: "close-circle-outline",
    color: colors.danger,
    active: colors.dangerLight,
  },
  {
    title: "Late",
    icon: "time-outline",
    color: colors.warning,
    active: colors.warningLight,
  },
  {
    title: "Half Day",
    icon: "hourglass-outline",
    color: colors.purple,
    active: colors.purpleLight,
  },
  {
    title: "On Leave",
    icon: "calendar-outline",
    color: colors.blue,
    active: colors.blueLight,
  },
];

const attendance = () => {
  const {
    employeesForCurrentDate,
    selectedDate,
    setSelectedDate,
    updateAttendanceStatus,
  } = useAmbag();

  const [activeTab, setActiveTab] = useState<"MARK" | "VIEW">("MARK");
  const [showPicker, setShowPicker] = useState(false);

  const attendanceDate = useMemo(() => new Date(selectedDate), [selectedDate]);

  const handleButton1 = () => setActiveTab("MARK");
  const handleButton2 = () => setActiveTab("VIEW");

  const showDate = () => setShowPicker(true);
  const onDateChange = (event: any, date?: Date) => {
    if (date) {
      const formattedDate = date.toISOString().split("T")[0];
      setSelectedDate(formattedDate);
    }
  };

  const filteredEmployees = useMemo((): EmployeeWithAttendanceStatus[] => {
    return employeesForCurrentDate.filter((e) => e.role === "PMO");
  }, [employeesForCurrentDate]);

  const renderItem = useCallback(
    ({ item }: { item: EmployeeWithAttendanceStatus }) => {
      const currentStatus = item.attendanceStatus;
      const isMarked = item.hasMarked;

      return (
        <Card
          listType={`${activeTab}_ATTENDANCE`}
          topLeftComponent={
            <CardInfo
              firstName={item.firstName}
              lastName={item.lastName}
              position={item.position}
              department={item.department}
            />
          }
          topRightComponent={
            <CardStatus status={currentStatus || "Not marked yet"} />
          }
          bottomComponent={
            <View style={styles.buttonContainer}>
              {ATTENDANCE_BUTTONS.map((btn) => {
                const isActive = currentStatus === btn.title;
                return (
                  <Button
                    key={btn.title}
                    title={btn.title}
                    customContainerStyle={[
                      styles.buttonStyle,
                      isActive && {
                        borderColor: btn.color,
                        backgroundColor: btn.active,
                      },
                    ]}
                    customTitleStyle={[
                      styles.buttonTextStyle,
                      isActive && { color: btn.color },
                    ]}
                    icon={btn.icon as any}
                    iconSize={16}
                    iconColor={btn.color}
                    onPress={() => {
                      updateAttendanceStatus(item.id, btn.title as any);
                    }}
                  />
                );
              })}
            </View>
          }
        />
      );
    },
    [activeTab, updateAttendanceStatus],
  );

  return (
    <MainLayout>
      <View style={styles.container}>
        <Header
          customHeaderContainer={styles.headerContainer}
          topLeftComponent={
            <HeaderLeftTitle label="Track" title="Attendance" />
          }
          topRightComponent={
            <DualButton
              leftLabel="Mark"
              leftActiveIcon="pencil"
              leftIcon="pencil-outline"
              rightLabel="View"
              rightActiveIcon="eye"
              rightIcon="eye-off-outline"
              onLeftPress={handleButton1}
              onRightPress={handleButton2}
              isActive={activeTab}
            />
          }
          bottomComponent={
            <View style={styles.selectedDateContainer}>
              <View style={styles.selectedDateLeft}>
                <Text style={styles.calendarIcon}>📅</Text>
                <View style={styles.dateInfoContainer}>
                  <Text style={styles.selectedDateLabel}>SELECTED DATE</Text>
                  <Text style={styles.selectedDate}>
                    {attendanceDate.toDateString()}
                  </Text>
                </View>
              </View>
              <View>
                <TouchableOpacity
                  onPress={showDate}
                  style={styles.selectedDateButtonContainer}
                >
                  <Text style={styles.selectedDateButtonLabel}>
                    {attendanceDate.toLocaleDateString()}
                  </Text>
                  <Ionicons
                    name="calendar-outline"
                    size={18}
                    color={colors.primaryLight}
                  />
                </TouchableOpacity>
                <Modal
                  visible={showPicker}
                  transparent={true}
                  animationType="slide"
                >
                  <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                      {/* Modal header */}
                      <View style={styles.modalHeader}>
                        <TouchableOpacity onPress={() => setShowPicker(false)}>
                          <Text
                            style={{
                              color: colors.primaryDark,
                              fontWeight: "bold",
                              fontSize: 18,
                            }}
                          >
                            Done
                          </Text>
                        </TouchableOpacity>
                      </View>

                      <DateTimePicker
                        value={attendanceDate}
                        mode="date"
                        display="spinner"
                        onChange={onDateChange}
                        textColor="black"
                        style={{ alignSelf: "center", width: "100%" }}
                      />
                    </View>
                  </View>
                </Modal>
              </View>
            </View>
          }
        />
        {/** Main Content */}
        <View style={styles.mainContent}>
          <Text>TODAY'S ATTENDANCE -</Text>
          <FlatList<EmployeeWithAttendanceStatus>
            data={filteredEmployees}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.attendanceListContentContainerStyle}
            // Performance props
            initialNumToRender={10}
            maxToRenderPerBatch={5}
            windowSize={5}
            removeClippedSubviews={true} // For android lag
          />
        </View>
      </View>
    </MainLayout>
  );
};

export default attendance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerContainer: {
    height: 220,
  },

  rightComponentContainer: {
    flexDirection: "row",
    alignSelf: "flex-start",
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 3,
  },

  selectedDateContainer: {
    justifyContent: "space-between",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  selectedDateLeft: {
    flexDirection: "row",
  },

  calendarIcon: {
    fontSize: 32,
  },

  dateInfoContainer: {
    marginLeft: 10,
  },

  selectedDateLabel: {
    fontFamily: "DINMedium",
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    letterSpacing: 0.5,
    fontWeight: 600,
  },

  selectedDateButtonLabel: {
    fontFamily: "DINMedium",
    fontSize: 18,
    color: colors.primaryLight,
    marginRight: 10,
  },

  selectedDate: {
    fontFamily: "DINBold",
    fontSize: 16,
    color: colors.primaryLight,
    marginTop: 5,
  },

  selectedDateButtonContainer: {
    justifyContent: "space-between",
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
  },
  modalHeader: {
    height: 50,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  mainContent: {
    flex: 1,
    paddingHorizontal: 25,
  },

  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    gap: 10,
    justifyContent: "flex-start",
  },

  buttonStyle: {
    backgroundColor: colors.inputBg,
    borderWidth: 1,
    borderColor: colors.softGray,
    paddingVertical: 7,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },

  buttonTextStyle: {
    fontFamily: "DINBold",
    color: colors.gray,
    fontSize: 14,
    textAlign: "center",
  },

  attendanceListContentContainerStyle: {
    gap: 10,
  },
});
