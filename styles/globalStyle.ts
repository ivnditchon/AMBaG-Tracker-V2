import { colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  loginCustomButtomContainer: {
    width: "100%",
    height: 55,
    backgroundColor: colors.primary,
  },

  loginCustomButtonTitle: {
    fontSize: 20,
  },

  headerLeftComponentContainer: {
    flexDirection: "column",
  },

  headerRightComponentContainer: {
    flexDirection: "row",
  },

  headerScreenLabel: {
    fontFamily: "DINMedium",
    fontSize: 20,
    color: "rgba(255,255,255,0.6)",
    letterSpacing: 0.5,
    fontWeight: 600,
  },

  headerScreenTitle: {
    fontFamily: "DINBold",
    color: colors.white,
    fontSize: 32,
    letterSpacing: 0.5,
    marginVertical: 8,
    paddingVertical: 5,
  },

  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
});
