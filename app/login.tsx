import { StyleSheet, Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import BackButton from '@/components/BackButton'
import ScreenTitle from '@/components/ScreenTitle'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Show password icon toggle
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    // Navigate to Dashboard
    const router = useRouter();
    const handleLogin = () => {
        router.push('/(main)/dashboard');
    }

   return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
         <View style={styles.container}>
            <BackButton />
            <View style={styles.formContainer}>
               <View style={styles.formBox}>
                  <ScreenTitle 
                     title='Welcome Back!'
                     subTitle='Sign in to access your dashboard and features'
                  />
                  <View style={styles.inputContainer}>
                     <View style={styles.usernameFieldContainer}>
                        <Input 
                           value={username.trim()}
                           iconLeft={<Ionicons name="person-outline" size={18} color="#D1D5DB" />}
                           placeHolder='Enter your username'
                           onChangeText={(newText) => {setUsername(newText)}}
                        />
                     </View>
                     <View style={styles.passwordFieldContainer}>
                        <Input
                           value={password.trim()}
                           iconLeft={<Ionicons name="lock-closed-outline" size={18} color="#D1D5DB" />}
                           placeHolder='Enter your password'
                           iconRight={<Ionicons name={
                                 showPassword ? 'eye-outline' : 'eye-off-outline'
                           } size={18} color="#D1D5DB" />}
                           onChangeText={(newText) => {setPassword(newText)}}
                           secureTextEntry={
                                 showPassword ? false : true
                           }
                           onPress={togglePasswordVisibility}
                        />
                     </View>
                     <Button 
                        title='Login'
                        onPress={handleLogin}
                     />
                  </View>
               </View>
            </View>
         </View>
      </TouchableWithoutFeedback>
   );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20
    },

    formContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20
    },

    formBox: {
        paddingVertical: 50,
        paddingHorizontal: 25,
        borderWidth: 1,
        borderRadius: 12,
        borderColor: '#E5E7EB',
        backgroundColor: '#FFFFFF',
        // Soft shadow 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 4
    },
    
    inputContainer: {
        marginTop: 40
    },

    usernameFieldContainer: {
        marginBottom: 20
    },

    passwordFieldContainer: {
        marginBottom: 40
    }
});