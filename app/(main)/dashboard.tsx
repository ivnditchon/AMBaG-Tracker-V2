import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MainLayout from './main-layout';
import Header from '@/components/header';
import { Ionicons } from '@expo/vector-icons';

const Dashboard = () => {
   return (
      <MainLayout>
         <Header 
            backIcon={<Ionicons 
               name='chevron-back-outline' 
               size={22} 
               color='#2C2C2C' 
            />}
            title='DASHBOARD'
            menuIcon={<Ionicons 
               name="notifications-outline" 
               size={22} 
               color="#2C2C2C" 
            />}
         />
         {/** Main content */}
         <View style={styles.mainContent}>
            {/** Daily overview section */}
            <View>
               <Text style={styles.sectionTitle}>
                  Daily Overview
               </Text>
            </View>
            {/** This week section */}
            <View>
               
            </View>
         </View>
         {/** Footer section */}
         <View style={styles.footerMenuContainer}>
            <Ionicons name="home-outline" size={24} color="#9CA3AF" />
            <Ionicons name="calendar-outline" size={24} color="#9CA3AF" />
            <Ionicons name="document-text-outline" size={24} color="#9CA3AF" />
            <Ionicons name="people-circle-outline" size={24} color="#9CA3AF" />
            <Ionicons name="person-circle-outline" size={24} color="#9CA3AF" />
         </View>
      </MainLayout> 
   );
};

export default Dashboard;

const styles = StyleSheet.create({
   mainContent: {
      flex: 1,
      padding: 20
   },

   sectionTitle: {
      fontFamily: 'InterSemiBold',
      fontSize: 24,
      color: '#2C2C2C' 
   },

   footerMenuContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 30,
      paddingVertical: 15,
      borderColor: '#ebeef3',
      backgroundColor: '#FFFFF',
      borderTopWidth: 1
   }
});