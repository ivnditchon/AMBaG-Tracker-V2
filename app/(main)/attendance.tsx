import Card from "@/components/Cards/Card";
import Header from "@/components/Layout/Header";
import Button from "@/components/UI/Button";
import DualButton from "@/components/UI/Header/DualButton";
import HeaderLeftTitle from "@/components/UI/Header/HeaderLeftTitle";
import { colors } from "@/constants/colors";
import { useAmbag } from "@/context/AmbagContext";
import { UnifiedEmployee } from "@/types/types";
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

const attendance = () => {
  const { employees } = useAmbag();
  const [activeTab, setActiveTab] = useState<"MARK" | "VIEW">("MARK");
  const [attendanceDate, setAttendanceDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleButton1 = () => setActiveTab("MARK");
  const handleButton2 = () => setActiveTab("VIEW");

  const showDate = () => setShowPicker(true);
  const onDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setAttendanceDate(selectedDate);
    }
  };

  const displayData = useMemo(() => {
    return employees.filter((e) => e.role === "PMO");
  }, [employees, activeTab]);

  const renderItem = useCallback(
    ({ item }: { item: UnifiedEmployee }) => (
      <Card
        listType={`${activeTab}_ATTENDANCE`}
        topLeftComponent={
          <View>
            <View style={{ flexDirection: "row" }}>
              <Text>{item.firstName}</Text>
              <Text>{item.lastName}</Text>
            </View>
            <Text>{item.position}</Text>
            <Text>{item.department}</Text>
          </View>
        }
        topRightComponent={<Text>Not yet marked</Text>}
        bottomComponent={
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              justifyContent: "space-between",
            }}
          >
            <Button
              title="Present"
              customContainerStyle={styles.buttonContainer}
              customTitleStyle={styles.buttonTextStyle}
              icon="checkmark-done"
              iconSize={18}
              iconColor={colors.primaryDark}
              onPress={() => console.log()}
            />
            <Button
              title="Absent"
              customContainerStyle={styles.buttonContainer}
              customTitleStyle={styles.buttonTextStyle}
              icon="checkmark-done"
              iconSize={18}
              iconColor={colors.primaryDark}
              onPress={() => console.log()}
            />
            <Button
              title="Late"
              customContainerStyle={styles.buttonContainer}
              customTitleStyle={styles.buttonTextStyle}
              icon="checkmark-done"
              iconSize={18}
              iconColor={colors.primaryDark}
              onPress={() => console.log()}
            />
            <Button
              title="Half day"
              customContainerStyle={styles.buttonContainer}
              customTitleStyle={styles.buttonTextStyle}
              icon="checkmark-done"
              iconSize={18}
              iconColor={colors.primaryDark}
              onPress={() => console.log()}
            />
            <Button
              title="On Leave"
              customContainerStyle={styles.buttonContainer}
              customTitleStyle={styles.buttonTextStyle}
              icon="checkmark-done"
              iconSize={18}
              iconColor={colors.primaryDark}
              onPress={() => console.log()}
            />
          </View>
        }
      />
    ),
    [],
  );

  return (
    <MainLayout>
      <View style={styles.container}>
        <Header
          customHeaderContainer={styles.headerContainer}
          leftComponent={<HeaderLeftTitle label="Track" title="Attendance" />}
          rightComponent={
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
          <FlatList<UnifiedEmployee>
            data={displayData}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
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
    backgroundColor: colors.gray,
  },

  buttonTextStyle: {
    fontFamily: "DINBold",
  },
});
