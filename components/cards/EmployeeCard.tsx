import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Children } from 'react'
import Avatar from '../UI/Avatar';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';

type EmployeeCardProps = {
  firstName: string;
  lastName: string;
  position: string;
  department: string;
  status: "Active" | "Inactive" | "Pending" | "On Leave";
  onEdit: () => void;
  onDelete: () => void;
  children?: React.ReactNode;
};  

const EmployeeCard = ({
  firstName, 
  lastName, 
  position,
  department, 
  status, 
  onEdit, 
  onDelete,
  children}: EmployeeCardProps) => { 

  const getStatusStyles = (status: string) => {
    switch(status) {
      case "Active":
        return {bg: colors.primaryLight, color: colors.primaryDark};
      case "Inactive":
        return {bg: colors.dangerLight, color: colors.danger}
      case "Pending":
        return {bg: colors.warningLight, color: colors.warning}
      case "On Leave":
        return {bg: colors.purpleLight, color: colors.purple} 
      default:
        return {bg: colors.lightGray, color: colors.gray}
    }
  };
  
  const statusStyles = getStatusStyles(status);
    
  return (
    <View style={styles.container}>
      {children}
      <View style={styles.employeeInfoContainer}>
        <View style={styles.employeeNameContainer}>
          <Text style={styles.employeeNameTextStyle}>{firstName} </Text>
          <Text style={styles.employeeNameTextStyle}>{lastName}</Text>
        </View>
        <View style={styles.employeePositionContainer}>
          <Text style={styles.employeePositionText}>{position}</Text>
        </View>
        <Text style={styles.employeeDesignationText}>{department}</Text>
        <View style={[styles.employeeStatusContainer,
          {
            backgroundColor: statusStyles.bg,
          }
        ]}>
          <View style={[styles.employeeStatusMarked,
            {
              backgroundColor: statusStyles.color
            }
          ]}></View>
          <Text style={[styles.employeeStatusText,
            {
              color: statusStyles.color 
            }
          ]}>
            {status}
          </Text>
        </View>
      </View>
      <View style={styles.employeeActionsContainer}>
        <TouchableOpacity activeOpacity={0.8} onPress={onEdit}>
          <Ionicons name="create-outline" size={23} color={colors.primary}/>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={onDelete}>
          <Ionicons name="trash-outline" size={23} color={colors.danger} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EmployeeCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#fff',
    borderRadius: 10,
    // iOS shadow
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,

    // Android shadow
    elevation: 5,
  },

  employeeInfoContainer: {
    flexDirection: "column",
  },

  employeeNameTextStyle: {
    fontFamily: "DINBold",
    fontSize: 17,
    color: colors.text
  },

  employeePositionText: {
    fontFamily: "DINRegular",
    fontSize: 14,
    color: colors.subtext

  },

  employeeNameContainer: {
    flexDirection: "row"
  },

  employeePositionContainer: {
    flexDirection: "row",
    marginTop: 7,
    justifyContent: "center",
    alignItems: "center"
  },

  employeeDepartmentText: {
    fontFamily: "DINRegular",
    fontSize: 14,
    color: colors.subtext
  },

  employeeDesignationText: {
    fontFamily: "DINRegular",
    fontSize: 14,
    color: colors.subtext,
    marginTop: 3
  },

  employeeStatusContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    marginTop: 14,
    borderColor: colors.border
  },

  employeeStatusMarked: {
    width: 6,
    height: 6,
    borderRadius: 100,
    marginRight: 5
  },
  
  employeeStatusText: {
    fontFamily: "DINMedium",
    color: colors.primaryDark,
  },

  employeeActionsContainer: {
    flexDirection: "column",
    gap: 30
  },
});