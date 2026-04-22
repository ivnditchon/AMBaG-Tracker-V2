import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

const BackButton = () => {
    const handlePress = () => {
        if (router.canGoBack()) { // Check if there is a screen to go back
            router.back();
        } else {
            router.replace('/'); // Fallback (e.g. Welcome screen)
        }
    }

    return (
        <TouchableOpacity 
            style={styles.container}
            onPress={handlePress}
        >
            <Ionicons name='chevron-back-outline' size={18} color='#2C2C2C' style={styles.icon}/>
            <Text style={styles.title}>
                Back
            </Text>
        </TouchableOpacity>
    );
}

export default BackButton;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    icon: {
        marginRight: 5
    },

    title: {
        fontFamily: 'InterRegular',
        fontSize: 16,
        color: '#2C2C2C'
    }
});