import { useBooking } from '@/lib/contexts/BookingContext'
import { theme } from '@/lib/theme'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

const DonationBlood = () => {
  const router = useRouter()
  const { selectedPlace, setSelectedPlace } = useBooking()
  const currentDate = new Date()
  const [selectedDate, setSelectedDate] = useState<number | null>(
    currentDate.getDate()
  ) // Sử dụng ngày hiện tại
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth()) // Tháng hiện tại
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear()) // Năm hiện tại

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  // Tính số ngày trong tháng
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Tính ngày đầu tiên của tháng là thứ mấy
  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay()
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11)
        setCurrentYear(currentYear - 1)
      } else {
        setCurrentMonth(currentMonth - 1)
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0)
        setCurrentYear(currentYear + 1)
      } else {
        setCurrentMonth(currentMonth + 1)
      }
    }
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear)
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear)
    const today = new Date().getDate()
    const currentDate = new Date()
    const isCurrentMonth =
      currentMonth === currentDate.getMonth() &&
      currentYear === currentDate.getFullYear()

    const days = []

    // Thêm các ô trống cho những ngày của tháng trước
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <View key={`empty-${i}`} style={styles.dayContainer}>
          <View style={styles.emptyDay} />
        </View>
      )
    }

    // Thêm các ngày trong tháng
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = selectedDate === day
      const isToday = isCurrentMonth && today === day

      days.push(
        <View key={day} style={styles.dayContainer}>
          <TouchableOpacity
            style={[
              styles.dayButton,
              isSelected && styles.selectedDay,
              isToday && !isSelected && styles.todayDay
            ]}
            onPress={() => {
              setSelectedDate(day)
              router.push('/(member)/donation-request/donation-place')
            }}
          >
            <Text
              style={[
                styles.dayText,
                isSelected && styles.selectedDayText,
                isToday && !isSelected && styles.todayDayText
              ]}
            >
              {day}
            </Text>
          </TouchableOpacity>
        </View>
      )
    }

    return days
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header với navigation tháng */}
        <View style={styles.calendarHeader}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigateMonth('prev')}
          >
            <Text style={styles.navButtonText}>Tháng trước</Text>
          </TouchableOpacity>

          <Text style={styles.monthYear}>
            {months[currentMonth]} {currentYear}
          </Text>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigateMonth('next')}
          >
            <Text style={styles.navButtonText}>Tháng sau</Text>
          </TouchableOpacity>
        </View>

        {/* Calendar */}
        <View style={styles.calendar}>
          <View style={styles.weekHeader}>
            {daysOfWeek.map((day) => (
              <View key={day} style={styles.weekDayContainer}>
                <Text style={styles.weekDayText}>{day}</Text>
              </View>
            ))}
          </View>

          <View style={styles.daysGrid}>{renderCalendar()}</View>
        </View>

        {/* Section chọn địa điểm */}
        <View style={styles.locationSection}>
          <TouchableOpacity
            style={[
              styles.locationButton,
              selectedPlace && styles.selectedLocationButton
            ]}
            onPress={() =>
              router.push('/(member)/donation-request/donation-place')
            }
          >
            {selectedPlace ? (
              <View>
                <Text style={styles.selectedLocationTitle} numberOfLines={2}>
                  {selectedPlace.title}
                </Text>
                {selectedPlace.address && (
                  <Text
                    style={styles.selectedLocationAddress}
                    numberOfLines={2}
                  >
                    {selectedPlace.address}
                  </Text>
                )}
              </View>
            ) : (
              <Text style={styles.locationButtonText}>Chọn địa điểm</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Nút đặt lịch - Fixed ở đáy màn hình */}

      {selectedDate && selectedPlace && (
        <View style={styles.bottomButtonContainer}>
          <SubmitButton
            onPress={() => {
              if (selectedDate && selectedPlace) {
                // Xử lý logic đặt lịch ở đây
                console.log(
                  `Đặt lịch hiến máu vào ngày ${selectedDate} tại ${selectedPlace.title}`
                )
              } else {
                alert('Vui lòng chọn ngày và địa điểm')
              }

              setSelectedDate(null) // Reset ngày đã chọn
              setCurrentMonth(currentDate.getMonth()) // Reset về tháng hiện tại
              setCurrentYear(currentDate.getFullYear()) // Reset về năm hiện tại
              setSelectedPlace(null) // Reset địa điểm đã chọn

              router.push('/(member)/donation-request')
            }}
            isSubmitting={false}
          />
        </View>
      )}
    </SafeAreaView>
  )
}

interface SubmitButtonProps {
  onPress: () => void
  isSubmitting: boolean
}

const SubmitButton = ({ onPress, isSubmitting }: SubmitButtonProps) => (
  <TouchableOpacity
    style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
    onPress={onPress}
    disabled={isSubmitting}
  >
    {isSubmitting ? (
      <View style={styles.submitButtonContent}>
        <ActivityIndicator size='small' color='white' />
        <Text style={styles.submitButtonText}>Đang xử lý...</Text>
      </View>
    ) : (
      <Text style={styles.submitButtonText}>Đặt lịch</Text>
    )}
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: '100%',
    backgroundColor: '#f5f5f5'
  },
  scrollView: {
    flex: 1
  },
  scrollContent: {
    paddingBottom: 80 // Đảm bảo nội dung không bị che bởi nút đặt lịch
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5'
  },
  navButton: {
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  navButtonText: {
    color: theme.color.primary,
    fontSize: 14,
    fontWeight: '500'
  },
  monthYear: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  calendar: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5
  },
  weekHeader: {
    flexDirection: 'row',
    marginBottom: 16
  },
  weekDayContainer: {
    flex: 1,
    alignItems: 'center'
  },
  weekDayText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666'
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  dayContainer: {
    width: '14.28%', // 100% / 7 days
    aspectRatio: 1,
    padding: 2
  },
  dayButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  selectedDay: {
    backgroundColor: theme.color.primary
  },
  todayDay: {
    backgroundColor: '#f0f0f0'
  },
  emptyDay: {
    flex: 1
  },
  dayText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500'
  },
  selectedDayText: {
    color: 'white',
    fontWeight: 'bold'
  },
  todayDayText: {
    color: theme.color.primary,
    fontWeight: 'bold'
  },
  locationSection: {
    margin: 16,
    gap: 12
  },
  locationButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5
  },
  locationButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500'
  },
  selectedLocationButton: {
    borderWidth: 1,
    borderColor: theme.color.primary
  },
  selectedLocationTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500'
  },
  selectedLocationAddress: {
    fontSize: 14,
    color: '#666',
    fontWeight: '400'
  },
  addressButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5
  },
  addressButtonText: {
    fontSize: 16,
    color: '#999',
    fontWeight: '500'
  },
  bookingButtonContainer: {
    margin: 16,
    alignItems: 'center'
  },
  bookingButton: {
    backgroundColor: theme.color.primary,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5
  },
  bookingButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  },
  selectedPlaceInfo: {
    marginTop: 8
  },
  selectedPlaceAddress: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500'
  },
  selectedPlaceTime: {
    fontSize: 12,
    color: '#999',
    fontWeight: '400'
  },
  submitButton: {
    backgroundColor: theme.color.primary,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  submitButtonDisabled: {
    backgroundColor: '#9ca3af'
  },
  submitButtonContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 16
  }
})

export default DonationBlood
