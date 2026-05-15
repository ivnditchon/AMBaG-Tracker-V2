import Header from "@/components/Layout/Header";
import DualButton from "@/components/UI/Header/DualButton";
import HeaderLeftTitle from "@/components/UI/Header/HeaderLeftTitle";
import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MainLayout from "./main-layout";

const attendance = () => {
  const [activeTab, setActiveTab] = useState<"Mark" | "View">("Mark");
  const [attendanceDate, setAttendanceDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleButton1 = () => setActiveTab("Mark");
  const handleButton2 = () => setActiveTab("View");

  const showDate = () => setShowPicker(true);
  const onDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setAttendanceDate(selectedDate);
    }
  };

  return (
    <MainLayout>
      <View style={styles.container}>
        <Header
          customHeaderContainer={styles.headerContainer}
          leftComponent={<HeaderLeftTitle label="Track" title="Attendance" />}
          rightComponent={
            <DualButton
              leftLabel="Mark"
              iconLeftActive="pencil"
              iconLeftInactive="pencil-outline"
              rightLabel="View"
              iconRightActive="eye"
              iconRightInactive="eye-off-outline"
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

  headerButtonContainer: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },

  headerButtonTitle: {
    fontSize: 14,
    marginLeft: 5,
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
    backgroundColor: "rgba(0,0,0,0.5)", // Madilim na background sa likod
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
});
