import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MainLayout from './main-layout';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import { LinearGradient } from 'expo-linear-gradient'
import Avatar from '@/components/Avatar';
import SummaryItem, { SummaryItemProps } from '@/components/UI/SummaryItem';

const Dashboard = () => {
   const today = new Date().toLocaleDateString('en-PH', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
   });

   // Summary pill data
   const summaryData: SummaryItemProps[] = [
      {value: 50, label: 'Total Staff', customValueStyle: colors.primaryLight, showDivider: true},
      {value: 42, label: 'Present', customValueStyle: colors.whiteFaded, showDivider: true},
      {value: 2, label: 'Absent', customValueStyle: colors.dangerFaded, showDivider: true},
      {value: 10, label: 'Late', customValueStyle: colors.warningFaded, showDivider: false},
   ];

   return (
      <MainLayout>
         <View style={styles.content}> 
            <LinearGradient
               colors={['#007A56', '#00956A', '#00C588']}
               start={{x: 0, y: 0}}
               end={{x: 1, y: 1}}
               style={styles.adminPanelContainer}
            >
               <View style={styles.adminPanelContainer}>
                  <View style={styles.headerContent}>
                     <View style={styles.headerInfo}>
                        <Text style={styles.greeting}>
                           Good morning 👋
                        </Text>
                        <Text style={styles.adminTitle}>
                           Admin Panel
                        </Text>
                        <Text style={styles.dateText}>
                           {today}
                        </Text>
                     </View>
                     <View style={styles.headerActions}>
                        <View style={styles.bellContainer}>
                           <Ionicons name="notifications-outline" size={24} color={colors.white} />
                        </View>
                        <Avatar 
                           initial='NG'
                           customStyle={styles.avatar}
                        />
                     </View>
                  </View>
                  {/** Summary */}
                  {/** Summary item */}
                  <View style={styles.summaryContainer}>
                     {summaryData.map((item) => (
                        <SummaryItem 
                           key={item.label}
                           value={item.value} 
                           label={item.label}
                           customValueStyle={item.customValueStyle}
                           showDivider={item.showDivider}
                        />
                     ))}
                  </View>
               </View>
            </LinearGradient>
         </View>
      </MainLayout> 
   );
};

export default Dashboard;

const styles = StyleSheet.create({
   content: { // Pushes footer below 
      flex: 1
   },

   adminPanelContainer: {
      height: 270,
      paddingHorizontal: 12,
      justifyContent: 'center'
   },

   headerContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
   },

   headerInfo: {
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

   headerActions: {
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

   summaryContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 40,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.25)',
      borderRadius: 15,
      backgroundColor: 'rgba(255,255,255,0.05)',
      paddingHorizontal: 15,
      paddingVertical: 15
   }
});