import EmployeeCard from "@/components/Cards/EmployeeCard";
import Header from "@/components/Layout/Header";
import Button from "@/components/UI/Button";
import Dropdown from "@/components/UI/Dropdown";
import Form from "@/components/UI/FormModal";
import DualButton from "@/components/UI/Header/DualButton";
import HeaderLeftTitle from "@/components/UI/Header/HeaderLeftTitle";
import Input from "@/components/UI/Input";
import SearchBar from "@/components/UI/SearchBar";
import SummaryItem from "@/components/UI/SummaryItem";
import { colors } from "@/constants/colors";
import { useAmbag } from "@/context/AmbagContext";
import { globalStyles } from "@/styles/globalStyle";
import {
  DeskOfficer,
  DO_STATUSES,
  EmployeeDepartment,
  EmployeeSummaryData,
  EmploymentStatus,
  PartnerHospitals,
  PMO_STATUSES,
  UnifiedEmployee,
  ValidationError,
} from "@/types/types";
import React, { useCallback, useMemo, useState } from "react";
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
        ...(activeRole === "PMO"
          ? [
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
      ]),
];

const employees = () => {
  const { employees, addEmployee, editEmployee, removeEmployee, loading } =
    useAmbag();
  const [activeTab, setActiveTab] = useState<"PMO" | "DO">("PMO");
  const initialState: UnifiedEmployee =
    activeTab === "PMO"
      ? {
          id: "",
          firstName: "",
          middleName: "",
          lastName: "",
          position: "",
          status: "Active",
          department: "",
          role: activeTab,
        }
      : {
          id: "",
          firstName: "",
          middleName: "",
          lastName: "",
          position: "",
          status: "Active",
          department: "Admin",
          assignedHospital: "",
          role: activeTab,
        };
  const [form, setForm] = useState<UnifiedEmployee>(initialState);
  const [searchQuery, setSearch] = useState<string>("");
  const [isFormVissible, setFormVissible] = useState<boolean>(false);
  const [formValidationError, setFormValidationError] =
    useState<ValidationError>({});
  const [isDropdownActive, setDropDownActive] = useState<boolean>(false);
  const [isEditActive, setEditActive] = useState<boolean>(false);

  const handleButton1 = () => setActiveTab("PMO");
  const handleButton2 = () => {
    setActiveTab("DO");
    setDropDownActive(true);
  };

  const filteredEmployees = employees.filter((emp) => {
    const data =
      `${emp.firstName} ${emp.middleName} ${emp.lastName} ${emp.department} ${emp.status}`.toLowerCase();
    return data.includes(searchQuery.toLowerCase());
  });

  const displayData = useMemo(() => {
    return filteredEmployees.filter((e) => e.role === activeTab);
  }, [filteredEmployees, activeTab]);

  // Edit employee
  const handleEditEmployee = (employee: UnifiedEmployee) => {
    setActiveTab(employee.role);
    setForm(employee);
    setFormVissible(true);
    setEditActive(true);
  };

  // Remove employee
  const handleRemoveEmployee = (
    id: string,
    firstName: string,
    lastName: string,
  ) => {
    Alert.alert(
      `${activeTab === "PMO" ? "Delete PMO" : "Delete Desk Officer"}`, // Title
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

  // Compute data outside FlatList - Prevent from lag
  const renderItem = useCallback(
    ({ item }: { item: UnifiedEmployee }) => (
      <EmployeeCard
        firstName={item.firstName}
        lastName={item.lastName}
        position={item.position}
        department={
          item.role === "PMO" ? item.department : item.assignedHospital
        }
        employeeStatus={item.status}
        onEmployeeEdit={() => handleEditEmployee(item)}
        onEmployeeDelete={() =>
          handleRemoveEmployee(item.id, item.firstName, item.lastName)
        }
      />
    ),
    [handleEditEmployee, handleRemoveEmployee],
  );

  if (loading) return null;

  const employeesMainSummaryData = getEmployeesSummaryData(
    employees,
    true,
    activeTab,
  );
  const employeesSubSummaryData = getEmployeesSummaryData(
    employees,
    false,
    activeTab,
  );

  const handleOpenForm = () => {
    setForm(initialState); // Reset the form to initial empty values
    setFormVissible(true); // Open the form
  };

  const handleClosedForm = () => {
    setForm(initialState);
    setFormVissible(false); // Close the form
    setEditActive(false);
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
    if (form.role === "PMO") {
      if (!form.department) {
        errors.department = "Department is required!";
      }
    }
    if (form.role === "DO") {
      if (!form.assignedHospital) {
        errors.assignedHospital = "Partner hospital is required!";
      }
    }

    return errors;
  };

  const handleSubmitEmployee = () => {
    const errors = formValidation();

    if (Object.keys(errors).length > 0) {
      setFormValidationError(errors);
      return; // Stop execution if there is an error
    }

    if (form.id) {
      editEmployee(form.id, { ...form });
    } else {
      const newEmployeeData = {
        ...form,
        firstName: form.firstName.trim(),
        middleName: form.middleName.trim(),
        lastName: form.lastName.trim(),
        role: activeTab, // This role will identify the data either DO or PMO (activeRole === DO | PMO)
      } as UnifiedEmployee;
      addEmployee(newEmployeeData);
    }
    handleClosedForm(); // Reset and close the form
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

  return (
    <MainLayout>
      <View style={styles.container}>
        <Header
          customHeaderContainer={styles.headerContainer}
          topLeftComponent={
            <HeaderLeftTitle label="Manage" title="Employees" />
          }
          topRightComponent={
            <DualButton
              leftLabel="PMO"
              leftActiveIcon="people"
              leftIcon="people-outline"
              rightLabel="DO"
              rightActiveIcon="people"
              rightIcon="people-outline"
              onLeftPress={handleButton1}
              onRightPress={handleButton2}
              isActive={activeTab}
            />
          }
          bottomComponent={
            <FlatList
              contentContainerStyle={globalStyles.mainSummaryContainer}
              data={employeesMainSummaryData}
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
            data={employeesSubSummaryData}
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
            {/** Search */}
            <SearchBar
              value={searchQuery.trim()}
              placeholder="Seach name, position..."
              onChangeText={(newText) => setSearch(newText)}
            />
            <Button
              icon="add"
              iconColor={colors.white}
              iconSize={18}
              title={activeTab === "PMO" ? "Add PMO" : "Add DO"}
              customContainerStyle={styles.mainContentButtonContainer}
              customTitleStyle={styles.mainButtonTitle}
              onPress={handleOpenForm}
            />
          </View>
          <Text style={styles.employeeCount}>
            {activeTab === "PMO"
              ? filteredEmployees.filter((e) => e.role === activeTab).length
              : filteredEmployees.filter((e) => e.role === activeTab)
                  .length}{" "}
            {filteredEmployees.filter((e) => e.role === activeTab).length > 1
              ? `${activeTab}'S`
              : `${activeTab}`}{" "}
            FOUND
          </Text>
          <FlatList<UnifiedEmployee>
            data={displayData}
            keyExtractor={(item) => item.id}
            contentContainerStyle={
              filteredEmployees.length === 0
                ? { flexGrow: 1 }
                : styles.employeesListContentContainerStyle
            } // No need to wrap Flatlist if this is present
            renderItem={renderItem}
            // Performance props
            initialNumToRender={10}
            maxToRenderPerBatch={5}
            windowSize={5}
            removeClippedSubviews={true} // For android lag
            ListEmptyComponent={
              <View style={styles.employeeListEmptyComponentStyle}>
                <Image
                  source={require("@/assets/images/Group-12.png")}
                  resizeMode="contain"
                  style={styles.image}
                />
                <Text style={styles.employeeListEmptyComponentTextStyle}>
                  No employees yet. Tap Add {activeTab} to get started 🚀
                </Text>
              </View>
            }
          />
          {/** FORM */}
          <Form
            visible={isFormVissible}
            onClose={handleClosedForm}
            title={`${isEditActive ? "Edit" : "Add"} ${activeTab === "PMO" ? "PMO" : "DO"}`}
            subTitle={`${isEditActive ? "Edit the" : "Fill in the"} ${activeTab === "PMO" ? "PMO details below" : "DO details below"}`}
            icon="person-add"
            onSubmit={handleSubmitEmployee}
            buttonTitle={`${isEditActive ? "Update" : "Add"} ${activeTab === "PMO" ? "PMO" : "DO"}`}
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
              <Dropdown
                disable={activeTab === "DO" && isDropdownActive}
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
              {activeTab === "DO" && (
                <Dropdown
                  label="ASSIGNED HOSPITAL"
                  value={form.role === "DO" ? form.assignedHospital : ""}
                  onValueChange={(value) =>
                    setForm({
                      ...(form as DeskOfficer),
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
                    status: value as EmploymentStatus,
                  })
                }
                items={activeTab === "PMO" ? PMO_STATUSES : DO_STATUSES}
                placeholder="Select status"
                dropdownPosition="top"
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

  headerContainer: {
    height: 225,
  },

  headerButtonMainContainer: {
    flexDirection: "row",
    gap: 10,
  },

  headerButtonContainer: {
    height: Platform.OS === "ios" ? 35 : 32,
    width: 70,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
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
    paddingHorizontal: 12,
  },

  mainButtonTitle: {
    fontSize: Platform.OS === "ios" ? 14 : 12,
    marginLeft: 5,
  },

  inputContainer: {
    marginTop: 15,
    gap: 20,
  },

  employeeCount: {
    fontFamily: "DINBold",
    color: colors.subtext,
    alignSelf: "flex-start",
    marginTop: 20,
    fontSize: 15,
  },

  employeesListContentContainerStyle: {
    gap: 10,
    paddingVertical: 20,
  },

  employeeListEmptyComponentStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  employeeListEmptyComponentTextStyle: {
    fontFamily: "DINRegular",
    fontSize: 14,
    marginTop: 10,
    color: colors.subtext,
  },

  image: {
    width: "100%",
    height: 200,
    marginTop: 50,
  },
});
