import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainLayout, { globalStyles } from './main-layout';
import Header from '@/components/Layout/Header';
import Button from '@/components/UI/Button';
import { colors } from '@/constants/colors';
import SummaryItem ,{ SummaryItemProps } from '@/components/UI/SummaryItem';

const Employees = () => {
	const employeeSummaryData: SummaryItemProps[] = [
		{value: 50, label: 'Total', customValueStyle: colors.primaryLight, showDivider: true},
		{value: 42, label: 'Active', customValueStyle: colors.whiteFaded, showDivider: true},
		{value: 8, label: 'Inactive', customValueStyle: colors.dangerFaded, showDivider: false},
	];

  	return (
		<MainLayout>
			<View style={styles.container}>
				<Header 
					leftComponent={
						<View>
							<Text style={globalStyles.headerScreenLabel}>Manage</Text>
							<Text style={globalStyles.headerScreenTitle}>Employees</Text>
						</View>
					}
					rightComponent={
						<Button 
							title='Add Employee'
							icon='add'
							iconSize={22}
							iconColor={colors.primary}
							customContainerStyle={styles.buttonContainer}
							customTitleStyle={styles.buttonTitle}
							onPress={() => console.log()}
						/>
					}
					bottomComponent={
						<View style={globalStyles.summaryContainer}>
							{employeeSummaryData.map((item) => (
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

export default Employees;

const styles = StyleSheet.create({
	container: {
		flex: 1
	},

	buttonContainer: {
		height: 45,
		width: 150,
		backgroundColor: colors.primaryLight
	},

	buttonTitle: {
		fontSize: 16,
		color: colors.primary,
		marginLeft: 5
	}

});