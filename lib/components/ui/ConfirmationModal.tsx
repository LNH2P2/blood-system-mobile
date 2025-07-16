import { Feather } from '@expo/vector-icons'
import React from 'react'
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import Modal from 'react-native-modal'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface ConfirmationModalProps {
  isVisible: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
  destructive?: boolean
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isVisible,
  title,
  message,
  confirmText = 'Xác nhận',
  cancelText = 'Hủy',
  onConfirm,
  onCancel,
  destructive = false
}) => {
  const insets = useSafeAreaInsets()
  const screenHeight = Dimensions.get('window').height

  return (
    <Modal
      isVisible={isVisible}
      animationIn='slideInUp'
      animationOut='slideOutDown'
      backdropOpacity={0.5}
      onBackdropPress={onCancel}
      onBackButtonPress={onCancel}
      useNativeDriverForBackdrop
      style={styles.bottomSheetModal}
      swipeDirection={['down']}
      onSwipeComplete={onCancel}
      coverScreen={true}
      deviceHeight={screenHeight}
      deviceWidth={undefined}
      statusBarTranslucent={true}
      hideModalContentWhileAnimating={false}
    >
      {/* Full screen overlay to ensure complete coverage */}
      <View style={styles.fullScreenOverlay}>
        <View
          style={[
            styles.modalContent,
            { paddingBottom: Math.max(40, insets.bottom + 20) }
          ]}
        >
          {/* Drag Indicator */}
          <View style={styles.dragIndicator} />

          {/* Header */}
          <View style={styles.header}>
            <View
              style={[
                styles.iconContainer,
                destructive && styles.destructiveIconContainer
              ]}
            >
              <Feather
                name={destructive ? 'trash-2' : 'alert-circle'}
                size={28}
                color={destructive ? '#ef4444' : '#f59e0b'}
              />
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                destructive ? styles.destructiveButton : styles.confirmButton
              ]}
              onPress={onConfirm}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.confirmButtonText,
                  destructive && styles.destructiveButtonText
                ]}
              >
                {confirmText}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelButtonText}>{cancelText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  bottomSheetModal: {
    justifyContent: 'flex-end',
    margin: 0,
    zIndex: 9999
  },
  fullScreenOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent'
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    minHeight: 250,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 15,
    zIndex: 10000
  },
  header: {
    alignItems: 'center',
    marginBottom: 20
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#d1d5db',
    borderRadius: 2,
    marginBottom: 20,
    alignSelf: 'center'
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fee2e2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16
  },
  destructiveIconContainer: {
    backgroundColor: '#fee2e2'
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 8
  },
  message: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32
  },
  buttonContainer: {
    gap: 12
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56
  },
  cancelButton: {
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#d1d5db'
  },
  confirmButton: {
    backgroundColor: '#3b82f6'
  },
  destructiveButton: {
    backgroundColor: '#ef4444'
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151'
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white'
  },
  destructiveButtonText: {
    color: 'white'
  }
})

export default ConfirmationModal
