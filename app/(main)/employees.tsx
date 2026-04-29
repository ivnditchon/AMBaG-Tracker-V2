import EmployeeCard from "@/components/cards/EmployeeCard";
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
import { Alert, FlatList, Image, StyleSheet, Text, View } from "react-native";
import { Snackbar } from "react-native-paper";
import MainLayout from "./main-layout";

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

// Static data (outside component to prevent re-render)
const getSummaryData = (employees: EmployeesProps[]): SummaryItemProps[] => [
  // parameter of employees with a type of EmployeeProps[], return type - this function MUST return of SummaryItemProps[]
  {
    value: employees.length,
    label: "Total",
  },
  {
    value: employees.filter((emp) => emp.status === "Active").length,
    label: "Active",
  },
  {
    value: employees.filter((emp) => emp.status === "Inactive").length,
    label: "Inactive",
  },
  {
    value: employees.filter((emp) => emp.status === "Pending").length,
    label: "Pending",
  },
  {
    value: employees.filter((emp) => emp.status === "On Leave").length,
    label: "On Leave",
  },
];

const Employees = () => {
  const [visible, setVisible] = useState(false); // Snackbar
  const [isFormVisible, setFormVisible] = useState(false); // Form modal
  const [employees, setEmployees] = useState<EmployeesProps[]>([]);
  const [search, setSearch] = useState<string>("");
  const [emptyFieldError, setValidationError] = useState<ValidationErrorProps>(
    {},
  );

  // Select employee ID for edit (string if the user select employee which is the ID is string type and null is default or initial value
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
    null,
  );

  // This will be the initial value of input, empty string
  const [form, setForm] = useState<EmployeesProps>({
    id: "",
    firstName: "",
    middleName: "",
    lastName: "",
    position: "",
    department: "",
    status: "Active", // Default status
  });

  const employeeSummaryData = getSummaryData(employees);

  const validateForm = () => {
    const errors: ValidationErrorProps = {};

    if (form.firstName.trim() === "") {
      errors.firstName = "First name is required!";
    }
    if (form.middleName.trim() === "") {
      errors.middleName = "Middle name is required!";
    }
    if (form.lastName.trim() === "") {
      errors.lastName = "Last name is requred!";
    }
    if (form.position === "") {
      errors.position = "Position is required!";
    }
    if (form.department === "") {
      errors.department = "Position is required!";
    }

    return errors;
  };

  // Reset form after submission
  const resetForm = () => {
    setForm({
      id: "",
      firstName: "",
      middleName: "",
      lastName: "",
      position: "",
      department: "",
      status: "Active",
    });
    setSelectedEmployeeId(null);
  };

  const handleSubmitEmployee = () => {
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setValidationError(errors);
      return;
    }

    if (selectedEmployeeId) {
      // Update existing employee
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === selectedEmployeeId ? { ...emp, ...form } : emp,
        ),
      );
    } else {
      // Add new employee
      const newEmployee: EmployeesProps = {
        id: Date.now().toString(),
        firstName: form.firstName, // Comes from Props: Value(state)
        middleName: form.middleName,
        lastName: form.lastName,
        position: form.position,
        department: form.department,
        status: form.status,
      };
      setEmployees((prev) => [...prev, newEmployee]); // Get all employees from Employees and copy (...prev) all employees + new employee
    }
    resetForm(); // Reset form after submission
    setValidationError({}); // Clear errrors
    setFormVisible(false); // Closed the form modal
    setVisible(true); // Show snackbar
  };

  // Delete employee
  const handleDeleteEmployee = (
    id: string,
    firstName: string,
    lastName: string,
  ) => {
    Alert.alert(
      "Delete Employee", // Title
      `Are you sure you want to delete ${firstName} ${lastName}?`, // Message
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive", // Shows red on iOS
          onPress: () =>
            setEmployees((prev) => prev.filter((emp) => emp.id !== id)),
        },
      ],
    );
  };

  // Edit employee
  const handleEditEmployee = (employee: EmployeesProps) => {
    setForm(employee); // Copy all employee data into form
    setSelectedEmployeeId(employee.id); // Get employee Id, this id will determine whos employee to be edited
    setFormVisible(true); //
  };

  const handleOpenAddForm = () => {
    setFormVisible(true);
  };

  const handleClosedForm = () => {
    setFormVisible(false);
    resetForm();
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
            <FlatList
              contentContainerStyle={styles.headerContentContainerStyle}
              data={employeeSummaryData}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <SummaryItem value={item.value} label={item.label} />
              )}
            />
          }
        />
        <View style={styles.mainContent}>
          {/** Content */}
          <SearchBar
            value={search.trim()}
            placeHolder="Seach name, position, department..."
            onChangeText={(newText) => setSearch(newText)}
          />
          <Text style={styles.employeeCount}>
            {employees.length}{" "}
            {employees.length === 1 ? "EMPLOYEE" : "EMPLOYEES"} FOUND
          </Text>
          {/** Employee list scrollable */}
          <FlatList
            data={employees}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <EmployeeCard
                firstName={item.firstName}
                lastName={item.lastName}
                position={item.position}
                department={item.department}
                status={item.status}
                onEdit={() => handleEditEmployee(item)}
                onDelete={() =>
                  handleDeleteEmployee(item.id, item.firstName, item.lastName)
                }
              />
            )}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            ListEmptyComponent={
              <View style={styles.mainContentListEmptyComponent}>
                <Image
                  source={require("@/assets/images/Group-12.png")}
                  resizeMode="contain"
                  style={styles.mainContentFlatListImage}
                />
                <Text style={styles.mainContentListEmptyComponentText}>
                  Whoops! No employees found.
                </Text>
              </View>
            }
            contentContainerStyle={styles.mainContentContainerStyle}
            showsVerticalScrollIndicator={false} // hides the scrollbar
            style={styles.mainContentFlatListStyle} // 👈 takes remaining space
            keyboardShouldPersistTaps="handled"
          />
          <Snackbar
            visible={visible}
            onDismiss={() => setVisible(false)}
            duration={2000}
            style={styles.snackbar}
          >
            <Text style={styles.snackBarText}>
              {selectedEmployeeId
                ? "Employee updated successfully ✅"
                : "Employee added successfully ✅"}
            </Text>
          </Snackbar>
        </View>
      </View>
      <Form
        title={selectedEmployeeId ? "Edit Employee" : "Add Employee"}
        subTitle={
          selectedEmployeeId
            ? "Edit the employee details below"
            : "Fill in the employee details below"
        }
        icon="person-add"
        visible={isFormVisible}
        onClose={handleClosedForm}
        onSubmit={handleSubmitEmployee}
        buttonTitle={selectedEmployeeId ? "Update Employee" : "Add Employee"}
      >
        <View style={styles.inputContainer}>
          <Input
            label="FIRST NAME"
            value={form.firstName.trim()}
            placeHolder="e.g Ivan"
            onChangeText={(newText) => setForm({ ...form, firstName: newText })} // Copy all the data from form (...form) then overwrites only the firstName
            error={emptyFieldError.firstName}
            autoCapitalize="words"
          />
          <Input
            label="MIDDLE NAME"
            value={form.middleName.trim()}
            placeHolder="e.g Hanma"
            onChangeText={(newText) =>
              setForm({ ...form, middleName: newText })
            }
            error={emptyFieldError.middleName}
            autoCapitalize="words"
          />
          <Input
            label="LAST NAME"
            value={form.lastName.trim()}
            placeHolder="e.g Hanma"
            onChangeText={(newText) => setForm({ ...form, lastName: newText })}
            error={emptyFieldError.lastName}
            autoCapitalize="words"
          />
          <Dropdown
            label="POSITION"
            value={form.position}
            onValueChange={(value) => setForm({ ...form, position: value })}
            items={positions}
            placeholder="Select position"
            error={emptyFieldError.position}
          />
          <Dropdown
            label="DEPARTMENT"
            value={form.department}
            onValueChange={(value) => setForm({ ...form, department: value })}
            items={departments}
            placeholder="Select department"
            error={emptyFieldError.department}
          />
          <Dropdown
            label="STATUS"
            value={form.status}
            onValueChange={(value) =>
              setForm({ ...form, status: value as EmployeesProps["status"] })
            }
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
    gap: 20,
    marginTop: 30,
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

  headerContentContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingHorizontal: 10,
    paddingVertical: 15,
  },

  employeeCount: {
    fontFamily: "DINBold",
    color: colors.subtext,
    alignSelf: "flex-start",
    marginTop: 30,
    fontSize: 16,
  },

  mainContentContainerStyle: {
    paddingBottom: 20,
    paddingTop: 20,
  },

  mainContentFlatListStyle: {
    flex: 1,
    width: "100%",
  },

  mainContentFlatListImage: {
    width: "100%",
    height: 200,
  },

  mainContentListEmptyComponent: {
    alignItems: "center",
    marginTop: 40,
  },

  mainContentListEmptyComponentText: {
    fontFamily: "DINMedium",
    fontSize: 16,
    color: colors.subtext,
    marginTop: 12,
  },
});
