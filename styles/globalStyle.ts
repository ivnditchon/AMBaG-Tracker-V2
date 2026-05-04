import { colors } from "@/constants/colors";
import { Platform, StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  headerLeftComponentContainer: {
    flexDirection: "column",
  },

  headerRightComponentContainer: {
    flexDirection: "row",
  },

  headerLabel: {
    fontFamily: "DINMedium",
    fontSize: Platform.OS === "ios" ? 20 : 18,
    color: "rgba(255,255,255,0.6)",
    letterSpacing: 0.5,
    fontWeight: 600,
  },

  headerTitle: {
    fontFamily: "DINBold",
    color: colors.white,
    fontSize: Platform.OS === "ios" ? 32 : 24,
    letterSpacing: 0.5,
    marginVertical: 8,
    paddingVertical: 5,
  },

  mainSummaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  subSummaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 15,
    backgroundColor: colors.white,
    paddingHorizontal: 17,
    paddingVertical: 12,
  },

  buttonContainer: {
    width: "100%",
    height: 55,
    backgroundColor: colors.primary,
  },

  buttonTitle: {
    fontSize: 22,
  },
});
