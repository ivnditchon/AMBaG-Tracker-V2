import AsyncStorage from "@react-native-async-storage/async-storage";

const EMPLOYEE_KEY = "ambag_employees"; // Unique key

// Save Employees
export const saveEmployees = async (employees: any[]) => {
  try {
    await AsyncStorage.setItem(EMPLOYEE_KEY, JSON.stringify(employees));
  } catch (error) {
    console.error("Error saving employees:", error);
  }
};

// Get Employees
export const getEmployees = async () => {
  try {
    const data = await AsyncStorage.getItem(EMPLOYEE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error getting employees:", error);
    return [];
  }
};

// Clear Employees
export const clearEmployees = async () => {
  try {
    await AsyncStorage.removeItem(EMPLOYEE_KEY);
  } catch (error) {
    console.error("Error clearing employees:", error);
  }
};
