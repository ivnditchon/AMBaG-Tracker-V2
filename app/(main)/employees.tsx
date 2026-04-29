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
import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import { Snackbar } from "react-native-paper";
import MainLayout from "./main-layout";
import EmployeeCard from "@/components/cards/EmployeeCard";
import Avatar from "@/components/UI/Avatar";

type EmployeesProps = {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  position: string;
  department: string;
  status: "Active" | "Inactive" | "Pending" | "On Leave";
};

type ValidationErrorProps = {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  position?: string;
  department?: string;
};

const Employees = () => {
  const [visible, setVisible] = useState(false); // Snackbar
  const [isFormVisible, setFormVisible] = useState(false); // Form modal
  const [employees, setEmployees] = useState<EmployeesProps[]>([]); // Data storage temporarily for Employees
  const [firstName, setFirstName] = useState<string>("");
  const [middleName, setMiddleName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [status, setStatus] = useState<"Active" | "Inactive" | "Pending" | "On Leave">("Active"); // Union type - allow active and inactive only
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
      errors.position = "Position is required!";
    }
    if (department === "") {
      errors.department = "Department is required!";
    }

    return errors;
  };

  // Reset form after submission
  const resetForm = () => {
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setPosition("");
    setDepartment("");
    setStatus("Active");
  };

  const handleAddemployee = () => {
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setValidationError(errors);
    } else {
      const newEmployee: EmployeesProps = {
        id: Date.now().toString(),
        firstName: firstName, // Comes from Props: Value(state)
        middleName: middleName,
        lastName: lastName,
        position: position,
        department: department,
        status: status,
      };

      setEmployees((prev) => [...prev, newEmployee]); // Get all employees from Employees and copy (...prev) all employees + new employee
      resetForm(); // Reset form after submission
      setValidationError({}); // Clear errrors
      setFormVisible(false); // Closed the form modal
      setVisible(true); // Show snackbar
    }
  };

  /** 
  const employeeSummaryData: SummaryItemProps[] = [
    {
      value: employees.length,
      label: "Total",
      customValueStyle: colors.primaryLight,
      showDivider: false,
    },
    {
      value: employees.filter((emp) => emp.status === "Active").length,
      label: "Active",
      customValueStyle: colors.whiteFaded,
      showDivider: false,
    },
    {
      value: employees.filter((emp) => emp.status === "Inactive").length,
      label: "Inactive",
      customValueStyle: colors.dangerFaded,
      showDivider: false,
    },
    {
      value: employees.filter((emp) => emp.status === "Pending").length,
      label: "Pending",
      customValueStyle: colors.warningFaded,
      showDivider: false,
    },
    {
      value: employees.filter((emp) => emp.status === "On Leave").length,
      label: "On Leave",
      customValueStyle: colors.purple,
      showDivider: false,
    },
  ];} */

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

  // PMO Department
  const departments = [
    "General Service",
    "Monitoring",
    "Communication",
    "Technical",
    "Admin",
  ];

  // PMO Status
  const statusOptions = ["Active", "Inactive", "Pending", "On Leave"];

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
        <View style={styles.mainContent}>
          {/** Content */}
          <SearchBar
            value={search.trim()}
            placeHolder="Seach name, position, department..."
            onChangeText={(newText) => setSearch(newText)}
          />
          <Text style={styles.employeeCount}>{employees.length} {employees.length === 1 ? "EMPLOYEE" : "EMPLOYEES"} FOUND</Text> 
          {/** Employee info section */}
          <View style={{width: "100%", flex: 1, marginTop: 20}}>
            <FlatList 
              data={employees}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => (
                <EmployeeCard 
                  firstName={item.firstName}
                  lastName={item.lastName}
                  position={item.position}
                  department={item.department}
                  status={item.status}
                  onEdit={() => console.log()}
                  onDelete={() => console.log()}
                />
              )}
              ItemSeparatorComponent={() => // Gap for every employee
                <View style={styles.itemSeparatorComponentContainer} />} 
              ListEmptyComponent={                                          // If employee is empty
                <View style={styles.listEmptyComponentContainer}>
                  <Image
                    source={require("@/assets/images/Group-12.png")}
                    resizeMode="contain"
                    style={styles.listEmptyComponentImage}  
                  />
                  <Text style={styles.listEmptyComponentText}>No employees found.</Text>
                </View>
              }
              contentContainerStyle={styles.contentContainerStyle}
            />
          </View>
          <Snackbar
            visible={visible}
            onDismiss={() => setVisible(false)}
            duration={3000}
            style={styles.snackbar}
          >
            <Text style={styles.snackBarText}>
              Employee added successfully ✅
            </Text>
          </Snackbar>
        </View>
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
            error={emptyFieldError.position}
          />
          <Dropdown
            label="DEPARTMENT"
            value={department}
            onValueChange={setDepartment}
            items={departments}
            placeholder="Select department"
            error={emptyFieldError.department}
          />
          <Dropdown
            label="STATUS"
            value={status}
            onValueChange={(value) => setStatus(value as "Active" | "Inactive" | "Pending" | "On Leave")}
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

  mainContent: {
    paddingTop: 25,
    paddingHorizontal: 25,
    flex: 1,
    alignItems: "center",
  },

  employeeCount: {
    fontFamily: "DINBold",
    fontSize: 16,
    color: colors.subtext,
    alignSelf: "flex-start",
    marginTop: 20,
    letterSpacing: 0.2
  },

  employeeInfoContainer: {
    flex: 1,
    flexDirection: "column", 
    gap: 15,
    marginTop: 20,
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
    flexDirection: "column",
    gap: 20,
    marginTop: 30,
    marginBottom: 10
  },

  snackbar: {
    width: "90%",
    position: "absolute",
    bottom: 20,
    backgroundColor: colors.primaryLight,
    borderRadius: 8,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },

  snackBarText: {
    fontFamily: "DINMedium",
    fontSize: 16,
    color: colors.text,
    textAlign: "center",
  },
  
  itemSeparatorComponentContainer: {
    height: 12
  },

  listEmptyComponentContainer: {
    alignItems: 'center', 
    marginTop: 40 
  },

  listEmptyComponentImage: {
    width: "100%", 
    height: 200
  },

  listEmptyComponentText: {
    color: 'gray', marginTop: 12 
  },

  contentContainerStyle: {
    paddingBottom: 20
  }
});
