import LoadingOverlay from '@/lib/components/Loading'
import { useQRScannerContext } from '@/lib/contexts/QRScannerContext'
import { useUpdateUser } from '@/lib/hooks/api/useUser'
import FormInput from '@/lib/pages/donation-request/components/FormInput'
import QRScannerModal from '@/lib/pages/donation-request/components/PersonalInfo/QRScannerModal'
import { theme } from '@/lib/theme'
import { Ionicons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

const EditProfile = () => {
  const { userProfile } = useLocalSearchParams()
  const updateUserProfile = useUpdateUser()
  const [isLoading, setIsLoading] = useState(false)
  const [originalData, setOriginalData] = useState<typeof formData | null>(null)
  const [formData, setFormData] = useState({
    _id: '',
    email: '',
    phoneNumber: '',
    fullName: '',
    image: '',
    gender: '', // 'male', 'female', 'other'
    dateOfBirth: ''
  })

  useEffect(() => {
    if (userProfile) {
      try {
        const data = JSON.parse(userProfile as string)

        const cleanedData = {
          _id: data._id || '',
          email: data.email || '',
          phoneNumber: data.phoneNumber || '',
          fullName: data.fullName || '',
          image: data.image || '',
          gender: data.gender || '',
          dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split('T')[0] : ''
        }

        setFormData(cleanedData)
        setOriginalData(cleanedData) // Lưu bản gốc
      } catch (error) {
        console.log('Error parsing userProfile:', error)
      }
    }
  }, [userProfile])

  const [errors, setErrors] = useState({
    _id: '',
    email: '',
    phoneNumber: '',
    fullName: '',
    image: '',
    gender: '',
    dateOfBirth: ''
  })

  const {
    qrModalVisible,
    setQrModalVisible,
    optionsModalVisible,
    setOptionsModalVisible,
    hasPermission,
    scanned,
    setScanned,
    closeQRScanner,
    openInAppScanner,
    openExternalScanner,
    handleBarCodeScanned
  } = useQRScannerContext()

  const [showDatePicker, setShowDatePicker] = useState(false)

  const handleChange = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const validate = () => {
    const newErrors: typeof errors = {
      _id: '',
      email: '',
      phoneNumber: '',
      fullName: '',
      image: '',
      gender: '',
      dateOfBirth: ''
    }

    if (!formData.fullName) newErrors.fullName = 'Vui lòng nhập họ tên'
    if (!formData.email.includes('@')) newErrors.email = 'Email không hợp lệ'
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Vui lòng nhập SĐT'

    setErrors(newErrors)

    return Object.values(newErrors).every((err) => err === '')
  }

  const handleSubmit = async () => {
    if (validate() && formData._id && originalData) {
      try {
        setIsLoading(true)

        const updatePayload: Partial<typeof formData> = { _id: formData._id }

        for (const key in formData) {
          const typedKey = key as keyof typeof formData
          if (
            typedKey !== '_id' &&
            formData[typedKey] !== originalData[typedKey]
          ) {
            updatePayload[typedKey] = formData[typedKey]
          }
        }

        if (Object.keys(updatePayload).length === 1) {
          alert('Bạn chưa thay đổi thông tin nào.')
          setIsLoading(false)
          return
        }

        console.log('Gửi dữ liệu thay đổi:', updatePayload)

        await updateUserProfile.mutateAsync(updatePayload)
        alert('Cập nhật thành công!')
      } catch (err) {
        alert('Cập nhật thất bại, vui lòng thử lại sau.')
        console.log('Lỗi khi cập nhật:', err)
      } finally {
        setIsLoading(false)
      }
    } else {
      console.log('Dữ liệu không hợp lệ', errors)
    }
  }

  const handleDateChange = (_event: any, selectedDate?: Date) => {
    setShowDatePicker(false)
    if (selectedDate) {
      const isoDate = selectedDate.toISOString().split('T')[0] // yyyy-mm-dd
      handleChange('dateOfBirth', isoDate)
    }
  }

  if (isLoading) {
    return <LoadingOverlay visible={isLoading} />
  }
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <FormInput
        label='Họ và tên'
        placeholder='Nhập họ và tên'
        value={formData.fullName}
        onChangeText={(text) => handleChange('fullName', text)}
        error={errors.fullName}
        isRequired
      />

      <FormInput
        label='Email'
        placeholder='example@email.com'
        value={formData.email}
        onChangeText={(text) => handleChange('email', text)}
        error={errors.email}
        isRequired
        keyboardType='email-address'
      />

      <FormInput
        label='Số điện thoại'
        placeholder='0123456789'
        value={formData.phoneNumber}
        onChangeText={(text) => handleChange('phoneNumber', text)}
        error={errors.phoneNumber}
        keyboardType='phone-pad'
      />

      <FormInput
        label='Link ảnh đại diện'
        placeholder='https://...'
        value={formData.image}
        onChangeText={(text) => handleChange('image', text)}
        error={errors.image}
      />

      {/* Giới tính - Picker */}
      <Text style={{ marginBottom: 4, marginTop: 12 }}>Giới tính</Text>
      <View
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 4,
          marginBottom: 8
        }}
      >
        <Picker
          selectedValue={formData.gender}
          onValueChange={(value) => handleChange('gender', value)}
        >
          <Picker.Item label='Chọn giới tính' value='' />
          <Picker.Item label='Nam' value='male' />
          <Picker.Item label='Nữ' value='female' />
          <Picker.Item label='Khác' value='other' />
        </Picker>
      </View>
      {errors.gender ? (
        <Text style={{ color: 'red', marginBottom: 8 }}>{errors.gender}</Text>
      ) : null}

      {/* Ngày sinh - Date Picker */}
      <Text style={{ marginBottom: 4 }}>Ngày sinh</Text>
      <Pressable
        onPress={() => setShowDatePicker(true)}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 4,
          padding: 12,
          marginBottom: 8
        }}
      >
        <Text style={{ color: formData.dateOfBirth ? '#000' : '#aaa' }}>
          {formData.dateOfBirth || 'Chọn ngày sinh'}
        </Text>
      </Pressable>
      {showDatePicker && (
        <DateTimePicker
          mode='date'
          style={{ backgroundColor: theme.color.primary }}
          value={
            formData.dateOfBirth ? new Date(formData.dateOfBirth) : new Date()
          }
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}
      {errors.dateOfBirth ? (
        <Text style={{ color: 'red', marginBottom: 8 }}>
          {errors.dateOfBirth}
        </Text>
      ) : null}
      <>
        {/* QR Scanner Modal */}
        <QRScannerModal
          visible={qrModalVisible}
          hasPermission={hasPermission}
          scanned={scanned}
          onClose={closeQRScanner}
          onBarCodeScanned={handleBarCodeScanned}
          onScanAgain={() => setScanned(false)}
        />

        {/* QR Options Modal */}
        <Modal
          visible={optionsModalVisible}
          transparent
          animationType='slide'
          onRequestClose={() => setOptionsModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Chọn cách quét QR</Text>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={openInAppScanner}
              >
                <Ionicons name='camera' size={24} color={theme.color.primary} />
                <Text style={styles.modalButtonText}>
                  Sử dụng camera trong ứng dụng
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={openExternalScanner}
              >
                <Ionicons
                  name='phone-portrait'
                  size={24}
                  color={theme.color.primary}
                />
                <Text style={styles.modalButtonText}>
                  Sử dụng ứng dụng quét QR khác
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setOptionsModalVisible(false)}
              >
                <Ionicons name='close' size={24} color='#666' />
                <Text style={[styles.modalButtonText, { color: '#666' }]}>
                  Hủy
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </>

      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          backgroundColor: theme.color.primary,
          padding: 12,
          borderRadius: 6,
          alignItems: 'center',
          marginTop: 12
        }}
      >
        <Text style={{ color: theme.color.white, fontWeight: 'bold' }}>
          Lưu thay đổi
        </Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    elevation: 4
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center'
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
    marginBottom: 10,
    elevation: 1
  },
  modalButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333'
  },
  cancelButton: {
    backgroundColor: '#fee2e2'
  }
})

export default EditProfile
