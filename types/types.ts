import { Ionicons } from "@expo/vector-icons";

export type EmploymentStatus = "Active" | "Inactive" | "Pending" | "On Leave";
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
}

export interface ProjectManagementOfficer extends Employee {
  role: "PMO";
  department: EmployeeDepartment;
}

export interface DeskOfficer extends Employee {
  role: "DO";
  assignedHospital: PartnerHospitals;
}

// PMO and DO with different prop combined
export type EmployeeFormState = Employee & {
  department: EmployeeDepartment | "";
  assignedHospital: PartnerHospitals | "";
};

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
  buttonTitle:
    | "Add PMO"
    | "Add Desk Officer"
    | "Update PMO | Update Desk Officer";
}

export interface ValidationError {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  position?: string;
  department?: string;
  assignedHospital?: string;
}
