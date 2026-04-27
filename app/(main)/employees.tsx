import Header from "@/components/Layout/Header";
import Button from "@/components/UI/Button";
import Dropdown from "@/components/UI/Dropdown";
import Input from "@/components/UI/Input";
import Form from "@/components/UI/Modal";
import SearchBar from "@/components/UI/SearchBar";
import SummaryItem, { SummaryItemProps } from "@/components/UI/SummaryItem";
import { colors } from "@/constants/colors";
import { globalStyles } from "@/styles/globalStyle";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Snackbar } from "react-native-paper";
import MainLayout from "./main-layout";

type EmployeesProps = {
  firstName: string;
  middleName: string;
  lastName: string;
  position: string;
  department: string;
  designation: string;
  status: "Active" | "Inactive";
};

type ValidationErrorProps = {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  position?: string;
  department?: string;
  designation?: string;
};

const Employees = () => {
  const [visible, setVisible] = useState(false); // Snackbar
  const [isFormVisible, setFormVisible] = useState(false); // Form modal
  const [employees, setEmployees] = useState<EmployeesProps[]>([]); // Data storage temporarily for Employees
  const [firstName, setFirstName] = useState<string>("");
  const [middleName, setMiddleName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [designation, setDesignation] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active"); // Union type - allow active and inactive only
  const [search, setSearch] = useState<string>("");
  const [emptyFieldError, setValidationError] = useState<ValidationErrorProps>(
    {},
  );

  const validateForm = () => {
    const errors: ValidationErrorProps = {};

    if (firstName.trim() === "") {
      errors.firstName = "First name is required!";
    }
    if (middleName.trim() === "") {
      errors.middleName = "Middle name is required!";
    }
    if (lastName.trim() === "") {
      errors.lastName = "Last name is requred!";
    }
    if (position === "") {
      errors.position === "Position is required!";
    }
    if (designation === "") {
      errors.designation === "Designation is required!";
    }

    return errors;
  };

  // Reset form after submission
  const resetForm = () => {
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setPosition("");
    setDesignation("");
    setDepartment("");
    setStatus("Active");
  };

  const handleAddemployee = () => {
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setValidationError(errors);
    } else {
      const newEmployee: EmployeesProps = {
        firstName: firstName, // Comes from Props: Value(state)
        middleName: middleName,
        lastName: lastName,
        position: position,
        department: department,
        designation: designation,
        status: status,
      };

      setEmployees((prev) => [...prev, newEmployee]); // Get all employees from Employees and copy (...prev) all employees + new employee
      resetForm(); // Reset form after submission
      setValidationError({}); // Clear errrors
      setFormVisible(false); // Closed the form modal
      setVisible(true); // Show snackbar
    }
  };

  const employeeSummaryData: SummaryItemProps[] = [
    {
      value: employees.length,
      label: "Total",
      customValueStyle: colors.primaryLight,
      showDivider: true,
    },
    {
      value: employees.filter((emp) => emp.status === "Active").length,
      label: "Active",
      customValueStyle: colors.whiteFaded,
      showDivider: true,
    },
    {
      value: employees.filter((emp) => emp.status === "Inactive").length,
      label: "Inactive",
      customValueStyle: colors.dangerFaded,
      showDivider: false,
    },
  ];

  const handleOpenAddForm = () => {
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
    "Project Developmemnt Officer I",
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
    "Liaison Officer",
  ];
  // PMO Department
  const departments = [
    "General Service",
    "Monitoring",
    "Communication",
    "Technical",
    "Admin",
  ];
  // PMO Status
  const statusOptions = ["Active", "Isactive"];

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
              onPress={handleOpenAddForm}
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
        <View style={{ padding: 20 }}>
          {" "}
          {/** Content */}
          <SearchBar
            value={search.trim()}
            placeHolder="Seach name, position, department..."
            onChangeText={(newText) => setSearch(newText)}
          />
        </View>
        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          duration={2000}
        >
          Employee added successfully ✅
        </Snackbar>
      </View>
      <Form
        title="Add Employee"
        subTitle="Fill in the employee details below"
        icon="person-add"
        visible={isFormVisible}
        onClose={() => setFormVisible(false)}
        onSubmit={handleAddemployee}
      >
        <View style={styles.inputContainer}>
          <Input
            label="FIRST NAME"
            value={firstName.trim()}
            placeHolder="e.g Ivan"
            onChangeText={(newText) => setFirstName(newText)}
            error={emptyFieldError.firstName}
          />
          <Input
            label="MIDDLE NAME"
            value={middleName.trim()}
            placeHolder="e.g Hanma"
            onChangeText={(newText) => setMiddleName(newText)}
            error={emptyFieldError.middleName}
          />
          <Input
            label="LAST NAME"
            value={lastName.trim()}
            placeHolder="e.g Hanma"
            onChangeText={(newText) => setLastName(newText)}
            error={emptyFieldError.lastName}
          />
          <Dropdown
            label="POSITION"
            value={position}
            onValueChange={setPosition}
            items={positions}
            placeholder="Select position"
          />
          <Dropdown
            label="DESIGNATION"
            value={designation}
            onValueChange={setDesignation}
            items={designations}
            placeholder="Select designation"
          />
          <Dropdown
            label="DEPARTMENT"
            value={department}
            onValueChange={setDepartment}
            items={departments}
            placeholder="Select department"
          />
          <Dropdown
            label="STATUS"
            value={status}
            onValueChange={(value) => setStatus(value as "Active" | "Inactive")}
            items={statusOptions}
            placeholder="Select status"
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
