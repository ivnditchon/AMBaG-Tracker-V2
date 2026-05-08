import { UnifiedEmployee } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

// Define shape of the context
interface EmployeeContextType {
  employees: UnifiedEmployee[];
  loading: boolean;
  addEmployee: (employee: UnifiedEmployee) => void;
  editEmployee: (id: string, form: UnifiedEmployee) => void;
  removeEmployee: (id: string) => void;
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
        setLoading(false); // No matter what happen
      }
    };

    loadEmployees();
  }, []); // Dependeny array (prevent infinite loop, and tells that run or load this only once, when the app is open)

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
  }, [employees]); // Save employees whenever employees change (add, edit, delete and update)

  // Add employee
  const addEmployee = (employee: Omit<UnifiedEmployee, "id">) => {
    const employeeWithId = {
      ...employee,
      id: Date.now().toString(),
    } as UnifiedEmployee;
    setEmployees((prev) => [...prev, employeeWithId]);
  };

  // Edit employee
  const editEmployee = (id: string, updatedEmployee: UnifiedEmployee) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === id ? updatedEmployee : emp)),
    );
  };

  // Remove employee
  const removeEmployee = (id: string) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
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
