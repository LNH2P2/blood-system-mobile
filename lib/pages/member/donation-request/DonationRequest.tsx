import React, { useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

// Types
import ConsentSection from '@/lib/pages/member/donation-request/components/ConsentSection'
import Header from '@/lib/pages/member/donation-request/components/Header'
import MedicalInfoSection from '@/lib/pages/member/donation-request/components/MedicalInfoSection'
import PersonalInfoSection from '@/lib/pages/member/donation-request/components/PersonalInfoSection'
import {
  FormData,
  FormErrors,
  initialFormData
} from '@/lib/pages/member/donation-request/types'
import { SafeAreaView } from 'react-native-safe-area-context'
export default function DonationRequestForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Họ tên là bắt buộc'
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = 'Họ tên phải có ít nhất 2 ký tự'
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Ngày sinh là bắt buộc'
    }

    if (!formData.gender) {
      newErrors.gender = 'Giới tính là bắt buộc'
    }

    if (!formData.idNumber.trim()) {
      newErrors.idNumber = 'Số CMND/CCCD là bắt buộc'
    } else if (formData.idNumber.length < 9) {
      newErrors.idNumber = 'Số CMND/CCCD phải có ít nhất 9 ký tự'
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Số điện thoại là bắt buộc'
    } else if (formData.phoneNumber.length < 10) {
      newErrors.phoneNumber = 'Số điện thoại phải có ít nhất 10 ký tự'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email là bắt buộc'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Địa chỉ là bắt buộc'
    } else if (formData.address.length < 5) {
      newErrors.address = 'Địa chỉ phải có ít nhất 5 ký tự'
    }

    if (!formData.weight.trim()) {
      newErrors.weight = 'Cân nặng là bắt buộc'
    } else if (isNaN(Number(formData.weight)) || Number(formData.weight) <= 0) {
      newErrors.weight = 'Cân nặng phải là số dương'
    }

    if (!formData.hasDonatedBefore) {
      newErrors.hasDonatedBefore = 'Vui lòng chọn'
    }

    if (!formData.consent) {
      newErrors.consent = 'Bạn phải đồng ý với các điều khoản'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert('Lỗi', 'Vui lòng kiểm tra lại thông tin')
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      Alert.alert(
        'Thành công!',
        'Đăng ký hiến máu thành công. Chúng tôi sẽ liên hệ với bạn sớm.',
        [
          {
            text: 'OK',
            onPress: () => {
              setFormData(initialFormData)
              setErrors({})
            }
          }
        ]
      )
    } catch (error) {
      Alert.alert('Lỗi', 'Có lỗi xảy ra. Vui lòng thử lại.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: keyof FormData, value: any): void => {
    setFormData({ ...formData, [field]: value })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.form}>
          <PersonalInfoSection
            formData={formData}
            errors={errors}
            onChange={handleChange}
          />

          <MedicalInfoSection
            formData={formData}
            errors={errors}
            onChange={handleChange}
          />

          <ConsentSection
            consent={formData.consent}
            error={errors.consent}
            onChange={(value) => handleChange('consent', value)}
          />

          <SubmitButton onPress={handleSubmit} isSubmitting={isSubmitting} />

          <View style={styles.bottomSpacing} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

interface SubmitButtonProps {
  onPress: () => void
  isSubmitting: boolean
}

const SubmitButton = ({ onPress, isSubmitting }: SubmitButtonProps) => (
  <TouchableOpacity
    style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
    onPress={onPress}
    disabled={isSubmitting}
  >
    {isSubmitting ? (
      <View style={styles.submitButtonContent}>
        <ActivityIndicator size='small' color='white' />
        <Text style={styles.submitButtonText}>Đang xử lý...</Text>
      </View>
    ) : (
      <Text style={styles.submitButtonText}>Đăng ký hiến máu</Text>
    )}
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb'
  },
  scrollView: {
    flex: 1
  },
  form: {
    padding: 20
  },
  submitButton: {
    backgroundColor: '#dc2626',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  submitButtonDisabled: {
    backgroundColor: '#9ca3af'
  },
  submitButtonContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8
  },
  bottomSpacing: {
    height: 20
  }
})
