import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MainLayout, { globalStyles } from './main-layout';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import Header from '@/components/Layout/Header';
import Avatar from '@/components/UI/Avatar';
import SummaryItem ,{ SummaryItemProps } from '@/components/UI/SummaryItem';

const Dashboard = () => {
   const today = new Date().toLocaleDateString('en-PH', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
   });

   // Summary pill data
   const dashboardSummaryData: SummaryItemProps[] = [
      {value: 50, label: 'Total Staff', customValueStyle: colors.primaryLight, showDivider: true},
      {value: 42, label: 'Present', customValueStyle: colors.whiteFaded, showDivider: true},
      {value: 8, label: 'Absent', customValueStyle: colors.dangerFaded, showDivider: true},
      {value: 10, label: 'Late', customValueStyle: colors.warningFaded, showDivider: false},
   ]; 

   return (
      <MainLayout>
         <View style={styles.content}> 
            <Header 
               leftComponent={
                  <View style={styles.leftComponentContainer}>
                     <Text style={styles.greeting}>Good morning 👋</Text>
                     <Text style={styles.adminTitle}>Admin Panel</Text>
                     <Text style={styles.dateText}>{today}</Text>   
                  </View>
               }  
               rightComponent={
                  <View style={styles.RightComponentContainer}>
                     <View style={styles.bellContainer}>
                        <Ionicons name="notifications-outline" size={22} color={colors.primaryLight} />
                     </View>
                     <View style={styles.avatar}>
                        <Avatar initial='NG' />
                     </View>
                  </View>
               }
               bottomComponent={
                  <View style={globalStyles.summaryContainer}>
                     {dashboardSummaryData.map((item) => (
                        <SummaryItem 
                           key={item.label}
                           value={item.value}
                           label={item.label}
                           customValueStyle={item.customValueStyle}
                           showDivider={item.showDivider}
                        />
                     ))};
                  </View>
               }
            />
         </View>
      </MainLayout> 
   );
};

export default Dashboard;

const styles = StyleSheet.create({
   content: { // Pushes footer below 
      flex: 1
   },

   // Left header section
   leftComponentContainer: {
      flexDirection: 'column'
   },

    greeting: {
      fontFamily: 'InterSemiBold',
      fontSize: 20,
      color: 'rgba(255,255,255,0.6)',
      letterSpacing: 0.5
   },

   adminTitle: {
      fontFamily: 'InterBold',
      color: colors.white,
      fontSize: 32,
      letterSpacing: 0.5,
      marginVertical: 5,
      paddingVertical: 5
   },

   dateText: {
      fontFamily: 'InterSemiBold',
      fontSize: 14,
      color: 'rgba(255,255,255,0.6)',
      letterSpacing: 0.5
   },
   // End

   // Right header section
   RightComponentContainer: {
      flexDirection: 'row'
   },

   bellContainer: {
      width: 40,
      height: 40,
      borderRadius: 10,
      backgroundColor: 'rgba(255,255,255,0.18)',
      alignItems: 'center',
      justifyContent: 'center'
   },

   avatar: {
      marginLeft: 10
   },
   // End
});