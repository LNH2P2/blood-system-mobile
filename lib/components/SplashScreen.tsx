import { theme } from '@/lib/theme'
import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
const { width } = Dimensions.get('window')

interface SplashScreenProps {
  onFinish?: () => void
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (onFinish) onFinish()
    }, 2000)

    return () => clearTimeout(timer)
  }, [onFinish])

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("@/assets/images/icon.png")} resizeMode="contain" />
        <Text style={styles.logoText}>Medics</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: theme.color.light,
    fontSize: 48,
    fontWeight: 'bold',
  },
  image: {
    width: width * 0.7,
    height: width * 0.7,
    marginBottom: 40,
  }
})

export default SplashScreen