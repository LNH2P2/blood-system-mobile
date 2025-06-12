import * as Notifications from 'expo-notifications'
import { useEffect, useState } from 'react'
import NotificationService from '../services/NotificationService'

export interface AppointmentReminder {
  appointmentId: string
  appointmentDate: Date
  appointmentTitle: string
  notificationIds: string[]
}

export const useNotifications = () => {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null)
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null)

  useEffect(() => {
    NotificationService.registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token)
    })

    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification)
        console.log('Notification received:', notification)
      }
    )

    // Listener cho khi user tap vào notification
    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log('Notification response:', response)
        const data = response.notification.request.content.data

        if (data.type === 'appointment_reminder') {
          // Navigate to appointment screen hoặc show appointment details
          console.log(
            'User tapped appointment reminder for:',
            data.appointmentId
          )
        }
      })

    return () => {
      notificationListener.remove()
      responseListener.remove()
    }
  }, [])

  // Hàm để lên lịch thông báo cho cuộc hẹn
  const scheduleAppointmentReminder = async (
    appointmentId: string,
    appointmentDate: Date,
    appointmentTitle: string
  ): Promise<string[]> => {
    try {
      const notificationIds =
        await NotificationService.scheduleMultipleReminders(
          appointmentId,
          appointmentDate,
          appointmentTitle
        )

      // console.log('Scheduled notifications:', notificationIds)

      return notificationIds
    } catch (error) {
      console.error('Error scheduling appointment reminder:', error)
      return []
    }
  }

  const cancelAppointmentReminder = async (
    notificationIds: string[]
  ): Promise<void> => {
    try {
      await NotificationService.cancelAppointmentNotifications(notificationIds)
      console.log('Cancelled appointment notifications')
    } catch (error) {
      console.error('Error cancelling appointment notifications:', error)
    }
  }

  const sendTestNotification = async (): Promise<void> => {
    try {
      await NotificationService.sendImmediateNotification(
        '🩸 Test Notification',
        'Đây là thông báo test từ ứng dụng hiến máu!'
      )
    } catch (error) {
      console.error('Error sending test notification:', error)
    }
  }

  const getScheduledNotifications = async (): Promise<
    Notifications.NotificationRequest[]
  > => {
    try {
      return await NotificationService.getScheduledNotifications()
    } catch (error) {
      console.error('Error getting scheduled notifications:', error)
      return []
    }
  }

  return {
    expoPushToken,
    notification,
    scheduleAppointmentReminder,
    cancelAppointmentReminder,
    sendTestNotification,
    getScheduledNotifications
  }
}
