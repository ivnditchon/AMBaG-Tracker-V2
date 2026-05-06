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

export type UnifiedEmployee = ProjectManagementOfficer | DeskOfficer;

// Base
export interface Employee {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  position: string;
  status: EmploymentStatus;
  department: EmployeeDepartment | "";
}

export interface ProjectManagementOfficer extends Employee {
  role: "PMO";
}

export interface DeskOfficer extends Employee {
  role: "DO";
  assignedHospital: PartnerHospitals | "";
}

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
