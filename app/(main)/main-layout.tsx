import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type MainLayoutProps = {
	children: React.ReactNode;
}

export default function MainLayout({children}: MainLayoutProps) {
  	return (
    	<View style={styles.container}>
      		{children}
    	</View>
  	);
}

const styles = StyleSheet.create({
  	container: {
		flex: 1
  	},
});