import Header from "@/components/Layout/Header";
import HeaderRight from "@/components/UI/HeaderRight";
import { globalStyles } from "@/styles/globalStyle";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MainLayout from "./main-layout";

const attendance = () => {
  const [activeTab, setActiveTab] = useState<"MARK" | "VIEW">("MARK");

  const handleButton1 = () => setActiveTab("MARK");
  const handleButton2 = () => setActiveTab("VIEW");
  return (
    <MainLayout>
      <View style={styles.container}>
        <Header
          customHeaderContainer={styles.headerContainer}
          leftComponent={
            <View>
              <Text style={globalStyles.headerLabel}>Track</Text>
              <Text style={globalStyles.headerTitle}>Attendance</Text>
            </View>
          }
          rightComponent={
            <HeaderRight
              activeRole={activeTab}
              onPress1={handleButton1}
              onPress2={handleButton2}
            />
          }
          /** 
          rightComponent={
            <View style={styles.rightComponentContainer}>
              <Button
                title="Mark"
                icon={
                  activeRole === "MARK_ATTENDANCE" ? "pencil" : "pencil-outline"
                }
                iconSize={20}
                iconColor={
                  activeRole === "MARK_ATTENDANCE"
                    ? colors.primaryDark
                    : colors.primaryLight
                }
                customContainerStyle={[
                  styles.headerButtonContainer,
                  {
                    backgroundColor:
                      activeRole === "MARK_ATTENDANCE"
                        ? colors.primaryLight
                        : "transparent",
                  },
                ]}
                customTitleStyle={[
                  styles.headerButtonTitle,
                  {
                    color:
                      activeRole === "MARK_ATTENDANCE"
                        ? colors.primaryDark
                        : colors.primaryLight,
                  },
                ]}
                onPress={handleMarkAttendance}
              /> 

              <Button
                title="View"
                icon={
                  activeRole === "VIEW_ATTENDANCE" ? "eye" : "eye-off-outline"
                }
                iconSize={20}
                iconColor={
                  activeRole === "VIEW_ATTENDANCE"
                    ? colors.primaryDark
                    : colors.primaryLight
                }
                customContainerStyle={[
                  styles.headerButtonContainer,
                  {
                    backgroundColor:
                      activeRole === "VIEW_ATTENDANCE"
                        ? colors.primaryLight
                        : "transparent",
                  },
                ]}
                customTitleStyle={[
                  styles.headerButtonTitle,
                  {
                    color:
                      activeRole === "VIEW_ATTENDANCE"
                        ? colors.primaryDark
                        : colors.primaryLight,
                  },
                ]}
                onPress={handleViewAttendance}
              />
            </View>
          } */
          bottomComponent={<View></View>}
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
});
