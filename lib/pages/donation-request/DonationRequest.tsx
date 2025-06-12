import React, { useState } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import { useGetListDonationReqQuery } from '@/lib/hooks/api/useDonationRequest'
import { useNotifications } from '@/lib/hooks/useNotifications'
import ListRequest from '@/lib/pages/donation-request/components/ListRequest'
import { theme } from '@/lib/theme'
import { useRouter } from 'expo-router'

export default function DonationRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { data } = useGetListDonationReqQuery()
  const { scheduleAppointmentReminder, sendTestNotification } =
    useNotifications()

  console.log('data', data)

  // Hàm xử lý khi tạo appointment thành công
  const handleAppointmentCreated = async (appointmentData: {
    id: string
    title: string
    date: Date
  }) => {
    try {
      // Lên lịch thông báo cho cuộc hẹn
      const notificationIds = await scheduleAppointmentReminder(
        appointmentData.id,
        appointmentData.date,
        appointmentData.title
      )

      console.log('Đã lên lịch thông báo cho cuộc hẹn:', notificationIds)

      // Hiển thị thông báo thành công
      alert(
        'Đặt lịch thành công! Bạn sẽ nhận được thông báo nhắc nhở trước khi đến hẹn.'
      )
    } catch (error) {
      console.error('Lỗi khi lên lịch thông báo:', error)
      alert('Đặt lịch thành công nhưng không thể tạo thông báo nhắc nhở.')
    }
  }

  return (
    <>
      <ListRequest />

      <View style={styles.buttonContainer}>
        <SubmitButton
          onPress={() => router.push('/(donation-request)/donation-blood')}
          isSubmitting={isSubmitting}
        />

        {/* Nút test notification */}
        {/* <TouchableOpacity
          style={[
            styles.submitButton,
            { backgroundColor: '#6366f1', marginTop: 10 }
          ]}
          onPress={sendTestNotification}
        >
          <Text style={styles.submitButtonText}>Test Thông báo</Text>
        </TouchableOpacity> */}
      </View>

      <View style={styles.bottomSpacing} />
    </>
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
    backgroundColor: '#f9fafb'
  },
  scrollView: {
    flex: 1
  },
  form: {
    padding: 20
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
  buttonContainer: {
    marginTop: 20,
    paddingHorizontal: 20
  },
  bottomSpacing: {
    height: 20
  }
})
