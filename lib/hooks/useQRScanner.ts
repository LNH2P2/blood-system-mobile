import { Camera } from 'expo-camera'
import { useState } from 'react'
import { Alert, Linking, Platform } from 'react-native'
import { FormData } from '../pages/donation-request/types'

export const useQRScanner = (
  onChange: (field: keyof FormData, value: any) => void,
  onBulkChange?: (updates: Partial<FormData>) => void,
  formatDate?: (date: Date | null) => string
) => {
  const [qrModalVisible, setQrModalVisible] = useState(false)
  const [optionsModalVisible, setOptionsModalVisible] = useState(false)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [scanned, setScanned] = useState(false)

  const openQRScanner = () => {
    console.log('🔍 openQRScanner called - setting options modal to true')
    setOptionsModalVisible(true)
  }

  const closeQRScanner = () => {
    console.log('❌ closeQRScanner called')
    setQrModalVisible(false)
    setScanned(false)
  }

  const openInAppScanner = async () => {
    console.log('📱 openInAppScanner called - closing options modal')
    setOptionsModalVisible(false)
    try {
      const { status } = await Camera.requestCameraPermissionsAsync()
      console.log('📷 Camera permission status:', status)
      setHasPermission(status === 'granted')
      if (status === 'granted') {
        console.log('✅ Permission granted - opening QR modal')
        setQrModalVisible(true)
      } else {
        console.log('❌ Permission denied - showing alert')
        Alert.alert(
          'Không có quyền truy cập',
          'Ứng dụng cần quyền truy cập camera để quét mã QR.',
          [{ text: 'OK' }]
        )
      }
    } catch (error) {
      console.error('❌ Error requesting camera permission:', error)
    }
  }

  const openExternalScanner = async () => {
    setOptionsModalVisible(false)

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

  const handleBarCodeScanned = ({
    type,
    data
  }: {
    type: string
    data: string
  }) => {
    setScanned(true)
    try {
      // Xử lý dữ liệu QR dạng CCCD/CMND của Việt Nam
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
          } else if (genderText === 'nữ' || genderText === 'nu') {
            qrData.gender = 'female'
          }
        }

        // Địa chỉ
        if (parts.length > 5 && parts[5].trim()) {
          const address = parts[5].trim()
          qrData.address = address
        }

        processQRData(qrData)
        return
      }

      // Xử lý dữ liệu QR dạng JSON
      try {
        const parsedData = JSON.parse(data)
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

        processQRData(qrData)
      } catch (jsonError) {
        throw new Error('Invalid QR format')
      }
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

  const processQRData = (qrData: Partial<FormData>) => {
    // Cập nhật tất cả các trường cùng một lúc
    if (onBulkChange) {
      onBulkChange(qrData)
    } else {
      // Fallback nếu onBulkChange không được cung cấp
      Object.entries(qrData).forEach(([key, value]) => {
        onChange(key as keyof FormData, value)
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
      if (qrData.dateOfBirth && formatDate)
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
  }

  return {
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
  }
}
