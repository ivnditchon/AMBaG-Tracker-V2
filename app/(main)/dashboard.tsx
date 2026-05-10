import Header from "@/components/Layout/Header";
import Avatar from "@/components/UI/Avatar";
import SummaryItem from "@/components/UI/SummaryItem";
import { colors } from "@/constants/colors";
import { useAmbag } from "@/context/AmbagContext";
import { globalStyles } from "@/styles/globalStyle";
import { EmployeeSummaryData, UnifiedEmployee } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import MainLayout from "./main-layout";

// Static data (outside component to prevent re-render)
const getDashboardSummaryData = (
  employees: UnifiedEmployee[],
): EmployeeSummaryData[] => [
  {
    value: employees.length.toString(),
    label: "Total Staff",
    isMainSummary: true,
  },
  {
    value: "40",
    label: "Present out of 35 staff",
    isMainSummary: true,
  },
  {
    value: "40",
    label: "Complete Uniform",
    isMainSummary: true,
  },
  {
    value: "40",
    label: "Reports submitted",
    isMainSummary: true,
  },
];

// Main component
const Dashboard = () => {
  const { employees, loading } = useAmbag();

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

  if (loading) return null;

  return (
    <MainLayout>
      <View style={styles.content}>
        <Header
          customHeaderContainer={styles.headerContainer}
          leftComponent={
            <View style={globalStyles.headerLeftComponentContainer}>
              <Text style={globalStyles.headerLabel}>{greeting}</Text>
              <Text style={globalStyles.headerTitle}>Admin Panel</Text>
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
              contentContainerStyle={globalStyles.mainSummaryContainer}
              data={dashboardSummaryData}
              keyExtractor={(item) => item.label} // There is no Id
              renderItem={({ item }) => (
                <SummaryItem
                  value={item.value}
                  label={item.label}
                  isMainSummary={true}
                />
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

  headerContainer: {
    height: 255,
  },

  dateText: {
    fontFamily: "DINMedium",
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    letterSpacing: 0.5,
    fontWeight: 600,
    marginTop: 8,
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
