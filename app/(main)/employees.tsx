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
import { Ionicons } from "@expo/vector-icons";

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

  // PMO Position
  const positions = [
    "Administrative Officer II",
    "Administrative Officer I",
    "Senior Administrative Assistant I",
    "Administrative Assistant VI",
    "Administrative Assistant V",
    "Administrative Assistant IV",
    "Administrative Assistant III",
    "Administrative Assistant II",
    "Administrative Assistant I",
    "Project Evaluation III",
    "Project Evaluation II",
    "Project Evaluation I",
    "Project Development Officer III",
    "Project Development Officer II",
    "Project Developmemnt Officer I"
  ];
  // PMO Designation
  const designations = [
    "Deputy Program Manager",
    "Admin and Finance Unit Head",
    "Budget Officer",
    "Planning Offer",
    "Procurement Officer",
    "Record Officer",
    "Database Controller",
    "Monitoring and Evaluation Unit Head",
    "Monitoring Officer",
    "Monioring and Communication Unit Head",
    "Multimedia Officer",
    "Communication Officer",
    "Human Resource Management Focal Person",
    "Assistant Information Officer",
    "Liaison Officer"
  ];
  // PMO Department
  const departments = ["General Service", "Monitoring", "Communication", "Technical", "Admin"];
  // PMO Status
  const statusOptions = ["Active", "Isactive"];

  const [firstName, setFirstName] = useState<string>("");
  const [middleName, setMiddleName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [designation, setDesignation] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [status, setStatus] = useState<string>("")

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
            icon="briefcase-outline"
          />
          <Dropdown
            label="DESIGNATION"
            value={designation}
            onValueChange={setDesignation}
            items={designations}
            placeholder="Select designation"
            icon="ribbon-outline"
          />
          <Dropdown
            label="DEPARTMENT"
            value={department}
            onValueChange={setDepartment}
            items={departments}
            placeholder="Select department"
            icon="business-outline"
          />
          <Dropdown
            label="STATUS"
            value={status}
            onValueChange={setStatus}
            items={statusOptions}
            placeholder="Select status"
            icon="checkmark-circle-outline"
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
