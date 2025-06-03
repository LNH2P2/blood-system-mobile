import React, { useState } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

// Types
// import { useAlert } from '@/lib/hooks/useAlert'
import ListRequest from '@/lib/pages/donation-request/components/ListRequest'
// import {
//   FormData,
//   FormErrors,
//   initialFormData
// } from '@/lib/pages/member/donation-request/types'
import { theme } from '@/lib/theme'
import { useRouter } from 'expo-router'

export default function DonationRequestForm() {
  // const [formData, setFormData] = useState<FormData>(initialFormData)
  // const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  // const alert = useAlert()

  // const validateForm = (): boolean => {
  //   const newErrors: FormErrors = {}

  //   if (!formData.fullName.trim()) {
  //     newErrors.fullName = 'Họ tên là bắt buộc'
  //   } else if (formData.fullName.length < 2) {
  //     newErrors.fullName = 'Họ tên phải có ít nhất 2 ký tự'
  //   }

  //   if (!formData.dateOfBirth) {
  //     newErrors.dateOfBirth = 'Ngày sinh là bắt buộc'
  //   }

  //   if (!formData.gender) {
  //     newErrors.gender = 'Giới tính là bắt buộc'
  //   }

  //   if (!formData.idNumber.trim()) {
  //     newErrors.idNumber = 'Số CMND/CCCD là bắt buộc'
  //   } else if (formData.idNumber.length < 9) {
  //     newErrors.idNumber = 'Số CMND/CCCD phải có ít nhất 9 ký tự'
  //   }

  //   if (!formData.phoneNumber.trim()) {
  //     newErrors.phoneNumber = 'Số điện thoại là bắt buộc'
  //   } else if (formData.phoneNumber.length < 10) {
  //     newErrors.phoneNumber = 'Số điện thoại phải có ít nhất 10 ký tự'
  //   }

  //   if (!formData.email.trim()) {
  //     newErrors.email = 'Email là bắt buộc'
  //   } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
  //     newErrors.email = 'Email không hợp lệ'
  //   }

  //   if (!formData.address.trim()) {
  //     newErrors.address = 'Địa chỉ là bắt buộc'
  //   } else if (formData.address.length < 5) {
  //     newErrors.address = 'Địa chỉ phải có ít nhất 5 ký tự'
  //   }

  //   if (!formData.hasDonatedBefore) {
  //     newErrors.hasDonatedBefore = 'Vui lòng chọn'
  //   }

  //   if (!formData.consent) {
  //     newErrors.consent = 'Bạn phải đồng ý với các điều khoản'
  //   }

  //   setErrors(newErrors)
  //   return Object.keys(newErrors).length === 0
  // }

  // const handleSubmit = async () => {
  //   if (!validateForm()) {
  //     alert.showError('Vui lòng kiểm tra lại thông tin')
  //     return
  //   }

  //   setIsSubmitting(true)

  //   try {
  //     // Simulate API call
  //     await new Promise((resolve) => setTimeout(resolve, 2000))

  //     alert.showSuccess(
  //       'Đăng ký hiến máu thành công. Chúng tôi sẽ liên hệ với bạn sớm.',
  //       () => {
  //         setFormData(initialFormData)
  //         setErrors({})
  //       }
  //     )
  //   } catch (error) {
  //     alert.showError('Có lỗi xảy ra. Vui lòng thử lại.')
  //   } finally {
  //     setIsSubmitting(false)
  //   }
  // }

  // const handleChange = (field: keyof FormData, value: any): void => {
  //   setFormData({ ...formData, [field]: value })
  // }

  // // Hàm mới để cập nhật nhiều field cùng lúc
  // const handleBulkChange = (updates: Partial<FormData>): void => {
  //   setFormData((prevData) => ({ ...prevData, ...updates }))
  // }

  return (
    <>
      <ListRequest />

      <View style={styles.buttonContainer}>
        <SubmitButton
          onPress={() => router.push('/(donation-request)/donation-blood')}
          isSubmitting={isSubmitting}
        />
      </View>

      <View style={styles.bottomSpacing} />
    </>
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
      <Text style={styles.submitButtonText}>Đặt lịch</Text>
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
    backgroundColor: theme.color.primary,
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
  buttonContainer: {
    marginTop: 20,
    paddingHorizontal: 20
  },
  bottomSpacing: {
    height: 20
  }
})
