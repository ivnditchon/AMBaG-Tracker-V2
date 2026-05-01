import Header from "@/components/Layout/Header";
import Avatar from "@/components/UI/Avatar";
import SummaryItem, { SummaryItemProps } from "@/components/UI/SummaryItem";
import { colors } from "@/constants/colors";
import { useEmployees } from "@/context/EmployeeContext";
import { globalStyles } from "@/styles/globalStyle";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import MainLayout from "./main-layout";

type EmployeesProps = {
  ID: string;
  firstName: string;
  middleName: string;
  lastName: string;
  position: string;
  department: string;
  status: "Active" | "Inactive" | "Pending" | "On Leave";
};

// Static data (outside component to prevent re-render)
const getDashboardSummaryData = (
  employees: EmployeesProps[],
): SummaryItemProps[] => [
  {
    value: employees.length,
    label: "Total Staff",
  },
  {
    value: 40,
    label: "Present",
  },
  {
    value: 8,
    label: "Absent",
  },
  {
    value: 10,
    label: "Late",
  },
];

// Main component
const Dashboard = () => {
  const { employees, loading } = useEmployees();

  if (loading) return null;

  const dashboardSummaryData = getDashboardSummaryData(employees);

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) {
      return "Good morning 🌤️";
    } else if (hour < 18) {
      return "Good afternoon ☀️";
    } else {
      return "Good evening 🌙";
    }
  };

  const greeting = getGreeting();

  const getToday = new Date().toLocaleDateString("en-PH", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Load employees when dashboard screen opens

  return (
    <MainLayout>
      <View style={styles.content}>
        <Header
          leftComponent={
            <View style={globalStyles.headerLeftComponentContainer}>
              <Text style={globalStyles.headerScreenLabel}>{greeting}</Text>
              <Text style={globalStyles.headerScreenTitle}>Admin Panel</Text>
              <Text style={styles.dateText}>{getToday}</Text>
            </View>
          }
          rightComponent={
            <View style={globalStyles.headerRightComponentContainer}>
              <View style={styles.bellContainer}>
                <Ionicons
                  name="notifications-outline"
                  size={22}
                  color={colors.primaryLight}
                />
              </View>
              <View style={styles.avatar}>
                <Avatar initial="NG" />
              </View>
            </View>
          }
          bottomComponent={
            <FlatList
              contentContainerStyle={globalStyles.headerBottomSummaryContainer}
              data={dashboardSummaryData}
              keyExtractor={(_, index) => index.toString()} // There is no Id
              renderItem={({ item }) => (
                <SummaryItem value={item.value} label={item.label} />
              )}
            />
          }
        />
      </View>
    </MainLayout>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  content: {
    // Pushes footer below
    flex: 1,
  },

  dateText: {
    fontFamily: "DINMedium",
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    letterSpacing: 0.5,
    fontWeight: 600,
  },
  // End

  bellContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },

  avatar: {
    marginLeft: 10,
  },
  // End
});
