import { Ionicons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker'
import { Camera } from 'expo-camera'
import React, { useState } from 'react'
import {
  Alert,
  Linking,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import QRScannerModal from '@/lib/pages/member/donation-request/components/PersonalInfo/QRScannerModal'
import { FormData, FormErrors, formatDate } from '../../types'
import FormInput from '../FormInput'
import Section from '../Section'
import { styles } from './styles'

interface PersonalInfoSectionProps {
  formData: FormData
  errors: FormErrors
  onChange: (field: keyof FormData, value: any) => void
  onBulkChange?: (updates: Partial<FormData>) => void
}

const PersonalInfoSection = ({
  formData,
  errors,
  onChange,
  onBulkChange
}: PersonalInfoSectionProps) => {
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [qrModalVisible, setQrModalVisible] = useState(false)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [scanned, setScanned] = useState(false)
  const [showOptions, setShowOptions] = useState(false)

  // State để quản lý hiển thị picker trên iOS
  const [showGenderPicker, setShowGenderPicker] = useState(false)

  const openQRScanner = async () => {
    setShowOptions(true)
  }

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

  const openExternalScanner = async () => {
    setShowOptions(false)

    try {
      let url = ''

      if (Platform.OS === 'ios') {
        url = 'camera://'
      } else {
        url = 'market://search?q=qr+code+scanner&c=apps'
      }

      const canOpen = await Linking.canOpenURL(url)

      if (canOpen) {
        await Linking.openURL(url)
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

  const handleBarCodeScanned = ({
    type,
    data
  }: {
    type: string
    data: string
  }) => {
    setScanned(true)
    try {
      if (data.includes('|')) {
        const parts = data.split('|')
        console.log('QR parts length:', parts.length)
        parts.forEach((part, index) => {
          console.log(`Part ${index}:`, part)
        })

        const qrData: Partial<FormData> = {}

        // Format: CCCD||Họ tên|Ngày sinh|Giới tính|Địa chỉ|Ngày cấp

        // CCCD
        let idNumber = parts[0].replace(/\|/g, '').trim()
        if (idNumber) {
          qrData.idNumber = idNumber
          console.log('Đã điền CCCD:', idNumber)
        }

        // Họ tên
        let fullNameIndex = -1
        if (parts.length > 2 && parts[2].trim()) {
          fullNameIndex = 2
        } else if (parts.length > 1 && parts[1].trim()) {
          fullNameIndex = 1
        }

        if (fullNameIndex >= 0) {
          const fullName = parts[fullNameIndex].trim()
          qrData.fullName = fullName
          console.log('Đã điền Họ tên:', fullName)
        }

        // Ngày sinh
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
                qrData.dateOfBirth = dateOfBirth
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
            qrData.gender = 'male'
            console.log('Đã điền Giới tính: Nam')
          } else if (genderText === 'nữ' || genderText === 'nu') {
            qrData.gender = 'female'
            console.log('Đã điền Giới tính: Nữ')
          }
        }

        // Địa chỉ
        if (parts.length > 5 && parts[5].trim()) {
          const address = parts[5].trim()
          qrData.address = address
          console.log('Đã điền Địa chỉ:', address)
        }

        console.log('Tất cả thông tin đã điền từ QR:', qrData)

        // Cập nhật tất cả các trường cùng một lúc
        if (onBulkChange) {
          onBulkChange(qrData)
          console.log('Đã cập nhật tất cả thông tin sử dụng onBulkChange')
        } else {
          // Fallback nếu onBulkChange không được cung cấp
          Object.entries(qrData).forEach(([key, value]) => {
            onChange(key as keyof FormData, value)
            console.log(`Đã cập nhật ${key} = ${value} sử dụng onChange`)
          })
        }

        setTimeout(() => {
          setQrModalVisible(false)
          setScanned(false)

          let messageDetails = ''
          if (qrData.fullName) messageDetails += `Họ tên: ${qrData.fullName}\n`
          if (qrData.idNumber)
            messageDetails += `CCCD/CMND: ${qrData.idNumber}\n`
          if (qrData.gender)
            messageDetails += `Giới tính: ${
              qrData.gender === 'male' ? 'Nam' : 'Nữ'
            }\n`
          if (qrData.dateOfBirth)
            messageDetails += `Ngày sinh: ${formatDate(qrData.dateOfBirth)}\n`
          if (qrData.address) messageDetails += `Địa chỉ: ${qrData.address}`

          Alert.alert(
            'Đã quét thành công',
            `Thông tin đã được điền tự động:\n\n${messageDetails}`,
            [{ text: 'OK' }]
          )
        }, 500)

        return
      }

      const parsedData = JSON.parse(data)
      console.log('Parsed JSON data:', parsedData)

      const qrData: Partial<FormData> = {}

      if (parsedData.fullName) qrData.fullName = parsedData.fullName
      if (parsedData.idNumber) qrData.idNumber = parsedData.idNumber
      if (parsedData.phoneNumber) qrData.phoneNumber = parsedData.phoneNumber
      if (parsedData.email) qrData.email = parsedData.email
      if (parsedData.address) qrData.address = parsedData.address

      if (parsedData.gender) {
        qrData.gender = parsedData.gender
      }

      if (parsedData.dateOfBirth) {
        try {
          const dateOfBirth = new Date(parsedData.dateOfBirth)
          if (!isNaN(dateOfBirth.getTime())) {
            qrData.dateOfBirth = dateOfBirth
          }
        } catch (e) {
          console.log('Invalid date format:', parsedData.dateOfBirth)
        }
      }

      console.log('Tất cả thông tin đã điền từ JSON:', qrData)

      if (onBulkChange) {
        onBulkChange(qrData)
        console.log('Đã cập nhật tất cả thông tin sử dụng onBulkChange')
      } else {
        Object.entries(qrData).forEach(([key, value]) => {
          onChange(key as keyof FormData, value)
          console.log(`Đã cập nhật ${key} = ${value} sử dụng onChange`)
        })
      }

      setTimeout(() => {
        setQrModalVisible(false)
        setScanned(false)

        let messageDetails = ''
        if (qrData.fullName) messageDetails += `Họ tên: ${qrData.fullName}\n`
        if (qrData.idNumber) messageDetails += `CCCD/CMND: ${qrData.idNumber}\n`
        if (qrData.gender)
          messageDetails += `Giới tính: ${
            qrData.gender === 'male'
              ? 'Nam'
              : qrData.gender === 'female'
              ? 'Nữ'
              : qrData.gender
          }\n`
        if (qrData.dateOfBirth)
          messageDetails += `Ngày sinh: ${formatDate(qrData.dateOfBirth)}\n`
        if (qrData.address) messageDetails += `Địa chỉ: ${qrData.address}\n`
        if (qrData.phoneNumber)
          messageDetails += `Số điện thoại: ${qrData.phoneNumber}\n`
        if (qrData.email) messageDetails += `Email: ${qrData.email}`

        Alert.alert(
          'Đã quét thành công',
          `Thông tin đã được điền tự động:\n\n${messageDetails}`,
          [{ text: 'OK' }]
        )
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

  // Hàm xử lý khi giá trị gender thay đổi
  const handleGenderChange = (value: string) => {
    onChange('gender', value)
    if (Platform.OS === 'ios') {
      setShowGenderPicker(false)
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
      <QRScannerModal
        visible={qrModalVisible}
        hasPermission={hasPermission}
        scanned={scanned}
        onClose={() => setQrModalVisible(false)}
        onBarCodeScanned={handleBarCodeScanned}
        onScanAgain={() => setScanned(false)}
      />

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
        {Platform.OS === 'ios' ? (
          <>
            {/* iOS: Hiển thị input giả để kích hoạt picker */}
            <TouchableOpacity
              style={[
                styles.input,
                styles.dateInput,
                errors.gender && styles.inputError
              ]}
              onPress={() => setShowGenderPicker(true)}
            >
              <Text
                style={[
                  styles.dateText,
                  !formData.gender && styles.placeholderText
                ]}
              >
                {formData.gender
                  ? formData.gender === 'male'
                    ? 'Nam'
                    : formData.gender === 'female'
                    ? 'Nữ'
                    : formData.gender === 'other'
                    ? 'Khác'
                    : 'Chọn giới tính'
                  : 'Chọn giới tính'}
              </Text>
              <Ionicons name='chevron-down' size={20} color='#666' />
            </TouchableOpacity>

            {/* iOS: Modal picker */}
            {showGenderPicker && (
              <Modal
                visible={showGenderPicker}
                transparent={true}
                animationType='slide'
              >
                <View style={styles.iosPickerModalContainer}>
                  <View style={styles.iosPickerHeader}>
                    <TouchableOpacity
                      onPress={() => setShowGenderPicker(false)}
                    >
                      <Text style={styles.iosPickerCancel}>Hủy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        // Nếu chưa có giá trị, đặt giá trị mặc định là "male"
                        if (!formData.gender) {
                          onChange('gender', 'male')
                        }
                        setShowGenderPicker(false)
                      }}
                    >
                      <Text style={styles.iosPickerDone}>Xong</Text>
                    </TouchableOpacity>
                  </View>
                  <Picker
                    selectedValue={formData.gender || ''}
                    onValueChange={(value) => onChange('gender', value)}
                    style={styles.iosPicker}
                  >
                    <Picker.Item label='Chọn giới tính' value='' />
                    <Picker.Item label='Nam' value='male' />
                    <Picker.Item label='Nữ' value='female' />
                    <Picker.Item label='Khác' value='other' />
                  </Picker>
                </View>
              </Modal>
            )}
          </>
        ) : (
          /* Android: Picker trực tiếp */
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
        )}
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

export default PersonalInfoSection
