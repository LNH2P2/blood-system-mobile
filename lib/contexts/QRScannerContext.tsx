import React, { createContext, ReactNode, useContext } from 'react'
import { useQRScanner } from '../hooks/useQRScanner'
import { FormData } from '../pages/donation-request/types'
import { QRScannerData, QRScannerResult } from '../types'

interface QRScannerContextType {
  openQRScanner: () => void
  qrModalVisible: boolean
  setQrModalVisible: (visible: boolean) => void
  optionsModalVisible: boolean
  setOptionsModalVisible: (visible: boolean) => void
  hasPermission: boolean | null
  scanned: boolean
  setScanned: (scanned: boolean) => void
  closeQRScanner: () => void
  openInAppScanner: () => Promise<void>
  openExternalScanner: () => Promise<void>
  handleBarCodeScanned: ({ type, data }: { type: string; data: string }) => void
  // Cập nhật với type safety
  lastQRData: QRScannerData | null
  qrRawData: string | null
  qrResult: QRScannerResult | null
  clearQRData: () => void
  getQRData: () => QRScannerData | null
  getQRResult: () => QRScannerResult | null
  getRawData: () => string | null
}

const QRScannerContext = createContext<QRScannerContextType | undefined>(
  undefined
)

interface QRScannerProviderProps {
  children: ReactNode
  onChange?: (field: keyof FormData, value: any) => void
  onBulkChange?: (updates: Partial<FormData>) => void
  formatDate?: (date: Date | null) => string
}

export const QRScannerProvider: React.FC<QRScannerProviderProps> = ({
  children,
  onChange = () => {},
  onBulkChange,
  formatDate
}) => {
  const qrScannerHook = useQRScanner(onChange, onBulkChange, formatDate)

  return (
    <QRScannerContext.Provider value={qrScannerHook}>
      {children}
    </QRScannerContext.Provider>
  )
}

export const useQRScannerContext = () => {
  const context = useContext(QRScannerContext)
  if (context === undefined) {
    throw new Error(
      'useQRScannerContext must be used within a QRScannerProvider'
    )
  }
  return context
}
