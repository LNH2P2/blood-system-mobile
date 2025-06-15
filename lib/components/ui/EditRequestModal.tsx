import { Feather } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import Modal from 'react-native-modal'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface DonationRequest {
  id: string
  title: string
  date: string
  description?: string
  location?: string
  time?: string
}

interface EditRequestModalProps {
  isVisible: boolean
  request: DonationRequest | null
  onSave: (updatedRequest: DonationRequest) => void
  onCancel: () => void
}

const EditRequestModal: React.FC<EditRequestModalProps> = ({
  isVisible,
  request,
  onSave,
  onCancel
}) => {
  const insets = useSafeAreaInsets()
  const screenHeight = Dimensions.get('window').height
  const [formData, setFormData] = useState({
    date: '',
    location: ''
  })

  useEffect(() => {
    if (request) {
      setFormData({
        date: request.date || '',
        location: request.location || ''
      })
    }
  }, [request])

  const handleSave = () => {
    if (request) {
      const updatedRequest: DonationRequest = {
        ...request,
        date: formData.date,
        location: formData.location
      }
      onSave(updatedRequest)
    }
  }
  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }))
  }

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
      avoidKeyboard={true}
    >
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
          <Text style={styles.title}>Chỉnh sửa yêu cầu</Text>
        </View>

        <View style={styles.contentWrapper}>
          {/* Date Field */}
          <View style={styles.fieldContainer}>
            <View style={styles.fieldHeader}>
              <Feather name='calendar' size={18} color='#6b7280' />
              <Text style={styles.fieldLabel}>Ngày thực hiện</Text>
            </View>
            <TextInput
              style={styles.textInput}
              value={formData.date}
              onChangeText={(text) => updateField('date', text)}
              placeholder='dd/mm/yyyy'
              placeholderTextColor='#9ca3af'
            />
          </View>
          {/* Location Field */}
          <View style={styles.fieldContainer}>
            <View style={styles.fieldHeader}>
              <Feather name='map-pin' size={18} color='#6b7280' />
              <Text style={styles.fieldLabel}>Địa điểm</Text>
            </View>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={formData.location}
              onChangeText={(text) => updateField('location', text)}
              placeholder='Nhập địa điểm tổ chức...'
              placeholderTextColor='#9ca3af'
              multiline
              numberOfLines={4}
              textAlignVertical='top'
            />
          </View>
          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
              activeOpacity={0.7}
            >
              <Feather
                name='check'
                size={20}
                color='white'
                style={styles.buttonIcon}
              />
              <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onCancel}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelButtonText}>Hủy</Text>
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
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: 300,
    height: '80%',
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
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#d1d5db',
    borderRadius: 2,
    marginBottom: 20,
    alignSelf: 'center'
  },
  header: {
    alignItems: 'center',
    marginBottom: 24
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 22
  },
  contentWrapper: {
    flex: 1,
    flexDirection: 'column'
  },
  formContainer: {
    flex: 1,
    marginBottom: 16
  },
  scrollContent: {
    paddingBottom: 20
  },
  fieldContainer: {
    marginBottom: 20
  },
  fieldHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 8
  },
  textInput: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1f2937',
    minHeight: 52
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top'
  },
  buttonContainer: {
    gap: 12
  },
  saveButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
    shadowColor: '#3b82f6',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8
  },
  buttonIcon: {
    marginRight: 8
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white'
  },
  cancelButton: {
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#d1d5db',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151'
  }
})

export default EditRequestModal
