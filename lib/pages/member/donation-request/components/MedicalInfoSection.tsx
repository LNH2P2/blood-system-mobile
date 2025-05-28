import { Ionicons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { FormData, FormErrors, formatDate } from '../types'
import FormInput from './FormInput'
import Section from './Section'

interface MedicalInfoSectionProps {
  formData: FormData
  errors: FormErrors
  onChange: (field: keyof FormData, value: any) => void
}

const MedicalInfoSection = ({
  formData,
  errors,
  onChange
}: MedicalInfoSectionProps) => {
  const [showLastDonationPicker, setShowLastDonationPicker] = useState(false)

  const onLastDonationDateChange = (event: any, selectedDate?: Date) => {
    setShowLastDonationPicker(false)
    if (selectedDate) {
      onChange('lastDonationDate', selectedDate)
    }
  }

  return (
    <Section title='Thông tin y tế'>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nhóm máu (nếu biết)</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.bloodType}
            onValueChange={(value) => onChange('bloodType', value)}
            style={styles.picker}
          >
            <Picker.Item label='Chọn nhóm máu' value='' />
            <Picker.Item label='A+' value='A+' />
            <Picker.Item label='A-' value='A-' />
            <Picker.Item label='B+' value='B+' />
            <Picker.Item label='B-' value='B-' />
            <Picker.Item label='AB+' value='AB+' />
            <Picker.Item label='AB-' value='AB-' />
            <Picker.Item label='O+' value='O+' />
            <Picker.Item label='O-' value='O-' />
            <Picker.Item label='Không biết' value='unknown' />
          </Picker>
        </View>
      </View>

      <FormInput
        label='Cân nặng (kg)'
        placeholder='60'
        value={formData.weight}
        onChangeText={(text) => onChange('weight', text)}
        error={errors.weight}
        isRequired
        keyboardType='numeric'
      />

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Bạn đã từng hiến máu trước đây chưa? *</Text>
        <View
          style={[
            styles.pickerContainer,
            errors.hasDonatedBefore && styles.inputError
          ]}
        >
          <Picker
            selectedValue={formData.hasDonatedBefore}
            onValueChange={(value) => onChange('hasDonatedBefore', value)}
            style={styles.picker}
          >
            <Picker.Item label='Chọn' value='' />
            <Picker.Item label='Đã từng' value='yes' />
            <Picker.Item label='Chưa từng' value='no' />
          </Picker>
        </View>
        {errors.hasDonatedBefore && (
          <Text style={styles.errorText}>{errors.hasDonatedBefore}</Text>
        )}
      </View>

      {formData.hasDonatedBefore === 'yes' && (
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Lần hiến máu gần nhất</Text>
          <TouchableOpacity
            style={[styles.input, styles.dateInput]}
            onPress={() => setShowLastDonationPicker(true)}
          >
            <Text
              style={[
                styles.dateText,
                !formData.lastDonationDate && styles.placeholderText
              ]}
            >
              {formatDate(formData.lastDonationDate)}
            </Text>
            <Ionicons name='calendar' size={20} color='#666' />
          </TouchableOpacity>
        </View>
      )}

      {showLastDonationPicker && (
        <DateTimePicker
          value={formData.lastDonationDate || new Date()}
          mode='date'
          display='default'
          onChange={onLastDonationDateChange}
          maximumDate={new Date()}
        />
      )}

      <FormInput
        label='Bệnh lý (nếu có)'
        placeholder='Liệt kê các bệnh lý hiện tại hoặc trước đây (nếu có)'
        value={formData.medicalConditions}
        onChangeText={(text) => onChange('medicalConditions', text)}
        multiline
        numberOfLines={3}
      />

      <FormInput
        label='Thuốc đang sử dụng (nếu có)'
        placeholder='Liệt kê các loại thuốc đang sử dụng (nếu có)'
        value={formData.medications}
        onChangeText={(text) => onChange('medications', text)}
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

export default MedicalInfoSection
