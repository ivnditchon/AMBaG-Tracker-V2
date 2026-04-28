import { colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
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

  buttonContainer: {
    width: "100%",
    height: 55,
    backgroundColor: colors.primary,
  },
  buttonTitle: {
    fontSize: 22,
  },
});
