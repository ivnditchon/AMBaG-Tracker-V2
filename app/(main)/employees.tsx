import EmployeeCard from "@/components/cards/EmployeeCard";
import Header from "@/components/Layout/Header";
import Button from "@/components/UI/Button";
import Dropdown from "@/components/UI/Dropdown";
import Form from "@/components/UI/FormModal";
import Input from "@/components/UI/Input";
import SearchBar from "@/components/UI/SearchBar";
import SummaryItem from "@/components/UI/SummaryItem";
import { colors } from "@/constants/colors";
import { useEmployees } from "@/context/EmployeeContext";
import { globalStyles } from "@/styles/globalStyle";
import {
  EmployeeDepartment,
  EmployeeFormState,
  EmployeeSummaryData,
  PartnerHospitals,
  UnifiedEmployee,
  ValidationError,
} from "@/types/types";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MainLayout from "./main-layout";

// Static object data
const getEmployeesSummaryData = (
  employees: UnifiedEmployee[],
  isMainSummary: boolean,
  activeRole: string,
): EmployeeSummaryData[] => [
  ...(isMainSummary
    ? [
        {
          value: employees.length.toString(),
          label: "TOTAL",
<<<<<<< HEAD
          isMainSummary: false,
        },
        { value: "5", label: "DO", isMainSummary: false },
        { value: "5", label: "PMO", isMainSummary: false },
      ]
    : [
        {
          value: employees
            .filter((e) => e.status === "Active")
            .length.toString(),
          label: "Active",
          isMainSummary: true,
        },
        {
          value: employees
            .filter((e) => e.status === "Inactive")
            .length.toString(),
          label: "Inactive",
          isMainSummary: true,
        },
        {
          value: employees
            .filter((e) => e.status === "Pending")
            .length.toString(),
          label: "Pending",
          isMainSummary: true,
        },
=======
          isMainSummary: true,
        },
        {
          value: employees.filter((e) => e.role === "PMO").length.toString(),
          label: "PMO",
          isMainSummary: true,
        },
        {
          value: employees.filter((e) => e.role === "DO").length.toString(),
          label: "DO",
          isMainSummary: true,
        },
      ]
    : [
>>>>>>> b2fcf1208aaffc0f06fd3cc5bae8c06f3a36e8db
        ...(activeRole === "PMO"
          ? [
              {
                value: employees
<<<<<<< HEAD
                  .filter((e) => e.status === "On Leave")
                  .length.toString(),
                label: "On Leave",
                isMainSummary: true,
              },
            ]
          : []),
=======
                  .filter((e) => e.role === activeRole && e.status === "Active")
                  .length.toString(),
                label: "Active",
                isMainSummary: false,
              },
              {
                value: employees
                  .filter(
                    (e) => e.role === activeRole && e.status === "Inactive",
                  )
                  .length.toString(),
                label: "Inactive",
                isMainSummary: false,
              },
              {
                value: employees
                  .filter(
                    (e) => e.role === activeRole && e.status === "Pending",
                  )
                  .length.toString(),
                label: "Pending",
                isMainSummary: false,
              },
              {
                value: employees
                  .filter(
                    (e) => e.role === activeRole && e.status === "On Leave",
                  )
                  .length.toString(),
                label: "On Leave",
                isMainSummary: false,
              },
            ]
          : [
              {
                value: employees
                  .filter((e) => e.role === activeRole && e.status === "Active")
                  .length.toString(),
                label: "Active",
                isMainSummary: false,
              },
              {
                value: employees
                  .filter(
                    (e) => e.role === activeRole && e.status === "Inactive",
                  )
                  .length.toString(),
                label: "Inactive",
                isMainSummary: false,
              },
              {
                value: employees
                  .filter(
                    (e) => e.role === activeRole && e.status === "Pending",
                  )
                  .length.toString(),
                label: "Pending",
                isMainSummary: false,
              },
            ]),
>>>>>>> b2fcf1208aaffc0f06fd3cc5bae8c06f3a36e8db
      ]),
];

