import { Ionicons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker'
import React, { useState } from 'react'
import { Modal, Platform, Text, TouchableOpacity, View } from 'react-native'

import QRScannerModal from '@/lib/pages/member/donation-request/components/PersonalInfo/QRScannerModal'
import { useQRScanner } from '../../../../../hooks/useQRScanner'
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

  // State để quản lý hiển thị picker trên iOS
  const [showGenderPicker, setShowGenderPicker] = useState(false)

  // Sử dụng hook useQRScanner
  const {
    qrModalVisible,
    setQrModalVisible,
    optionsModalVisible,
    setOptionsModalVisible,
    hasPermission,
    scanned,
    setScanned,
    openQRScanner,
    closeQRScanner,
    openInAppScanner,
    openExternalScanner,
    handleBarCodeScanned
  } = useQRScanner(onChange, onBulkChange, formatDate)

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
      <QRScannerModal
        visible={qrModalVisible}
        hasPermission={hasPermission}
        scanned={scanned}
        onClose={closeQRScanner}
        onBarCodeScanned={handleBarCodeScanned}
        onScanAgain={() => setScanned(false)}
      />

      {/* Options Modal */}
      <Modal
        visible={optionsModalVisible}
        transparent={true}
        animationType='fade'
        onRequestClose={() => setOptionsModalVisible(false)}
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
              onPress={() => setOptionsModalVisible(false)}
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
