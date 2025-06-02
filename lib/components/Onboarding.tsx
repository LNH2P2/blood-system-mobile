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
import LoginScreen from './LoginScreen';

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
    isLoginScreen: true,
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
    if (item.isLoginScreen) {
      return <LoginScreen onLogin={onFinish} onSignUp={onFinish} />
    }

    return (
      <View style={[styles.slide, { width }]}>
        {item.image && (
          <Image source={item.image} style={styles.image} resizeMode="contain" />
        )}

        <View style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>

          {item.description && (
            <Text style={styles.description}>{item.description}</Text>
          )}

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
        </View>
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
    justifyContent: 'flex-end',
    padding: 30,
    marginBottom: 50
  },
  image: {
    width: width,
    height: width,
    marginBottom: 0,
  },
  card: {
    backgroundColor: '#F5F7FF',
    width: '100%',
    padding: 20,
    borderRadius: 15,
    marginTop: 0,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.color.dark,
    textAlign: 'left',
    marginBottom: 8,
    marginTop: 48,
  },
  description: {
    fontSize: 16,
    color: theme.color.darkGray,
    textAlign: 'center',
    marginBottom: 36,
    paddingHorizontal: 15,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paginationDot: {
    width: 12,
    height: 4,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  paginationDotActive: {
    backgroundColor: theme.color.primary,
  },
  paginationDotInactive: {
    backgroundColor: theme.color.lightGray,
  },
  nextButton: {
    backgroundColor: theme.color.primary,
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Onboarding