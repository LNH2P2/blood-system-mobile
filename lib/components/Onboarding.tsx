import { theme } from '@/lib/theme';
import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface OnboardingProps {
  onFinish: () => void
}

const { width } = Dimensions.get('window')

const onboardingData = [
  {
    id: '1',
    title: 'Consult only with a doctor you trust',
    image: require('@/assets/images/doctor1.png'),
  },
  {
    id: '2',
    title: 'Find a lot of specialist doctors in one place',
    image: require('@/assets/images/doctor2.png'),
  },
  {
    id: '3',
    title: 'Get connect our Online Consultation',
    image: require('@/assets/images/doctor3.png'),
  },
  {
    id: '4',
    title: 'Let\'s get started!',
    description: 'Login to enjoy the features we\'ve provided, and stay healthy!',
    showButtons: true,
    image: require('@/assets/images/logo-text-primary.svg'),
  },
]

const Onboarding: React.FC<OnboardingProps> = ({ onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const flatListRef = useRef<FlatList>(null)

  const goToNextSlide = () => {
    if (currentIndex < onboardingData.length - 1) {
      const nextIndex = currentIndex + 1
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true
      })
      setCurrentIndex(nextIndex)
    }
  }

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <View style={[styles.slide, { width }]}>
        {item.image ? (
          <Image source={item.image} style={styles.image} resizeMode="contain" />
        ) : (
          <View style={styles.logoContainer}>
            <Image 
              source={require('@/assets/images/icon.svg')} 
              style={styles.logo} 
              resizeMode="contain" 
            />
            <Text style={styles.logoText}>Medics</Text>
          </View>
        )}
        
        <Text style={styles.title}>{item.title}</Text>
        
        {item.description && (
          <Text style={styles.description}>{item.description}</Text>
        )}

        {item.showButtons ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.loginButton} 
              onPress={onFinish}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.signUpButton} 
              onPress={onFinish}
            >
              <Text style={styles.signUpButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.paginationContainer}>
            <View style={styles.pagination}>
              {onboardingData.slice(0, 3).map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.paginationDot,
                    i === index ? styles.paginationDotActive : styles.paginationDotInactive
                  ]}
                />
              ))}
            </View>
            
            <TouchableOpacity 
              style={styles.nextButton}
              onPress={goToNextSlide}
            >
              <Ionicons name="arrow-forward" size={22} color={theme.color.light} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x / width
          )
          setCurrentIndex(index)
        }}
        scrollEnabled={true}
        initialScrollIndex={currentIndex}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.light,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: width * 0.7,
    height: width * 0.7,
    marginBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    tintColor: theme.color.primary,
  },
  logoText: {
    color: theme.color.primary,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.color.dark,
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: theme.color.darkGray,
    textAlign: 'center',
    marginBottom: 30,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 40,
  },
  pagination: {
    flexDirection: 'row',
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  paginationDotActive: {
    backgroundColor: theme.color.primary,
  },
  paginationDotInactive: {
    backgroundColor: theme.color.lightGray,
  },
  nextButton: {
    backgroundColor: theme.color.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 30,
  },
  loginButton: {
    backgroundColor: theme.color.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    color: theme.color.light,
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpButton: {
    backgroundColor: theme.color.light,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.color.lightGray,
  },
  signUpButtonText: {
    color: theme.color.dark,
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default Onboarding