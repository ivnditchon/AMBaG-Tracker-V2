import Header from "@/components/Layout/Header";
import Button from "@/components/UI/Button";
import Dropdown from "@/components/UI/Dropdown";
import Input from "@/components/UI/Input";
import Form from "@/components/UI/Modal";
import SummaryItem, { SummaryItemProps } from "@/components/UI/SummaryItem";
import { colors } from "@/constants/colors";
import { globalStyles } from "@/styles/globalStyle";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MainLayout from "./main-layout";

const Employees = () => {
  const employeeSummaryData: SummaryItemProps[] = [
    {
      value: 50,
      label: "Total",
      customValueStyle: colors.primaryLight,
      showDivider: true,
    },
    {
      value: 42,
      label: "Active",
      customValueStyle: colors.whiteFaded,
      showDivider: true,
    },
    {
      value: 8,
      label: "Inactive",
      customValueStyle: colors.dangerFaded,
      showDivider: false,
    },
  ];

  const [isFormVisible, setFormVisible] = useState(false);
  const handleAddEmployee = () => {
    setFormVisible(true);
  };

  // Add employee
  const positions = [
    "Administrative Assistant VI",
    "Administrative Assistant V",
    "Administrative Assistant IV",
    "Administrative Assistant III",
    "Administrative Assistant II",
    "Administrative Assistant I",
  ];

  const departments = ["Technical", "Admin", "Monitoring", "Communication"];

  const [firstName, setFirstName] = useState<string>("");
  const [middleName, setMiddleName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [department, setDepartment] = useState<string>("");

  return (
    <MainLayout>
      <View style={styles.container}>
        <Header
          leftComponent={
            <View style={globalStyles.headerLeftComponentContainer}>
              <Text style={globalStyles.headerScreenLabel}>Manage</Text>
              <Text style={globalStyles.headerScreenTitle}>Employees</Text>
            </View>
          }
          rightComponent={
            <Button
              title="Add Employee"
              icon="add"
              iconSize={22}
              iconColor={colors.primary}
              customContainerStyle={styles.buttonContainer}
              customTitleStyle={styles.buttonTitle}
              onPress={handleAddEmployee}
            />
          }
          bottomComponent={
            <View style={globalStyles.summaryContainer}>
              {employeeSummaryData.map((item) => (
                <SummaryItem
                  key={item.label}
                  value={item.value}
                  label={item.label}
                  customValueStyle={item.customValueStyle}
                  showDivider={item.showDivider}
                />
              ))}
            </View>
          }
        />
      </View>
      <Form
        title="Add Employee"
        subTitle="Fill in the employee details below"
        icon="person-add"
        visible={isFormVisible}
        onClose={() => setFormVisible(false)}
      >
        <View style={styles.inputContainer}>
          <Input
            label="FIRST NAME"
            value={firstName.trim()}
            placeHolder="e.g Ivan"
            onChangeText={(newText) => setFirstName(newText)}
          />
          <Input
            label="MIDDLE NAME"
            value={middleName.trim()}
            placeHolder="e.g Hanma"
            onChangeText={(newText) => setMiddleName(newText)}
          />
          <Input
            label="LAST NAME"
            value={lastName.trim()}
            placeHolder="e.g Hanma"
            onChangeText={(newText) => setLastName(newText)}
          />
          <Dropdown
            label="POSITION"
            value={position}
            onValueChange={setPosition}
            items={positions}
            placeholder="Select position"
          />
          <Dropdown
            label="DEPARTMENT"
            value={department}
            onValueChange={setDepartment}
            items={departments}
            placeholder="Select department"
          />
        </View>
      </Form>
    </MainLayout>
  );
};

export default Employees;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  buttonContainer: {
    height: 45,
    width: 150,
    backgroundColor: colors.primaryLight,
  },

  buttonTitle: {
    fontSize: 16,
    color: colors.primary,
    marginLeft: 5,
  },

  inputContainer: {
    marginTop: 30,
  },
});
