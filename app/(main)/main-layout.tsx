import FooterMenu, { FooterMenuProps } from "@/components/Layout/FooterMenu";
import { colors } from "@/constants/colors";
import { usePathname, useRouter } from "expo-router";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Provider as PaperProvider } from "react-native-paper"; // Snackbar

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleEmployeesScreen = () => {
    router.push("/(main)/employees");
  };

  const handleDashboardScreen = () => {
    router.push("/(main)/dashboard");
  };

  const footerData: FooterMenuProps[] = [
    // Home
    {
      icon: "grid-outline",
      activeIcon: "grid",
      size: 22,
      color: colors.subtext,
      labelFont: "DINRegular",
      activeLabelFont: "DINBold",
      labelColor: colors.subtext,
      activeLabelColor: colors.primary,
      activeColor: colors.primary,
      label: "Dashboard",
      onPress: handleDashboardScreen,
      isActive: pathname.includes("dashboard"),
    },
    // Employees
    {
      icon: "people-outline",
      activeIcon: "people",
      size: 22,
      color: colors.subtext,
      labelFont: "DINRegular",
      activeLabelFont: "DINBold",
      labelColor: colors.subtext,
      activeLabelColor: colors.primary,
      activeColor: colors.primary,
      label: "Employees",
      onPress: handleEmployeesScreen,
      isActive: pathname.includes("employees"),
    },
    // Attendance
    {
      icon: "calendar-outline",
      activeIcon: "calendar",
      size: 22,
      color: colors.subtext,
      labelFont: "DINRegular",
      activeLabelFont: "DINBold",
      labelColor: colors.subtext,
      activeLabelColor: colors.primary,
      activeColor: colors.primary,
      label: "Attendance",
      onPress: () => {},
    },
    // Uniform
    {
      icon: "shirt-outline",
      activeIcon: "shirt",
      size: 22,
      color: colors.subtext,
      labelFont: "DINRegular",
      activeLabelFont: "DINBold",
      labelColor: colors.subtext,
      activeLabelColor: colors.primary,
      activeColor: colors.primary,
      label: "Uniform",
      onPress: () => {},
    },
    // Reports
    {
      icon: "document-text-outline",
      activeIcon: "document-text",
      size: 22,
      color: colors.subtext,
      labelFont: "DINRegular",
      activeLabelFont: "DINBold",
      labelColor: colors.subtext,
      activeLabelColor: colors.primary,
      activeColor: colors.primary,
      label: "Reports",
      onPress: () => {},
    },
  ];

  return (
    <PaperProvider>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {children}
          {/** Footer section */}
          <View style={styles.footer}>
            {footerData.map((item) => (
              <FooterMenu
                key={item.label}
                icon={item.icon}
                isActive={item.isActive}
                activeIcon={item.activeIcon}
                labelFont={item.labelFont}
                activeLabelFont={item.activeLabelFont}
                labelColor={item.labelColor}
                activeLabelColor={item.activeLabelColor}
                color={item.color}
                activeColor={item.activeColor}
                size={item.size}
                label={item.label}
                onPress={item.onPress}
              />
            ))}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </PaperProvider>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 20,
    paddingTop: 18,
  },
});
