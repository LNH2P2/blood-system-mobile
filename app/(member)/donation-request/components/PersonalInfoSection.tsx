import { Ionicons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

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

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false)
    if (selectedDate) {
      onChange('dateOfBirth', selectedDate)
    }
  }

  return (
    <Section title='Thông tin cá nhân'>
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
  }
})

export default PersonalInfoSection
