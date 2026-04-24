import { View, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';
import FooterMenu, { FooterMenuProps } from '@/components/Layout/FooterMenu'
import { useRouter, usePathname } from 'expo-router';

type MainLayoutProps = {
	children: React.ReactNode;
};

export default function MainLayout({children}: MainLayoutProps) {
	const router = useRouter();
	const pathname = usePathname();

	const handleEmployeesScreen = () => {
		router.push('/(main)/employees');
	};

	const footerData: FooterMenuProps[] = [
		// Home
		{	
			icon: 'grid-outline', 
			activeIcon: 'grid', 
			size: 22, 
			color: colors.subtext, 
			labelFont: 'InterRegular',
			activeLabelFont: 'InterMedium',
			labelColor: colors.subtext,
			activeLabelColor: colors.primary,
			activeColor: colors.primary, 
			label: 'Dashboard', onPress: () => {}
		},
		// Employees 
		{
			icon: 'people-outline', 
			activeIcon: 'people', 
			size: 22, 
			color: colors.subtext, 
			labelFont: 'InterRegular',
			activeLabelFont: 'InterMedium',
			labelColor: colors.subtext,
			activeLabelColor: colors.primary,
			activeColor: colors.primary, 
			label: 'Employees', 
			onPress: handleEmployeesScreen, 
			isActive: pathname.includes('employees')
		}, 
		// Attendance
		{
			icon: 'calendar-outline', 
			activeIcon: 'calendar', 
			size: 22, 
			color: colors.subtext, 
			labelFont: 'InterRegular',
			activeLabelFont: 'InterMedium',
			labelColor: colors.subtext,
			activeLabelColor: colors.primary,
			activeColor: colors.primary, 
			label: 'attendance', onPress: () => {}
		}, 		
		// Uniform
		{
			icon: 'shirt-outline', 
			activeIcon: 'shirt', 
			size: 22, 
			color: colors.subtext, 
			labelFont: 'InterRegular',
			activeLabelFont: 'InterMedium',
			labelColor: colors.subtext,
			activeLabelColor: colors.primary,
			activeColor: colors.primary, 
			label: 'uniform', onPress: () => {}
		}, 
		// Reports
		{
			icon: 'document-text-outline', 
			activeIcon: 'document-text', 
			size: 22, 
			color: colors.subtext, 
			labelFont: 'InterRegular',
			activeLabelFont: 'InterMedium',
			labelColor: colors.subtext,
			activeLabelColor: colors.primary,
			activeColor: colors.primary, 
			label: 'reports', onPress: () => {}
		}
	];

  	return (
    	<View style={styles.container}>
      	{children}
			{/** Footer section */}
			<View style={styles.footer}>
				{footerData.map((item) => (
					<FooterMenu 
						key={item.label}
						icon={item.icon}
						isActive={item.isActive}
						activeIcon={item.activeIcon}
						labelFont={item.labelFont}
						activeLabelFont={item.activeLabelFont}
						labelColor={item.labelColor}
						activeLabelColor={item.activeLabelColor}
						color={item.color}
						activeColor={item.activeColor}
						size={item.size}
						label={item.label}
						onPress={item.onPress}
					/>
				))}
			</View>
    	</View>
  	);
};

export const styles = StyleSheet.create({
  	container: {
		flex: 1
  	},

	footer: {	
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: colors.white,
		borderTopWidth: 1,
		borderColor: colors.border,
		paddingHorizontal: 20,
		paddingTop: 18
   }
});

// Global styles
export const globalStyles = StyleSheet.create({
	headerScreenLabel: {
		fontFamily: 'InterSemiBold',
		fontSize: 20,
		color: 'rgba(255,255,255,0.6)',
		letterSpacing: 0.5
	},

	headerScreenTitle: {
		fontFamily: 'InterBold',
		color: colors.white,
		fontSize: 32,
		letterSpacing: 0.5,
		marginVertical: 5,
		paddingVertical: 5
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