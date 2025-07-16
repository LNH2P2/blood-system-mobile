import { Ionicons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker'
import React, { useEffect, useState } from 'react'
import { Modal, Platform, Text, TouchableOpacity, View } from 'react-native'

import { useQRScannerContext } from '@/lib/contexts/QRScannerContext'
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
  const [showGenderPicker, setShowGenderPicker] = useState(false)

  // Sử dụng hook mới với type safety
  const {
    openQRScanner,
    lastQRData, // ✨ Type: QRScannerData | null
    qrResult, // ✨ Type: QRScannerResult | null
    clearQRData
  } = useQRScannerContext()

  // Tự động điền form khi có QR data với type safety
  useEffect(() => {
    if (lastQRData) {
      console.log('✅ QR Data received with types:')
      console.log('Full Name:', lastQRData.fullName) // ✨ Type: string | undefined
      console.log('Date of Birth:', lastQRData.dateOfBirth) // ✨ Type: Date | undefined
      console.log('ID Number:', lastQRData.idNumber)
      console.log('Gender:', lastQRData.gender) // ✨ Type: 'male' | 'female' | undefined
      console.log('Address:', lastQRData.address)
      console.log('Phone:', lastQRData.phoneNumber)
      console.log('Email:', lastQRData.email)

      // Auto-fill form với type safety
      const updates: Partial<FormData> = {}

      if (lastQRData.fullName) {
        updates.fullName = lastQRData.fullName
      }

      if (lastQRData.dateOfBirth) {
        updates.dateOfBirth = lastQRData.dateOfBirth
      }

      if (lastQRData.idNumber) {
        updates.idNumber = lastQRData.idNumber
      }

      if (lastQRData.gender) {
        updates.gender = lastQRData.gender
      }

      if (lastQRData.address) {
        updates.address = lastQRData.address
      }

      if (lastQRData.phoneNumber) {
        updates.phoneNumber = lastQRData.phoneNumber
      }

      if (lastQRData.email) {
        updates.email = lastQRData.email
      }

      // Bulk update form
      if (onBulkChange) {
        onBulkChange(updates)
      } else {
        // Fallback: update từng field
        Object.entries(updates).forEach(([key, value]) => {
          onChange(key as keyof FormData, value)
        })
      }
    }
  }, [lastQRData])

  // Handler để sử dụng QR data manually
  const handleUseQRData = () => {
    if (lastQRData) {
      // ✅ Type-safe access
      const fullName = lastQRData.fullName // Type: string | undefined
      const dateOfBirth = lastQRData.dateOfBirth // Type: Date | undefined

      if (fullName) {
        console.log('Using full name:', fullName)
        onChange('fullName', fullName)
      }

      if (dateOfBirth) {
        console.log('Using date of birth:', dateOfBirth)
        onChange('dateOfBirth', dateOfBirth)
      }
    }
  }

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false)
    if (selectedDate) {
      onChange('dateOfBirth', selectedDate)
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
        <TouchableOpacity onPress={openQRScanner} style={styles.qrButton}>
          <Ionicons name='qr-code-outline' size={22} color='#199A8E' />
        </TouchableOpacity>
      }
    >
      {/* QR Scanner Modal */}
      {/* <QRScannerModal
        visible={qrModalVisible}
        hasPermission={hasPermission}
        scanned={scanned}
        onClose={closeQRScanner}
        onBarCodeScanned={handleBarCodeScanned}
        onScanAgain={() => setScanned(false)}
      /> */}

      {/* Options Modal */}
      <Modal
        visible={false}
        transparent={true}
        animationType='fade'
        onRequestClose={() => setShowGenderPicker(false)}
      >
        <View style={styles.optionsContainer}>
          <View style={styles.optionButtonContainer}>
            <TouchableOpacity
              onPress={openQRScanner}
              style={styles.optionButton}
            >
              <Text style={styles.optionButtonText}>
                Quét mã QR trong ứng dụng
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.optionButtonContainer}>
            <TouchableOpacity
              onPress={openQRScanner}
              style={styles.optionButton}
            >
              <Text style={styles.optionButtonText}>
                Mở ứng dụng quét QR bên ngoài
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.optionButtonContainer}>
            <TouchableOpacity
              onPress={() => setShowGenderPicker(false)}
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
