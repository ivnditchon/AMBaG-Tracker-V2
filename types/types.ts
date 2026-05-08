import { Ionicons } from "@expo/vector-icons";

export type EmploymentStatus = "Active" | "Inactive" | "Pending" | "On Leave";
export const PMO_STATUSES: EmploymentStatus[] = [
  "On Leave",
  "Pending",
  "Inactive",
  "Active",
];
export const DO_STATUSES: EmploymentStatus[] = [
  "Pending",
  "Inactive",
  "Active",
];

export type EmployeePosition =
  | "Adminitistrative Assistant I"
  | "Adminitistrative Assistant II"
  | "Adminitistrative Assistant III";
export type EmployeeDepartment =
  | "Admin"
  | "Technical"
  | "Communication"
  | "Monitoring"
  | "General Services";
export type PartnerHospitals =
  | "Aleosan District Hospital"
  | "Buluan District Hospital"
  | "Cotabato Regional and Medical Center";

// Base
export interface Employee {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  position: string;
  status: EmploymentStatus;
  department: EmployeeDepartment | string;
  assignedHospital: PartnerHospitals | string;
}

export type ProjectManagementOfficer = Omit<Employee, "assignedHospital"> & {
  role: "PMO";
};
export type DeskOfficer = Employee & { role: "DO" };
export type UnifiedEmployee = ProjectManagementOfficer | DeskOfficer;

export interface EmployeeSummaryData {
  value: string;
  label: string;
  isMainSummary?: boolean;
}

export interface SearchEmployee {
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
}

export interface FormProps {
  visible: boolean;
  title: string;
  subTitle: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  onClose: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
  buttonTitle: string;
}

export interface ValidationError {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  position?: string;
  department?: string;
  assignedHospital?: string;
}
