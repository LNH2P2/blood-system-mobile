import { StyleSheet } from 'react-native'

// Styles cho QR Scanner
export const qrScannerStyles = StyleSheet.create({
  qrContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  },
  permissionText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20
  },
  scannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scannerTargetBorder: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#199A8E',
    borderRadius: 8
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10
  },
  scanInstructionsContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center'
  },
  scanInstructions: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10
  },
  scanAgainButton: {
    position: 'absolute',
    bottom: 100,
    backgroundColor: '#199A8E',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8
  },
  scanAgainButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500'
  },
  scanTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10
  }
})

export const styles = StyleSheet.create({
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
  },
  qrButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8
  },
  qrContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#199A8E',
    marginBottom: 16
  },
  modalText: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  mockScanButton: {
    flex: 1,
    backgroundColor: '#199A8E',
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center'
  },
  mockScanButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500'
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db'
  },
  cancelButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '500'
  },
  permissionText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20
  },
  scannerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scannerTargetBorder: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#199A8E',
    borderRadius: 8
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10
  },
  scanInstructionsContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center'
  },
  scanInstructions: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10
  },
  scanAgainButton: {
    position: 'absolute',
    bottom: 100,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: '#199A8E',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8
  },
  scanAgainButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500'
  },
  scanTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 32
  },
  optionButtonContainer: {
    width: '100%',
    marginBottom: 16
  },
  optionButton: {
    backgroundColor: 'white',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.3,
    shadowRadius: 4
  },
  optionButtonText: {
    color: '#199A8E',
    fontSize: 18,
    fontWeight: '500'
  },
  iosPickerModalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16
  },
  iosPickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb'
  },
  iosPickerCancel: {
    color: '#6b7280',
    fontSize: 16,
    fontWeight: '500'
  },
  iosPickerDone: {
    color: '#199A8E',
    fontSize: 16,
    fontWeight: '600'
  },
  iosPicker: {
    height: 200,
    width: '100%',
    backgroundColor: 'white'
  }
})
