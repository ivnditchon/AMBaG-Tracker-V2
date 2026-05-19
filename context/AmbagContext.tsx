import {
  AttendanceRecord,
  AttendanceStatus,
  EmployeeWithAttendanceStatus,
  UnifiedEmployee,
} from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// Define shape of the context
interface AmbagContextType {
  employees: UnifiedEmployee[];
  loading: boolean;
  addEmployee: (employee: UnifiedEmployee) => void;
  editEmployee: (id: string, form: UnifiedEmployee) => void;
  removeEmployee: (id: string) => void;
  // Attendance
  attendanceRecords: AttendanceRecord[];
  selectedDate: string;
  setSelectedDate: (Date: string) => void;
  employeesForCurrentDate: EmployeeWithAttendanceStatus[];
  updateAttendanceStatus: (
    employeeId: string,
    status: AttendanceStatus,
  ) => void;
}
// Create the context with a default value
const AmbagContext = createContext<AmbagContextType>({
  employees: [],
  loading: true,
  addEmployee: () => {},
  editEmployee: () => {},
  removeEmployee: () => {},
  // Attendance
  attendanceRecords: [],
  selectedDate: new Date().toISOString().split("T")[0],
  setSelectedDate: () => {},
  employeesForCurrentDate: [],
  updateAttendanceStatus: () => {},
});

const EMPLOYEE_KEY = "ambag_employees";

type ChildrenProps = {
  children: React.ReactNode;
};

export const AmbagProvider = ({ children }: ChildrenProps) => {
  const [employees, setEmployees] = useState<UnifiedEmployee[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceRecord[]
  >([]);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0],
  ); // Default date today
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
  const addEmployee = (newEmployee: Omit<UnifiedEmployee, "id">) => {
    const employeeWithId = {
      ...newEmployee,
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

  const employeesForCurrentDate = useMemo(() => {
    return employees.map((emp) => {
      const foundRecord = attendanceRecords.find(
        (rec) => rec.employeeId === emp.id && rec.date === selectedDate,
      );
      return {
        ...emp,
        attendanceStatus: foundRecord ? foundRecord.status : "",
        hasMarked: foundRecord ? true : false,
      };
    });
  }, [employees, attendanceRecords, selectedDate]);

  const updateAttendanceStatus = useCallback(
    (employeeId: string, status: AttendanceStatus) => {
      setAttendanceRecords((prevRecords) => {
        const recordIndex = prevRecords.findIndex(
          (rec) => rec.employeeId === employeeId && rec.date === selectedDate,
        );

        if (recordIndex > -1) {
          const updateRecords = [...prevRecords];
          updateRecords[recordIndex] = {
            ...updateRecords[recordIndex],
            status: status,
          };
          return updateRecords;
        } else {
          const newRecord: AttendanceRecord = {
            id: `ATT-${Date.now()}`,
            employeeId: employeeId,
            date: selectedDate, // Nakakandado sa selectedDate ng screen
            status: status,
          };
          return [...prevRecords, newRecord];
        }
      });
    },
    [selectedDate],
  );

  return (
    <AmbagContext.Provider
      value={{
        employees,
        loading,
        addEmployee,
        editEmployee,
        removeEmployee,
        // Attendance
        attendanceRecords,
        selectedDate,
        setSelectedDate,
        employeesForCurrentDate,
        updateAttendanceStatus,
      }}
    >
      {children}
    </AmbagContext.Provider>
  );
};

export const useAmbag = () => {
  const context = useContext(AmbagContext);
  if (!context) throw new Error("useAmbag must be used within AmbagProvider");
  return context;
};
