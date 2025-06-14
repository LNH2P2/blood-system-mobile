import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import React, { useState } from 'react'
import {
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

interface ImagePickerComponentProps {
  label?: string
  value: string
  onChangeImage: (uri: string) => void
  error?: string
  placeholder?: string
  isRequired?: boolean
}

const ImagePickerComponent: React.FC<ImagePickerComponentProps> = ({
  label,
  value,
  onChangeImage,
  error,
  placeholder = 'Chọn ảnh từ thiết bị',
  isRequired = false
}) => {
  const [modalVisible, setModalVisible] = useState(false)

  const requestPermissions = async () => {
    // Request camera permission
    const cameraResult = await ImagePicker.requestCameraPermissionsAsync()
    // Request media library permission
    const libraryResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (
      cameraResult.status !== 'granted' ||
      libraryResult.status !== 'granted'
    ) {
      Alert.alert(
        'Quyền truy cập bị từ chối',
        'Ứng dụng cần quyền truy cập camera và thư viện ảnh để chọn ảnh.',
        [{ text: 'OK' }]
      )
      return false
    }
    return true
  }

  const pickImageFromCamera = async () => {
    setModalVisible(false)

    const hasPermission = await requestPermissions()
    if (!hasPermission) return

    try {
      const result = await ImagePicker.launchCameraAsync({
        // mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8
      })

      if (!result.canceled && result.assets[0]) {
        onChangeImage(result.assets[0].uri)
      }
    } catch (error) {
      console.error('Error picking image from camera:', error)
      Alert.alert('Lỗi', 'Không thể chụp ảnh. Vui lòng thử lại.')
    }
  }

  const pickImageFromLibrary = async () => {
    setModalVisible(false)

    const hasPermission = await requestPermissions()
    if (!hasPermission) return

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8
      })

      if (!result.canceled && result.assets[0]) {
        onChangeImage(result.assets[0].uri)
      }
    } catch (error) {
      console.error('Error picking image from library:', error)
      Alert.alert('Lỗi', 'Không thể chọn ảnh. Vui lòng thử lại.')
    }
  }

  const removeImage = () => {
    setModalVisible(false)
    onChangeImage('')
  }

  const openImagePicker = () => {
    setModalVisible(true)
  }

  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
          {isRequired && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      <TouchableOpacity
        style={[styles.imageContainer, error && styles.imageContainerError]}
        onPress={openImagePicker}
      >
        {value ? (
          <View style={styles.imageWrapper}>
            <Image source={{ uri: value }} style={styles.selectedImage} />
            <View style={styles.imageOverlay}>
              <Ionicons name='camera' size={24} color='white' />
              <Text style={styles.changeText}>Đổi ảnh</Text>
            </View>
          </View>
        ) : (
          <View style={styles.placeholderContainer}>
            <Ionicons name='camera' size={32} color='#666' />
            <Text style={styles.placeholderText}>{placeholder}</Text>
          </View>
        )}
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Image Picker Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType='slide'
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chọn ảnh</Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={pickImageFromCamera}
            >
              <Ionicons name='camera' size={24} color='#199A8E' />
              <Text style={styles.modalButtonText}>Chụp ảnh mới</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={pickImageFromLibrary}
            >
              <Ionicons name='images' size={24} color='#199A8E' />
              <Text style={styles.modalButtonText}>Chọn từ thư viện</Text>
            </TouchableOpacity>

            {value && (
              <TouchableOpacity
                style={[styles.modalButton, styles.removeButton]}
                onPress={removeImage}
              >
                <Ionicons name='trash' size={24} color='#ef4444' />
                <Text style={[styles.modalButtonText, styles.removeButtonText]}>
                  Xóa ảnh
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8
  },
  required: {
    color: '#ef4444'
  },
  imageContainer: {
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderStyle: 'dashed',
    borderRadius: 60,
    height: 120,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb'
  },
  imageContainerError: {
    borderColor: '#ef4444'
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  changeText: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500'
  },
  placeholderContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  placeholderText: {
    color: '#9ca3af',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center'
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '80%',
    maxWidth: 300
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    textAlign: 'center',
    marginBottom: 20
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#f9fafb'
  },
  modalButtonText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#374151',
    fontWeight: '500'
  },
  removeButton: {
    backgroundColor: '#fef2f2'
  },
  removeButtonText: {
    color: '#ef4444'
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#d1d5db',
    justifyContent: 'center'
  },
  cancelButtonText: {
    color: '#6b7280',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center'
  }
})

export default ImagePickerComponent
