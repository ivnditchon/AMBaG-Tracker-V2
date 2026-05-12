import { colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  headerLeftComponentContainer: {
    flexDirection: "column",
  },

  headerRightComponentContainer: {
    flexDirection: "row",
  },

  mainSummaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
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
  },

  buttonTitle: {
    fontSize: 22,
  },
});
