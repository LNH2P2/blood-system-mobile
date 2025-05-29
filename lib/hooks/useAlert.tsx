import React, { createContext, useContext, useState } from 'react'
import CustomAlert from '../components/ui/CustomAlert'

type AlertButtonType = 'default' | 'cancel' | 'destructive'

interface AlertButton {
  text: string
  onPress: () => void
  type?: AlertButtonType
}

interface AlertContextType {
  showAlert: (config: {
    title: string
    message: string
    buttons?: AlertButton[]
  }) => void
  showSuccess: (message: string, onClose?: () => void) => void
  showError: (message: string, onClose?: () => void) => void
  showConfirm: (config: {
    title: string
    message: string
    onConfirm: () => void
    onCancel?: () => void
    confirmText?: string
    cancelText?: string
  }) => void
  showLoading: (message: string) => void
  hideAlert: () => void
}

const AlertContext = createContext<AlertContextType | undefined>(undefined)

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [buttons, setButtons] = useState<AlertButton[]>([])
  const [loading, setLoading] = useState(false)

  const hideAlert = () => {
    setVisible(false)
    setLoading(false)
  }

  const showAlert = ({
    title,
    message,
    buttons = [{ text: 'OK', onPress: () => {}, type: 'default' }]
  }: {
    title: string
    message: string
    buttons?: AlertButton[]
  }) => {
    setTitle(title)
    setMessage(message)
    setButtons(buttons)
    setLoading(false)
    setVisible(true)
  }

  const showSuccess = (message: string, onClose?: () => void) => {
    showAlert({
      title: 'Thành công',
      message,
      buttons: [
        {
          text: 'OK',
          onPress: () => {
            if (onClose) onClose()
          },
          type: 'default'
        }
      ]
    })
  }

  const showError = (message: string, onClose?: () => void) => {
    showAlert({
      title: 'Lỗi',
      message,
      buttons: [
        {
          text: 'OK',
          onPress: () => {
            if (onClose) onClose()
          },
          type: 'default'
        }
      ]
    })
  }

  const showConfirm = ({
    title,
    message,
    onConfirm,
    onCancel,
    confirmText = 'Xác nhận',
    cancelText = 'Hủy'
  }: {
    title: string
    message: string
    onConfirm: () => void
    onCancel?: () => void
    confirmText?: string
    cancelText?: string
  }) => {
    showAlert({
      title,
      message,
      buttons: [
        {
          text: cancelText,
          onPress: () => {
            if (onCancel) onCancel()
          },
          type: 'cancel'
        },
        {
          text: confirmText,
          onPress: onConfirm,
          type: 'default'
        }
      ]
    })
  }

  const showLoading = (message: string) => {
    setTitle('Đang xử lý')
    setMessage(message)
    setButtons([])
    setLoading(true)
    setVisible(true)
  }

  return (
    <AlertContext.Provider
      value={{
        showAlert,
        showSuccess,
        showError,
        showConfirm,
        showLoading,
        hideAlert
      }}
    >
      {children}
      <CustomAlert
        visible={visible}
        title={title}
        message={message}
        buttons={buttons}
        loading={loading}
        onClose={hideAlert}
      />
    </AlertContext.Provider>
  )
}

export const useAlert = () => {
  const context = useContext(AlertContext)
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider')
  }
  return context
}
