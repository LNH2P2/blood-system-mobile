import { Ionicons } from '@expo/vector-icons'
import { CameraView } from 'expo-camera'
import React from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { qrScannerStyles } from './styles'

interface QRScannerModalProps {
  visible: boolean
  hasPermission: boolean | null
  scanned: boolean
  onClose: () => void
  onBarCodeScanned: ({ type, data }: { type: string; data: string }) => void
  onScanAgain: () => void
}

const QRScannerModal: React.FC<QRScannerModalProps> = ({
  visible,
  hasPermission,
  scanned,
  onClose,
  onBarCodeScanned,
  onScanAgain
}) => {
  console.log('🎯 QRScannerModal render:', { visible, hasPermission, scanned })

  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType='slide'
      onRequestClose={onClose}
    >
      <View style={qrScannerStyles.qrContainer}>
        {hasPermission === null ? (
          <Text style={qrScannerStyles.permissionText}>
            Đang yêu cầu quyền truy cập camera...
          </Text>
        ) : hasPermission === false ? (
          <Text style={qrScannerStyles.permissionText}>
            Không có quyền truy cập camera.
          </Text>
        ) : (
          <>
            <CameraView
              style={StyleSheet.absoluteFillObject}
              facing='back'
              barcodeScannerSettings={{
                barcodeTypes: ['qr']
              }}
              onBarcodeScanned={scanned ? undefined : onBarCodeScanned}
            />
            <View
              style={[StyleSheet.absoluteFill, qrScannerStyles.scannerOverlay]}
            >
              <View style={qrScannerStyles.scannerTargetBorder} />
              <Text style={qrScannerStyles.scanTitle}>Quét mã QR</Text>
              <View style={qrScannerStyles.scanInstructionsContainer}>
                <Text style={qrScannerStyles.scanInstructions}>
                  Đưa camera đến mã QR để quét
                </Text>
              </View>
              {scanned && (
                <TouchableOpacity
                  style={qrScannerStyles.scanAgainButton}
                  onPress={onScanAgain}
                >
                  <Text style={qrScannerStyles.scanAgainButtonText}>
                    Quét lại
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity
              style={qrScannerStyles.closeButton}
              onPress={onClose}
            >
              <Ionicons name='close-circle' size={40} color='white' />
            </TouchableOpacity>
          </>
        )}
      </View>
    </Modal>
  )
}

export default QRScannerModal
