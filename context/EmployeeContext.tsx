import { DeskOfficer, ProjectManagementOfficer } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

// Define a union type for the state
export type UnifiedEmployee = ProjectManagementOfficer | DeskOfficer;

// Define shape of the context
interface EmployeeContextType {
  employees: UnifiedEmployee[];
  loading: boolean;
  addEmployee: (employee: UnifiedEmployee) => void;
  editEmployee: (id: string, form: UnifiedEmployee) => void;
  removeEmployee: (id: string, firstName: string, lastName: string) => void;
}

// Create the context with a default value
const EmployeeContext = createContext<EmployeeContextType>({
  employees: [],
  loading: true,
  addEmployee: () => {},
  editEmployee: () => {},
  removeEmployee: () => {},
});

const EMPLOYEE_KEY = "ambag_employees";

type ChildrenProps = {
  children: React.ReactNode;
};

export const EmployeeProvider = ({ children }: ChildrenProps) => {
  const [employees, setEmployees] = useState<UnifiedEmployee[]>([]);
  const [loading, setLoading] = useState(true);

  // Load from AsyncStorage (once)
  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const data = await AsyncStorage.getItem(EMPLOYEE_KEY);
        if (data) {
          setEmployees(JSON.parse(data));
        }
      } catch (error) {
        console.error("Error loading employees", error);
      } finally {
        setLoading(false);
      }
    };

    loadEmployees();
  }, []);

  // Save to AsyncStorage whenever employees change
  useEffect(() => {
    const saveEmployees = async () => {
      try {
        await AsyncStorage.setItem(EMPLOYEE_KEY, JSON.stringify(employees));
      } catch (error) {
        console.error("Error saving employees", error);
      }
    };
    saveEmployees();
  }, [employees]);

  // Add employee
  const addEmployee = (employee: UnifiedEmployee) => {
    setEmployees((prev) => [...prev, employee]);
  };

  // Edit employee
  const editEmployee = (id: string | null, form: UnifiedEmployee) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, ...form } : emp)),
    );
  };

  // Remove employee
  const removeEmployee = (id: string, firstName: string, lastName: string) => {
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
            setEmployees((prev) => prev.filter((emp) => emp.id !== id));
          },
        },
      ],
    );
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        loading,
        addEmployee,
        editEmployee,
        removeEmployee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = () => useContext(EmployeeContext);
