import AsyncStorage from "@react-native-async-storage/async-storage";

const EMPPLOYEE_KEY = "ambag_employees"; // Unique key

// Save Employees
export const saveEmployees = async (employees: any[]) => {
  try {
    await AsyncStorage.setItem(EMPPLOYEE_KEY, JSON.stringify(employees));
  } catch (error) {
    console.error("Error saving employees:", error);
  }
};

// Get Employees
export const getEmployees = async () => {
  try {
    const data = await AsyncStorage.getItem(EMPPLOYEE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error getting employees:", error);
    return [];
  }
};

// Clear Employees
export const clearEmployees = async () => {
  try {
    await AsyncStorage.removeItem(EMPPLOYEE_KEY);
  } catch (error) {
    console.error("Error clearing employees:", error);
  }
};
