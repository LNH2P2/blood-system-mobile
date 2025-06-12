import Constants from 'expo-constants'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import { SchedulableTriggerInputTypes } from 'expo-notifications'
import { Platform } from 'react-native'

// Cấu hình behavior cho notification
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true
  })
})

export interface ScheduledNotification {
  id: string
  title: string
  body: string
  scheduledDate: Date
  appointmentId: string
}

class NotificationService {
  async registerForPushNotificationsAsync(): Promise<string | null> {
    let token = null

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C'
      })
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }

      if (finalStatus !== 'granted') {
        alert(
          'Không thể nhận thông báo. Vui lòng bật quyền thông báo trong cài đặt.'
        )
        return null
      }

      try {
        const projectId =
          Constants?.expoConfig?.extra?.eas?.projectId ??
          Constants?.easConfig?.projectId
        if (!projectId) {
          throw new Error('Project ID not found')
        }
        token = (await Notifications.getExpoPushTokenAsync({ projectId })).data
      } catch (e) {
        console.log('Error getting push token:', e)
      }
    } else {
      alert('Phải sử dụng thiết bị thật để nhận push notifications!')
    }

    // console.log('token', token)

    return token
  }

  async scheduleAppointmentNotification(
    appointmentId: string,
    appointmentDate: Date,
    appointmentTitle: string,
    reminderMinutes: number = 60 // Nhắc nhở trước 60 phút
  ): Promise<string | null> {
    try {
      const reminderDate = new Date(
        appointmentDate.getTime() - reminderMinutes * 60 * 1000
      )

      // Kiểm tra nếu thời gian nhắc nhở đã qua
      if (reminderDate <= new Date()) {
        console.log('Thời gian nhắc nhở đã qua')
        return null
      }

      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: '🩸 Sắp đến lịch hiến máu',
          body: `${appointmentTitle} sẽ bắt đầu trong ${reminderMinutes} phút`,
          data: {
            appointmentId,
            type: 'appointment_reminder',
            appointmentDate: appointmentDate.toISOString()
          },
          sound: 'default'
        },
        trigger: {
          type: SchedulableTriggerInputTypes.DATE,
          date: reminderDate
        }
      })

      console.log(
        `Đã lên lịch thông báo: ${notificationId} cho ${reminderDate}`
      )
      return notificationId
    } catch (error) {
      console.error('Lỗi khi lên lịch thông báo:', error)
      return null
    }
  }

  async scheduleMultipleReminders(
    appointmentId: string,
    appointmentDate: Date,
    appointmentTitle: string
  ): Promise<string[]> {
    const reminderTimes = [
      { minutes: 24 * 60, label: '1 ngày trước' }, // 1 ngày trước
      { minutes: 60, label: '1 giờ trước' }, // 1 giờ trước
      { minutes: 15, label: '15 phút trước' } // 15 phút trước
    ]

    const notificationIds: string[] = []

    for (const reminder of reminderTimes) {
      const id = await this.scheduleAppointmentNotification(
        appointmentId,
        appointmentDate,
        `${appointmentTitle} (${reminder.label})`,
        reminder.minutes
      )
      if (id) {
        notificationIds.push(id)
      }
    }

    return notificationIds
  }

  // Hủy thông báo đã lên lịch
  async cancelNotification(notificationId: string): Promise<void> {
    try {
      await Notifications.cancelScheduledNotificationAsync(notificationId)
      console.log(`Đã hủy thông báo: ${notificationId}`)
    } catch (error) {
      console.error('Lỗi khi hủy thông báo:', error)
    }
  }

  // Hủy tất cả thông báo cho một cuộc hẹn
  async cancelAppointmentNotifications(
    notificationIds: string[]
  ): Promise<void> {
    for (const id of notificationIds) {
      await this.cancelNotification(id)
    }
  }

  // Lấy danh sách thông báo đã lên lịch
  async getScheduledNotifications(): Promise<
    Notifications.NotificationRequest[]
  > {
    return await Notifications.getAllScheduledNotificationsAsync()
  }

  // Gửi thông báo ngay lập tức (test)
  async sendImmediateNotification(
    title: string,
    body: string,
    data?: any
  ): Promise<string> {
    return await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: data || {},
        sound: 'default'
      },
      trigger: null
    })
  }
}

export default new NotificationService()
