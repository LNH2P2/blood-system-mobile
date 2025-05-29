import { theme } from '@/lib/theme'
import React from 'react'
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

interface CustomAlertProps {
  visible: boolean
  title: string
  message: string
  onClose?: () => void
  buttons?: {
    text: string
    onPress: () => void
    type?: 'default' | 'cancel' | 'destructive'
  }[]
  loading?: boolean
}

const CustomAlert = ({
  visible,
  title,
  message,
  onClose,
  buttons = [{ text: 'OK', onPress: () => {}, type: 'default' }],
  loading = false
}: CustomAlertProps) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType='fade'
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {loading && (
            <ActivityIndicator
              size='large'
              color={theme.color.primary}
              style={styles.loader}
            />
          )}

          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalText}>{message}</Text>

          <View style={styles.buttonsContainer}>
            {buttons.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  button.type === 'destructive' && styles.destructiveButton,
                  button.type === 'cancel' && styles.cancelButton,
                  index > 0 && { marginLeft: 8 }
                ]}
                onPress={() => {
                  button.onPress()
                  if (onClose) onClose()
                }}
              >
                <Text
                  style={[
                    styles.buttonText,
                    button.type === 'destructive' &&
                      styles.destructiveButtonText,
                    button.type === 'cancel' && styles.cancelButtonText
                  ]}
                >
                  {button.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: theme.color.dark,
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    color: theme.color.darkGray,
    fontSize: 15,
    lineHeight: 22
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%'
  },
  button: {
    flex: 1,
    backgroundColor: theme.color.primary,
    borderRadius: 8,
    padding: 12,
    elevation: 2,
    alignItems: 'center'
  },
  cancelButton: {
    backgroundColor: theme.color.lightGray
  },
  destructiveButton: {
    backgroundColor: theme.color.danger
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15
  },
  cancelButtonText: {
    color: theme.color.darkGray
  },
  destructiveButtonText: {
    color: 'white'
  },
  loader: {
    marginBottom: 20
  }
})

export default CustomAlert
