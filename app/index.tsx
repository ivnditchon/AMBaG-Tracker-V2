import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import ScreenTitle from '@/components/ScreenTitle'
import Button from '@/components/Button'
import { useRouter } from 'expo-router'

const Home = () => {
    /** Login screen navigation */
    const router = useRouter();
    const LoginScreen = () => {
        router.push('/login');
    };

    return (
        <View style={styles.container}>
            <Image 
                source={require('@/assets/images/Group-2.png')}
                resizeMode='cover'
                style={styles.image}
            />
            <View 
                style={styles.screenTitleContainer}    
            >
                <ScreenTitle 
                    title='Welcome, AMBaG PMO'
                    subTitle='Manage your tasks, track performance with ease and stay organized and keep everything in one place'
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button 
                    title='Login'
                    onPress={LoginScreen}
                />
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },

    image: {
        width:'100%',
        height: 300
    },

    screenTitleContainer: {
        marginTop: 50
    },

    buttonContainer: {
        marginTop: 60
    }
});