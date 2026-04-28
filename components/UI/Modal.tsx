import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "./Button";

type FormProps = {
  visible: boolean;
  title: string;
  subTitle: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  onClose: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
};

const Form = ({
  visible,
  title,
  subTitle,
  icon,
  onClose,
  onSubmit,
  children,
}: FormProps) => {
  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={styles.container}>
          <View style={styles.modalView}>
            <View style={styles.headerContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subTitle}>{subTitle}</Text>
              </View>
              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={onClose}>
                  <Ionicons name="close" size={24} color={colors.subtext} />
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView
              nestedScrollEnabled={true}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.avatarPlaceholder}>
                <Ionicons name={icon} size={24} color={colors.subtext} />
              </View>
              <View style={styles.modalContent}>
                {children}
                <Button
                  title="Add Employee"
                  customContainerStyle={styles.buttonContainer}
                  customTitleStyle={styles.buttonTitle}
                  onPress={onSubmit}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  modalView: {
    height: 650,
    backgroundColor: colors.white,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalContent: {
    paddingHorizontal: 30,
    paddingBottom: 50,
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    padding: 30,
  },

  titleContainer: {
    flexDirection: "column",
  },

  title: {
    fontFamily: "DINBold",
    fontSize: 26,
    color: colors.text,
  },

  subTitle: {
    fontFamily: "DINMedium",
    fontSize: 15,
    color: colors.subtext,
    marginTop: 8,
  },

  iconContainer: {
    borderColor: colors.border,
    padding: 8,
    borderRadius: 10,
    backgroundColor: colors.lightGray,
  },

  avatarPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center", // centers it horizontally
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: colors.primary,
    marginTop: 30,
    marginBottom: 16,
  },

  buttonContainer: {
    width: "100%",
    height: 55,
    backgroundColor: colors.primary,
    marginTop: 50,
  },

  buttonTitle: {
    fontSize: 18,
  },
});