const employees = () => {
  const { employees, addEmployee, removeEmployee, loading } = useEmployees();

  if (loading) return null;

  const [activeRole, setActiveRole] = useState<"PMO" | "DO">("PMO");
  const [search, setSearch] = useState<string>("");
  const [isFormVissible, setFormVissible] = useState<boolean>(false);
  const [formValidationError, setFormValidationError] =
    useState<ValidationError>({});
  const [isDropdownActive, setDropDownActive] = useState<boolean>(false);

  // Pick one of the employee(default)
  const initialState: EmployeeFormState = {
    id: "",
    firstName: "",
    middleName: "",
    lastName: "",
    position: "",
    status: "Active",
    department: activeRole === "DO" ? "Admin" : "",
    assignedHospital: "",
  };

  const [form, setForm] = useState<EmployeeFormState>(initialState);

<<<<<<< HEAD
  const employeeMainSummaryData = getEmployeesSummaryData(
=======
  const employeesMainSummaryData = getEmployeesSummaryData(
>>>>>>> b2fcf1208aaffc0f06fd3cc5bae8c06f3a36e8db
    employees,
    true,
    activeRole,
  );
<<<<<<< HEAD
  const employeeSubSummaryData = getEmployeesSummaryData(
=======
  const employeesSubSummaryData = getEmployeesSummaryData(
>>>>>>> b2fcf1208aaffc0f06fd3cc5bae8c06f3a36e8db
    employees,
    false,
    activeRole,
  );

  const handlePmo = () => setActiveRole("PMO");
  const handleDo = () => {
    setActiveRole("DO");
    setDropDownActive(true);
  };

  const handleOpenForm = () => {
    setForm(initialState); // Reset the form to initial empty values
    setFormVissible(true); // Open the form
  };

  const handleClosedForm = () => {
    setForm(initialState);
    setFormVissible(false); // Close the form
  };

  const formValidation = () => {
    const errors: ValidationError = {};
    if (!form.firstName) {
      errors.firstName = "Firstname is required!";
    }
    if (!form.middleName) {
      errors.middleName = "Middlename is required!";
    }
    if (!form.lastName) {
      errors.lastName = "Lastname is required!";
    }
    if (!form.position) {
      errors.position = "Position is required!";
    }
    if (activeRole === "PMO") {
      if (!form.department) {
        errors.department = "Department is required!";
      }
    } else {
      if (!form.assignedHospital) {
        errors.assignedHospital = "Assigned Hospital is required!";
      }
    }

    return errors;
  };

  const handleSubmitEmployee = () => {
    const errors = formValidation();

    if (Object.keys(errors).length > 0) {
      setFormValidationError(errors);
      return; // Stop execution if there is an error
    } else {
      // Base data
      const baseData = {
        id: Date.now().toString(), // Generate temp Id
        firstName: form.firstName,
        middleName: form.middleName,
        lastName: form.lastName,
        position: form.position,
        status: form.status,
      };

      const newEmployee: UnifiedEmployee = {
        ...form,
        id: Date.now().toString(),
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        role: activeRole, // Add the role explicitly here
      } as UnifiedEmployee;
      addEmployee(newEmployee);
      handleClosedForm(); // Reset and close the form
    }
  };

  // Remove employee
  const handleRemoveEmployee = (
    id: string,
    firstName: string,
    lastName: string,
  ) => {
    Alert.alert(
      "Delete Employee", // Title
      `Are you sure you want to delete employee ${firstName} ${lastName}?`, // Message
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive", // Show red on iOS
          onPress: () => {
            removeEmployee(id);
          },
        },
      ],
    );
  };

  // PMO positions
  const positions = [
    "Project Developmemnt Officer I",
    "Project Development Officer II",
    "Project Development Officer III",
    "Project Evaluation I",
    "Project Evaluation II",
    "Project Evaluation III",
    "Administrative Officer I",
    "Administrative Officer II",
    "Senior Administrative Assistant I",
    "Administrative Assistant I",
    "Administrative Assistant II",
    "Administrative Assistant III",
    "Administrative Assistant IV",
    "Administrative Assistant V",
    "Administrative Assistant VI",
  ];

  // PMO departments
  const departments = [
    "General Service",
    "Monitoring",
    "Communication",
    "Technical",
    "Admin",
  ];

  // Partner hospitals
  const partnerHospital = [
    "Cotabato Regional and Medical Center",
    "Datu Halun Sakinlan Memorial Hospital",
    "Buluan District Hospital",
    "Wao District Hospital",
    "Cotabato Sanitarium and General Hospital",
  ];

  // Status options
  const statusOptions = ["Active", "Inactive", "Pending", "On Leave"];

  return (
    <MainLayout>
      <View style={styles.container}>
        <Header
          leftComponent={
            <View>
              <Text style={globalStyles.headerLabel}>Manage</Text>
              <Text style={globalStyles.headerTitle}>Employees</Text>
            </View>
          }
          rightComponent={
            <View style={styles.headerButtonMainContainer}>
              {/** PMO */}
              <Button
                title="PMO"
                icon={
                  activeRole === "PMO"
                    ? "people-circle"
                    : "people-circle-outline"
                }
                iconSize={Platform.OS === "ios" ? 22 : 18}
                iconColor={activeRole === "PMO" ? colors.white : colors.primary}
                customContainerStyle={[
                  styles.headerButtonContainer,
                  {
                    backgroundColor:
                      activeRole === "PMO"
                        ? colors.primary
                        : colors.primaryLight,
                  },
                ]}
                customTitleStyle={[
                  styles.headerButtonTitle,
                  {
                    color: activeRole === "PMO" ? colors.white : colors.primary,
                  },
                ]}
                onPress={handlePmo}
              />
              {/** DO */}
              <Button
                title="DO"
                icon={
                  activeRole === "DO"
                    ? "people-circle"
                    : "people-circle-outline"
                }
                iconSize={Platform.OS === "ios" ? 22 : 18}
                iconColor={activeRole === "DO" ? colors.white : colors.primary}
                customContainerStyle={[
                  styles.headerButtonContainer,
                  {
                    backgroundColor:
                      activeRole === "DO"
                        ? colors.primary
                        : colors.primaryLight,
                  },
                ]}
                customTitleStyle={[
                  styles.headerButtonTitle,
                  {
                    color: activeRole === "DO" ? colors.white : colors.primary,
                  },
                ]}
                onPress={handleDo}
              />
            </View>
          }
          bottomComponent={
            <FlatList
              contentContainerStyle={globalStyles.mainSummaryContainer}
<<<<<<< HEAD
              data={employeeMainSummaryData}
=======
              data={employeesMainSummaryData}
>>>>>>> b2fcf1208aaffc0f06fd3cc5bae8c06f3a36e8db
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
        <View style={styles.subSummaryContainer}>
          <FlatList
            contentContainerStyle={globalStyles.subSummaryContainer}
<<<<<<< HEAD
            data={employeeSubSummaryData}
=======
            data={employeesSubSummaryData}
>>>>>>> b2fcf1208aaffc0f06fd3cc5bae8c06f3a36e8db
            keyExtractor={(item) => item.label} // There is no Id
            renderItem={({ item }) => (
              <SummaryItem
                value={item.value}
                label={item.label}
                isMainSummary={false}
              />
            )}
          />
        </View>
        {/** Main Content */}
        <View style={styles.mainContent}>
          <View style={styles.searchContainer}>
            <SearchBar
              value={search.trim()}
              placeholder="Seach name, position..."
              onChangeText={(newText) => setSearch(newText)}
            />
            <Button
              icon="add"
              iconColor={colors.white}
              iconSize={18}
              title={activeRole === "PMO" ? "Add PMO" : "Add DO"}
              customContainerStyle={styles.mainContentButtonContainer}
              customTitleStyle={styles.mainButtonTitle}
              onPress={handleOpenForm}
            />
          </View>
          <Text style={styles.employeeCount}>
            {activeRole === "PMO"
              ? employees.filter((e) => e.role === activeRole).length
              : employees.filter((e) => e.role === activeRole).length}{" "}
            {employees.filter((e) => e.role === activeRole).length > 1
              ? `${activeRole}'S`
              : `${activeRole}`}{" "}
            FOUND
          </Text>
          <View style={styles.employeeListContainer}>
            <FlatList<UnifiedEmployee>
              data={
                activeRole === "PMO"
                  ? employees.filter((e) => e.role === "PMO")
                  : employees.filter((e) => e.role === "DO")
              }
              contentContainerStyle={styles.employeesListContentContainerStyle}
              renderItem={({ item }) => (
                <EmployeeCard
                  firstName={item.firstName}
                  lastName={item.lastName}
                  position={item.position}
                  department={
                    item.role === "PMO"
                      ? item.department
                      : item.assignedHospital // Pass hospital if it's a DO
                  }
                  status={item.status}
                  onEdit={() => console.log()}
                  onDelete={() => {
                    handleRemoveEmployee(
                      item.id,
                      item.firstName,
                      item.lastName,
                    );
                  }}
                />
              )}
              ListEmptyComponent={
                <Image
                  source={require("@/assets/images/Group-12.png")}
                  resizeMode="contain"
                  style={styles.image}
                />
              }
            />
          </View>
          <Form
            visible={isFormVissible}
            onClose={handleClosedForm}
            title={
              activeRole === "PMO"
                ? "Add PMO"
                : activeRole === "DO"
                  ? "Add Desk Officer"
                  : "Add PMO"
            }
            subTitle="Fill in the PMO details below"
            icon="person-add"
            onSubmit={handleSubmitEmployee}
            buttonTitle={
              activeRole === "PMO"
                ? "Add PMO"
                : activeRole === "DO"
                  ? "Add Desk Officer"
                  : "Add PMO"
            }
          >
            <View style={styles.inputContainer}>
              <Input
                label="FIRST NAME"
                value={form.firstName}
                placeHolder="e.g Ivan"
                onChangeText={(newText) =>
                  setForm({ ...form, firstName: newText })
                } // Copy all the data from form (...form) then overwrites only the firstName
                autoCapitalize="words"
                error={formValidationError.firstName}
              />
              <Input
                label="MIDDLE NAME"
                value={form.middleName.trim()}
                placeHolder="e.g Hanma"
                onChangeText={(newText) =>
                  setForm({ ...form, middleName: newText })
                }
                autoCapitalize="words"
                error={formValidationError.middleName}
              />
              <Input
                label="LAST NAME"
                value={form.lastName.trim()}
                placeHolder="e.g Hanma"
                onChangeText={(newText) =>
                  setForm({ ...form, lastName: newText })
                }
                autoCapitalize="words"
                error={formValidationError.lastName}
              />
              <Dropdown
                label="POSITION"
                value={form.position}
                onValueChange={(value) =>
                  setForm({
                    ...form,
                    position: value,
                  })
                }
                items={positions}
                placeholder="Select position"
                error={formValidationError.position}
              />

              {activeRole === "DO" ? (
                <Dropdown
                  disable={isDropdownActive}
                  label="DEPARTMENT"
                  value={form.department}
                  onValueChange={(value) =>
                    setForm({
                      ...form,
                      department: value as EmployeeDepartment,
                    })
                  }
                  items={departments}
                  placeholder="Select department"
                  error={formValidationError.department}
                />
              ) : (
                <Dropdown
                  label="ASSIGNED HOSPITAL"
                  value={form.assignedHospital}
                  onValueChange={(value) =>
                    setForm({
                      ...form,
                      assignedHospital: value as PartnerHospitals,
                    })
                  }
                  items={partnerHospital}
                  placeholder="Select assigned hospital"
                />
              )}
              <Dropdown
                label="STATUS"
                value={form.status}
                onValueChange={(value) =>
                  setForm({
                    ...form,
                    status: value as EmployeeFormState["status"],
                  })
                }
                items={statusOptions}
                placeholder="Select status"
              />
            </View>
          </Form>
        </View>
      </View>
    </MainLayout>
  );
};

export default employees;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerButtonMainContainer: {
    flexDirection: "row",
    gap: 10,
  },

  headerButtonContainer: {
    height: Platform.OS === "ios" ? 35 : 32,
    width: 70,
    backgroundColor: colors.primaryLight,
  },

  headerButtonTitle: {
    fontSize: Platform.OS === "ios" ? 14 : 12,
    marginLeft: 5,
  },

  subSummaryContainer: {
    paddingHorizontal: 25,
    paddingVertical: 15,
  },

  mainContent: {
    flex: 1,
    paddingHorizontal: 25,
  },

  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  mainContentButtonContainer: {
    height: Platform.OS === "ios" ? 45 : 40,
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
  },

  mainButtonTitle: {
    fontSize: Platform.OS === "ios" ? 14 : 12,
    marginLeft: 5,
  },

  inputContainer: {
    marginTop: 15,
    gap: 10,
  },

  employeeCount: {
    fontFamily: "DINBold",
    color: colors.subtext,
    alignSelf: "flex-start",
    marginTop: 20,
    fontSize: 15,
  },

  employeeListContainer: {
    flex: 1,
  },

  employeesListContentContainerStyle: {
    flex: 1,
    marginTop: 10,
    gap: 10,
  },

  image: {
    width: "100%",
    height: 220,
    marginTop: 50,
  },
});
