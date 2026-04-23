import { View, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';
import FooterMenu, { FooterMenuProps } from '@/components/UI/FooterMenu'

type MainLayoutProps = {
	children: React.ReactNode;
};

export default function MainLayout({children}: MainLayoutProps) {
	const footerData: FooterMenuProps[] = [
		{icon: 'grid-outline', size: 22, color: colors.subtext, label: 'Dashboard'},
		{icon: 'people-outline', size: 22, color: colors.subtext, label: 'Employees'},
		{icon: 'calendar-outline', size: 22, color: colors.subtext, label: 'Attendance'},
		{icon: 'shirt-outline', size: 22, color: colors.subtext, label: 'Uniform'},
		{icon: 'document-text-outline', size: 22, color: colors.subtext, label: 'Reports'},
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
						size={item.size}
						color={item.color}
						label={item.label}
					/>
				))}
			</View>
    	</View>
  	);
};

const styles = StyleSheet.create({
  	container: {
		flex: 1
  	},

	footer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: colors.white,
		borderTopWidth: 1,
		borderColor: colors.border,
		paddingHorizontal: 12,
		paddingTop: 18
   }
});