import { theme } from '@/lib/theme';
import React from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

interface LoginScreenProps {
  onLogin: () => void;
  onSignUp: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onSignUp }) => {
  return (
    <View style={styles.slide}>
      <View style={styles.logoContainer}>
        <Image 
          source={require('@/assets/images/logo-text-primary.png')} 
          style={styles.logo} 
          resizeMode="contain" 
        />
      </View>
      
      <Text style={styles.title}>Let's get started!</Text>
      <Text style={styles.description}>Login to enjoy the features we've provided, and stay healthy!</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={onLogin}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.signUpButton} 
          onPress={onSignUp}
        >
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    width: Dimensions.get('window').width,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.color.dark,
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 15,
  },
  description: {
    fontSize: 16,
    color: theme.color.darkGray,
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '90%',
    marginTop: 40,
  },
  loginButton: {
    backgroundColor: theme.color.primary,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: theme.color.light,
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpButton: {
    backgroundColor: theme.color.light,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.color.lightGray,
  },
  signUpButtonText: {
    color: theme.color.dark,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;