import { theme } from '@/lib/theme'
import { Ionicons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker'
import React, { useState } from 'react'
import {
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { FormData, FormErrors, formatDate } from '../types'
import Section from './Section'

interface DonationScheduleSectionProps {
  formData: FormData
  errors: FormErrors
  onChange: (field: keyof FormData, value: any) => void
}

const DonationScheduleSection = ({
  formData,
  errors,
  onChange
}: DonationScheduleSectionProps) => {
  const [showReadyToDonateDate, setShowReadyToDonateDate] = useState(false)

  const onReadyToDonateDateChange = (event: any, selectedDate?: Date) => {
    setShowReadyToDonateDate(false)
    if (selectedDate) {
      onChange('readyToDonateDate', selectedDate)
    }
  }

  return (
    <Section title='Lịch hiến máu'>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Thời điểm sẵn sàng hiến máu *</Text>
        <TouchableOpacity
          style={[
            styles.input,
            styles.dateInput,
            errors.readyToDonateDate && styles.inputError
          ]}
          onPress={() => setShowReadyToDonateDate(true)}
        >
          <Text
            style={[
              styles.dateText,
              !formData.readyToDonateDate && styles.placeholderText
            ]}
          >
            {formatDate(formData.readyToDonateDate)}
          </Text>
          <Ionicons name='calendar' size={20} color='#666' />
        </TouchableOpacity>
        {errors.readyToDonateDate && (
          <Text style={styles.errorText}>{errors.readyToDonateDate}</Text>
        )}
        <Text style={styles.helperText}>
          Chọn ngày bạn có thể tham gia hiến máu (tối thiểu 7 ngày từ hôm nay)
        </Text>
      </View>

      {showReadyToDonateDate && (
        <DateTimePicker
          value={formData.readyToDonateDate || new Date()}
          mode='date'
          display='default'
          onChange={onReadyToDonateDateChange}
          minimumDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)} // Tối thiểu 7 ngày từ hôm nay
        />
      )}

      <View style={styles.switchContainer}>
        <View style={styles.switchTextContainer}>
          <Text style={styles.label}>Nhận nhắc lịch hiến máu</Text>
          <Text style={styles.helperText}>
            Nhận thông báo nhắc lịch hiến máu qua SMS và email
          </Text>
        </View>
        <Switch
          trackColor={{ false: '#d1d5db', true: `${theme.color.primary}80` }}
          thumbColor={
            formData.receiveReminders ? theme.color.primary : '#f4f3f4'
          }
          ios_backgroundColor='#d1d5db'
          onValueChange={(value) => onChange('receiveReminders', value)}
          value={formData.receiveReminders}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Trạng thái hiến máu hiện tại</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.donationStatus}
            onValueChange={(value) => onChange('donationStatus', value)}
            style={styles.picker}
          >
            <Picker.Item label='Chọn trạng thái' value='' />
            <Picker.Item label='Chưa từng hiến máu' value='never' />
            <Picker.Item label='Đã hiến máu trên 3 tháng' value='over3months' />
            <Picker.Item
              label='Đã hiến máu dưới 3 tháng'
              value='under3months'
            />
            <Picker.Item label='Có kế hoạch hiến máu' value='planned' />
          </Picker>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Lịch sử hiến máu (nếu có)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder='Mô tả ngắn gọn lịch sử hiến máu của bạn (số lần, thời gian, địa điểm...)'
          value={formData.donationHistory}
          onChangeText={(text) => onChange('donationHistory', text)}
          multiline
          numberOfLines={4}
          textAlignVertical='top'
        />
      </View>
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
  textArea: {
    height: 100,
    textAlignVertical: 'top'
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
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4
  },
  helperText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4
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
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 16
  },
  switchTextContainer: {
    flex: 1
  }
})

export default DonationScheduleSection
