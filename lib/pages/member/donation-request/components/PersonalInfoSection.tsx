import { Ionicons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker'
import { Camera, CameraView } from 'expo-camera'
import React, { useState } from 'react'
import {
  Alert,
  Linking,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import { FormData, FormErrors, formatDate } from '../types'
import FormInput from './FormInput'
import Section from './Section'

interface PersonalInfoSectionProps {
  formData: FormData
  errors: FormErrors
  onChange: (field: keyof FormData, value: any) => void
}

const PersonalInfoSection = ({
  formData,
  errors,
  onChange
}: PersonalInfoSectionProps) => {
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [qrModalVisible, setQrModalVisible] = useState(false)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [scanned, setScanned] = useState(false)
  const [showOptions, setShowOptions] = useState(false)

  // Xin quyền truy cập camera khi mở modal quét QR
  const openQRScanner = async () => {
    setShowOptions(true)
  }

  // Mở modal quét QR trong ứng dụng
  const openInAppScanner = async () => {
    setShowOptions(false)
    const { status } = await Camera.requestCameraPermissionsAsync()
    setHasPermission(status === 'granted')
    if (status === 'granted') {
      setQrModalVisible(true)
    } else {
      Alert.alert(
        'Không có quyền truy cập',
        'Ứng dụng cần quyền truy cập camera để quét mã QR.',
        [{ text: 'OK' }]
      )
    }
  }

  // Mở ứng dụng quét QR mặc định của thiết bị
  const openExternalScanner = async () => {
    setShowOptions(false)

    try {
      // URL để mở ứng dụng quét QR mặc định
      let url = ''

      if (Platform.OS === 'ios') {
        // iOS sử dụng camera URL
        url = 'camera://'
      } else {
        // Android thử các ứng dụng phổ biến
        url = 'market://search?q=qr+code+scanner&c=apps'
      }

      // Kiểm tra xem URL có thể mở được không
      const canOpen = await Linking.canOpenURL(url)

      if (canOpen) {
        await Linking.openURL(url)
        // Lưu ý: Hiện không có cách để tự động lấy kết quả từ ứng dụng quét QR bên ngoài
        // Bạn sẽ cần người dùng thủ công nhập lại kết quả
        Alert.alert(
          'Thông báo',
          'Sau khi quét xong, vui lòng quay lại ứng dụng và nhập thông tin thủ công.'
        )
      } else {
        Alert.alert(
          'Thông báo',
          'Không tìm thấy ứng dụng quét QR trên thiết bị.'
        )
      }
    } catch (error) {
      console.error('Lỗi khi mở ứng dụng quét QR:', error)
      Alert.alert('Lỗi', 'Không thể mở ứng dụng quét QR.')
    }
  }

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false)
    if (selectedDate) {
      onChange('dateOfBirth', selectedDate)
    }
  }

  // Xử lý khi quét được mã QR
  const handleBarCodeScanned = ({
    type,
    data
  }: {
    type: string
    data: string
  }) => {
    setScanned(true)

    // Log dữ liệu quét được
    console.log('=== QR code scanned ===')
    console.log('Type:', type)
    console.log('Data:', data)

    try {
      // Kiểm tra nếu dữ liệu chứa dấu |, xử lý theo định dạng CCCD
      if (data.includes('|')) {
        const parts = data.split('|')

        // Format: CCCD||Họ tên|Ngày sinh|Giới tính|Địa chỉ|Ngày cấp
        // Ví dụ: 056204000613||Huỳnh Chí M Phương Nguyễn|27072004|Nam|Thôn Phước Lý, Ninh Bình, Ninh Hòa, Khánh Hòa|08042021

        // CCCD - lấy phần đầu tiên và loại bỏ dấu | thừa
        let idNumber = parts[0].replace(/\|/g, '').trim()
        if (idNumber) {
          onChange('idNumber', idNumber)
          console.log('Đã điền CCCD:', idNumber)
        }

        // Họ tên - thường ở phần thứ 2 hoặc 3 tùy định dạng
        let fullName = ''
        if (parts.length > 2 && parts[2].trim()) {
          fullName = parts[2].trim()
          onChange('fullName', fullName)
          console.log('Đã điền Họ tên:', fullName)
        }

        // Ngày sinh - thường ở phần thứ 3 hoặc 4 với định dạng DDMMYYYY
        if (parts.length > 3 && parts[3].trim()) {
          const dobString = parts[3].trim()
          if (dobString.length === 8) {
            try {
              const day = dobString.substring(0, 2)
              const month = dobString.substring(2, 4)
              const year = dobString.substring(4, 8)
              const dateString = `${year}-${month}-${day}` // YYYY-MM-DD format
              const dateOfBirth = new Date(dateString)

              // Kiểm tra xem ngày có hợp lệ không
              if (!isNaN(dateOfBirth.getTime())) {
                onChange('dateOfBirth', dateOfBirth.toDateString())
                console.log('Đã điền Ngày sinh:', formatDate(dateOfBirth))
              }
            } catch (e) {
              console.log('Không thể chuyển đổi ngày sinh:', parts[3])
            }
          }
        }

        // Giới tính
        if (parts.length > 4 && parts[4].trim()) {
          const genderText = parts[4].trim().toLowerCase()
          if (genderText === 'nam') {
            onChange('gender', 'male')
            console.log('Đã điền Giới tính: Nam')
          } else if (genderText === 'nữ' || genderText === 'nu') {
            onChange('gender', 'female')
            console.log('Đã điền Giới tính: Nữ')
          }
        }

        // Địa chỉ
        if (parts.length > 5 && parts[5].trim()) {
          const address = parts[5].trim()
          onChange('address', address)
          console.log('Đã điền Địa chỉ:', address)
        }

        // Đóng modal sau khi điền thông tin
        setTimeout(() => {
          setQrModalVisible(false)
          setScanned(false)
          Alert.alert('Thành công', 'Đã nhập thông tin từ mã QR')
        }, 500)
        return
      }

      // Nếu là JSON, xử lý theo định dạng JSON
      const parsedData = JSON.parse(data)
      console.log('Parsed JSON data:', parsedData)

      // Điền các trường dữ liệu nếu có
      if (parsedData.fullName) onChange('fullName', parsedData.fullName)
      if (parsedData.idNumber) onChange('idNumber', parsedData.idNumber)
      if (parsedData.phoneNumber)
        onChange('phoneNumber', parsedData.phoneNumber)
      if (parsedData.email) onChange('email', parsedData.email)
      if (parsedData.address) onChange('address', parsedData.address)

      if (parsedData.gender) {
        onChange('gender', parsedData.gender)
      }

      if (parsedData.dateOfBirth) {
        try {
          const dateOfBirth = new Date(parsedData.dateOfBirth)
          if (!isNaN(dateOfBirth.getTime())) {
            onChange('dateOfBirth', dateOfBirth)
          }
        } catch (e) {
          console.log('Invalid date format:', parsedData.dateOfBirth)
        }
      }

      console.log('Đã điền thông tin từ JSON:', formData)

      // Đóng modal quét QR và hiển thị thông báo thành công
      setTimeout(() => {
        setQrModalVisible(false)
        setScanned(false)
        Alert.alert('Thành công', 'Đã nhập thông tin từ mã QR')
      }, 500)
    } catch (e) {
      console.log('Không thể xử lý dữ liệu QR:', e)
      setTimeout(() => {
        setQrModalVisible(false)
        setScanned(false)
        Alert.alert(
          'Thông báo',
          'Định dạng mã QR không được hỗ trợ. Vui lòng nhập thông tin thủ công.'
        )
      }, 500)
    }
  }

  return (
    <Section
      title='Thông tin cá nhân'
      rightElement={
        <TouchableOpacity
          onPress={() => openQRScanner()}
          style={styles.qrButton}
        >
          <Ionicons name='qr-code-outline' size={22} color='#199A8E' />
        </TouchableOpacity>
      }
    >
      {/* QR Scanner Modal */}
      <Modal
        visible={qrModalVisible}
        transparent={false}
        animationType='slide'
        onRequestClose={() => setQrModalVisible(false)}
      >
        <View style={styles.qrContainer}>
          {hasPermission === null ? (
            <Text style={styles.permissionText}>
              Đang yêu cầu quyền truy cập camera...
            </Text>
          ) : hasPermission === false ? (
            <Text style={styles.permissionText}>
              Không có quyền truy cập camera.
            </Text>
          ) : (
            <>
              <CameraView
                style={StyleSheet.absoluteFillObject}
                facing='back'
                barcodeScannerSettings={{
                  barcodeTypes: ['qr']
                }}
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
              />
              <View style={[StyleSheet.absoluteFill, styles.scannerOverlay]}>
                <View style={styles.scannerTargetBorder} />
                <Text style={styles.scanTitle}>Quét mã QR</Text>
                <View style={styles.scanInstructionsContainer}>
                  <Text style={styles.scanInstructions}>
                    Đưa camera đến mã QR để quét
                  </Text>
                </View>
                {scanned && (
                  <TouchableOpacity
                    style={styles.scanAgainButton}
                    onPress={() => setScanned(false)}
                  >
                    <Text style={styles.scanAgainButtonText}>Quét lại</Text>
                  </TouchableOpacity>
                )}
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setQrModalVisible(false)}
              >
                <Ionicons name='close-circle' size={40} color='white' />
              </TouchableOpacity>
            </>
          )}
        </View>
      </Modal>

      {/* Options Modal */}
      <Modal
        visible={showOptions}
        transparent={true}
        animationType='fade'
        onRequestClose={() => setShowOptions(false)}
      >
        <View style={styles.optionsContainer}>
          <View style={styles.optionButtonContainer}>
            <TouchableOpacity
              onPress={openInAppScanner}
              style={styles.optionButton}
            >
              <Text style={styles.optionButtonText}>
                Quét mã QR trong ứng dụng
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.optionButtonContainer}>
            <TouchableOpacity
              onPress={openExternalScanner}
              style={styles.optionButton}
            >
              <Text style={styles.optionButtonText}>
                Mở ứng dụng quét QR bên ngoài
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.optionButtonContainer}>
            <TouchableOpacity
              onPress={() => setShowOptions(false)}
              style={styles.optionButton}
            >
              <Text style={styles.optionButtonText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <FormInput
        label='Họ và tên'
        placeholder='Nguyễn Văn A'
        value={formData.fullName}
        onChangeText={(text) => onChange('fullName', text)}
        error={errors.fullName}
        isRequired
      />

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Ngày sinh *</Text>
        <TouchableOpacity
          style={[
            styles.input,
            styles.dateInput,
            errors.dateOfBirth && styles.inputError
          ]}
          onPress={() => setShowDatePicker(true)}
        >
          <Text
            style={[
              styles.dateText,
              !formData.dateOfBirth && styles.placeholderText
            ]}
          >
            {formatDate(formData.dateOfBirth)}
          </Text>
          <Ionicons name='calendar' size={20} color='#666' />
        </TouchableOpacity>
        {errors.dateOfBirth && (
          <Text style={styles.errorText}>{errors.dateOfBirth}</Text>
        )}
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={formData.dateOfBirth || new Date()}
          mode='date'
          display='default'
          onChange={onDateChange}
          maximumDate={new Date()}
        />
      )}

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Giới tính *</Text>
        <View
          style={[styles.pickerContainer, errors.gender && styles.inputError]}
        >
          <Picker
            selectedValue={formData.gender}
            onValueChange={(value) => onChange('gender', value)}
            style={styles.picker}
          >
            <Picker.Item label='Chọn giới tính' value='' />
            <Picker.Item label='Nam' value='male' />
            <Picker.Item label='Nữ' value='female' />
            <Picker.Item label='Khác' value='other' />
          </Picker>
        </View>
        {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}
      </View>

      <FormInput
        label='Số CMND/CCCD'
        placeholder='123456789'
        value={formData.idNumber}
        onChangeText={(text) => onChange('idNumber', text)}
        error={errors.idNumber}
        isRequired
        keyboardType='numeric'
      />

      <FormInput
        label='Số điện thoại'
        placeholder='0912345678'
        value={formData.phoneNumber}
        onChangeText={(text) => onChange('phoneNumber', text)}
        error={errors.phoneNumber}
        isRequired
        keyboardType='phone-pad'
      />

      <FormInput
        label='Email'
        placeholder='example@email.com'
        value={formData.email}
        onChangeText={(text) => onChange('email', text)}
        error={errors.email}
        isRequired
        keyboardType='email-address'
      />

      <FormInput
        label='Địa chỉ'
        placeholder='Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố'
        value={formData.address}
        onChangeText={(text) => onChange('address', text)}
        error={errors.address}
        isRequired
        multiline
        numberOfLines={3}
      />
    </Section>
  )
}

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 16
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: 'white'
  },
  inputError: {
    borderColor: '#ef4444'
  },
  dateInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  dateText: {
    fontSize: 16,
    color: '#374151'
  },
  placeholderText: {
    color: '#9ca3af'
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: 'white'
  },
  picker: {
    height: 50
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4
  },
  qrButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8
  },
  qrContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#199A8E',
    marginBottom: 16
  },
  modalText: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  mockScanButton: {
    flex: 1,
    backgroundColor: '#199A8E',
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center'
  },
  mockScanButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500'
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db'
  },
  cancelButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '500'
  },
  permissionText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20
  },
  scannerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scannerTargetBorder: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#199A8E',
    borderRadius: 8
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10
  },
  scanInstructionsContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center'
  },
  scanInstructions: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10
  },
  scanAgainButton: {
    position: 'absolute',
    bottom: 100,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: '#199A8E',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8
  },
  scanAgainButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500'
  },
  scanTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 32
  },
  optionButtonContainer: {
    width: '100%',
    marginBottom: 16
  },
  optionButton: {
    backgroundColor: 'white',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.3,
    shadowRadius: 4
  },
  optionButtonText: {
    color: '#199A8E',
    fontSize: 18,
    fontWeight: '500'
  }
})

export default PersonalInfoSection
